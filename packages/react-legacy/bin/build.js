const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const prettier = require("prettier");
const upperCamelCase = require("uppercamelcase");

const directory = path.join(process.cwd(), "../../icons");

function getAllData() {
  const fileNames = fs.readdirSync(directory);

  return fileNames.map((fileName) => {
    const name = fileName.replace(/\.svg$/, "");
    const fullPath = path.join(directory, `${name}.svg`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const $ = cheerio.load(fileContents);
    const content = $("svg").html();

    return {
      name,
      src: fileContents,
      content,
    };
  });
}

const icons = getAllData();

const dir = path.join(process.cwd(), "src/icons");

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const initialTypeDefinitions = `/// <reference types="react" />
import { FC, SVGAttributes } from "react";

interface Props extends SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
  width?: string | number;
}

type Icon = FC<Props>;
`;

fs.writeFileSync(path.join(process.cwd(), "src", "index.js"), "", "utf-8");
fs.writeFileSync(
  path.join(process.cwd(), "src", "index.d.ts"),
  initialTypeDefinitions,
  "utf-8"
);

const attrsToString = (attrs) => {
  return Object.keys(attrs)
    .map((key) => {
      if (
        key === "width" ||
        key === "height" ||
        key === "stroke" ||
        key === "strokeWidth"
      ) {
        return key + "={" + attrs[key] + "}";
      }
      if (key === "rest") {
        return "{...rest}";
      }
      return key + '="' + attrs[key] + '"';
    })
    .join(" ");
};

icons.forEach((i) => {
  const location = path.join(process.cwd(), "src/icons", `${i.name}.js`);
  const ComponentName = i.name === "github" ? "GitHub" : upperCamelCase(i.name);
  const defaultAttrs = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "size",
    height: "size",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "color",
    strokeWidth: "width",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    rest: "...rest",
  };

  const element = `
    import React, { forwardRef } from "react";
    import PropTypes from "prop-types";

    const ${ComponentName} = forwardRef(({ color = "currentColor", size = 24, width = 2, ...rest }, ref) => {
      return (
        <svg ref={ref} ${attrsToString(defaultAttrs)}>
          ${i.content}
        </svg>
      )
    });

    ${ComponentName}.propTypes = {
      color: PropTypes.string,
      size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
    }

    ${ComponentName}.displayName = "${ComponentName}"

    export default ${ComponentName}
  `;

  fs.writeFileSync(
    location,
    prettier.format(element, { parser: "babel" }),
    "utf-8"
  );

  console.log("Successfully built", ComponentName);

  const exportString = `export { default as ${ComponentName} } from "./icons/${i.name}";\n`;
  fs.appendFileSync(
    path.join(process.cwd(), "src", "index.js"),
    exportString,
    "utf-8"
  );

  const exportTypeString = `export const ${ComponentName}: Icon;\n`;
  fs.appendFileSync(
    path.join(process.cwd(), "src", "index.d.ts"),
    exportTypeString,
    "utf-8"
  );
});
