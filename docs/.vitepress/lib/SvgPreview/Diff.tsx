import React from 'react';
import Backdrop from './Backdrop.tsx';
import { darkModeCss, Grid } from './index.tsx';

const SvgPreview = React.forwardRef<
  SVGSVGElement,
  {
    oldSrc: string;
    newSrc: string;
  } & React.SVGProps<SVGSVGElement>
>(({ oldSrc, newSrc, children, ...props }, ref) => {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <style>{darkModeCss}</style>
      <Grid
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
          width="24"
          height="24"
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
