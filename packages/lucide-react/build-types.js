const fs = require("fs")
const path = require("path")
const srcDirectory = path.join(__dirname, "dist")

// Declare type definitions
const typeDefinitions = `
/// <reference types="react" />
import { SVGAttributes } from 'react'

// Create interface extending SVGAttributes
export interface LucideProps extends Partial<React.SVGProps<SVGSVGElement>> {
    color?: string
    size?: string | number
    stroke?: string | number
    strokeWidth?: string | number
}

// Generated icons
`

// Write type definitions to file
fs.writeFileSync(
  path.join(srcDirectory, "index.d.ts"),
  typeDefinitions,
  "utf-8",
)

const iconsFolder = "./build/icons"
fs.readdir(iconsFolder, (err, files) => {

  files.forEach(file => {

    const fileName = file.replace(".js", "")

    // Convert fileName to component name
    const componentName = fileName.split("-")
                                  .map(word => word[0].toUpperCase() + word.substr(1, word.length))
                                  .join("")

    // Declare component type
    const exportTypeString = `export const ${componentName}: LucideIcon;\n`

    // Add component to the types file
    fs.appendFileSync(
      path.join(srcDirectory, "index.d.ts"),
      exportTypeString,
      "utf-8",
    )

  })

  console.log("Generated index.d.ts file with", files.length, "icons")

})
