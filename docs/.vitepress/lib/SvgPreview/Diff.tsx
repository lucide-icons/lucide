import React from 'react';
import Backdrop from './Backdrop.tsx';
import { darkModeCss, Grid } from './index.tsx';

const SvgPreview = React.forwardRef<
  SVGSVGElement,
  {
    oldSrc: string;
    newSrc: string;
    height: number;
    width: number;
  } & React.SVGProps<SVGSVGElement>
>(({ oldSrc, newSrc, children, height, width, ...props }, ref) => {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <style>{darkModeCss}</style>
      <Grid
        width={width}
        height={height}
        strokeWidth={0.1}
        stroke="#777"
        strokeOpacity={0.3}
        radius={1}
      />
      <mask
        id="gray"
        maskUnits="userSpaceOnUse"
      >
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="#000"
          stroke="none"
        />
        <g
          stroke="#fff"
          dangerouslySetInnerHTML={{ __html: oldSrc }}
        />
      </mask>
      <Backdrop
        src=""
        outline={false}
        backdropString={`<g mask="url('#gray')">${newSrc}</g>`}
        color="#777"
      />
      <Backdrop
        src={oldSrc}
        backdropString={newSrc}
        color="lime"
      />
      <Backdrop
        src={newSrc}
        backdropString={oldSrc}
        color="red"
      />
      {children}
    </svg>
  );
});

export default SvgPreview;
