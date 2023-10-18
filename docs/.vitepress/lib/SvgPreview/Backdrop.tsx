import React from 'react';

interface BackdropProps {
  src: string
  backdropString: string
}

const Backdrop = ({ src, backdropString }: BackdropProps): JSX.Element => {
  return (
    <>
      <defs xmlns="http://www.w3.org/2000/svg">
        <pattern
          id="pattern"
          width=".1"
          height=".1"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45 50 50)"
        >
          <line stroke="red" strokeWidth={0.1} y2={1} />
          <line stroke="red" strokeWidth={0.1} y2={1} />
        </pattern>
      </defs>
      <mask id="svg-preview-backdrop-mask-outline" maskUnits="userSpaceOnUse">
        <g stroke="#fff" dangerouslySetInnerHTML={{ __html: backdropString }} />
        <g dangerouslySetInnerHTML={{ __html: src }} strokeWidth={2.05} />
      </mask>
      <mask id="svg-preview-backdrop-mask-fill" maskUnits="userSpaceOnUse">
        <g stroke="#fff" dangerouslySetInnerHTML={{ __html: backdropString }} />
        <g dangerouslySetInnerHTML={{ __html: src }} strokeWidth={2.05} />
        <g strokeWidth={1.75} dangerouslySetInnerHTML={{ __html: backdropString }} />
      </mask>
      <g
        strokeWidth={2.25}
        stroke="url(#pattern)"
        mask={'url(#svg-preview-backdrop-mask-outline)'}
      >
        <rect
          x="0"
          y="0"
          width="24"
          height="24"
          fill="url(#pattern)"
          opacity={0.5}
          stroke="none"
        />
      </g>
      <rect
        x="0"
        y="0"
        width="24"
        height="24"
        fill="url(#pattern)"
        stroke="none"
        mask={'url(#svg-preview-backdrop-mask-fill)'}
      />
      <rect
        x="0"
        y="0"
        width="24"
        height="24"
        fill="red"
        opacity={0.5}
        stroke="none"
        mask={'url(#svg-preview-backdrop-mask-fill)'}
      />
    </>
  )
}


export default Backdrop;
