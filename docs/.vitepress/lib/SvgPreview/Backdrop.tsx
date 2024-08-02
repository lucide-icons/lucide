import React from 'react';

interface BackdropProps {
  src: string;
  color?: string;
  backdropString: string;
}

const Backdrop = ({ src, color = 'red', backdropString }: BackdropProps): JSX.Element => {
  const id = React.useId();
  return (
    <>
      <defs xmlns="http://www.w3.org/2000/svg">
        <pattern
          id={`pattern-${id}`}
          width=".1"
          height=".1"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45 50 50)"
        >
          <line
            stroke={color}
            strokeWidth={0.1}
            y2={1}
          />
          <line
            stroke={color}
            strokeWidth={0.1}
            y2={1}
          />
        </pattern>
      </defs>
      <mask
        id={`svg-preview-backdrop-mask-${id}`}
        maskUnits="userSpaceOnUse"
      >
        <g
          stroke="#fff"
          dangerouslySetInnerHTML={{ __html: backdropString }}
        />
        <g dangerouslySetInnerHTML={{ __html: src }} />
      </mask>
      <mask
        id={`svg-preview-backdrop-mask-outline-${id}`}
        maskUnits="userSpaceOnUse"
      >
        <rect
          x="0"
          y="0"
          width="24"
          height="24"
          fill="#fff"
          stroke="none"
        />
        <g
          strokeWidth={1.75}
          dangerouslySetInnerHTML={{ __html: backdropString }}
        />
      </mask>
      <g mask={`url(#svg-preview-backdrop-mask-${id})`}>
        <rect
          x="0"
          y="0"
          width="24"
          height="24"
          opacity={0.5}
          fill={`url(#pattern-${id})`}
          stroke="none"
        />
        <g
          stroke={color}
          strokeWidth={2.25}
          opacity={0.75}
          dangerouslySetInnerHTML={{ __html: src }}
        />
        <g
          stroke={color}
          strokeWidth={2.25}
          opacity={0.75}
          mask={`url(#svg-preview-backdrop-mask-outline-${id})`}
          dangerouslySetInnerHTML={{ __html: backdropString }}
        />
      </g>
    </>
  );
};

export default Backdrop;
