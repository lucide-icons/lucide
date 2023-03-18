import React from 'react';
import { PathProps, Path } from './types';
import { getPaths, assert } from './utils';

const Grid = ({
  radius,
  fill,
  ...props
}: {
  strokeWidth: number;
  radius: number;
} & PathProps<'stroke', 'strokeWidth' | 'strokeLinecap'>) => (
  <>
    <rect
      {...props}
      width={24 - props.strokeWidth}
      height={24 - props.strokeWidth}
      x={props.strokeWidth / 2}
      y={props.strokeWidth / 2}
      rx={radius}
      fill={fill}
    />
    <path
      {...props}
      strokeLinecap="butt"
      d={
        props.d ||
        new Array(Math.floor(24 - 1))
          .fill(null)
          .flatMap((_, i) => [
            `M${props.strokeWidth} ${i + 1}h${24 - props.strokeWidth * 2}`,
            `M${i + 1} ${props.strokeWidth}v${24 - props.strokeWidth * 2}`,
          ])
          .join('')
      }
    />
  </>
);

const Shadow = ({
  radius,
  paths,
  ...props
}: {
  radius: number;
  paths: Path[];
} & PathProps<'stroke' | 'strokeWidth' | 'strokeOpacity', 'd'>) => (
  <>
    <mask id="point-overlap-mask" maskUnits="userSpaceOnUse" stroke="none">
      <rect x={0} y={0} width={24} height={24} fill="#fff" rx={radius} />
      <path
        d={paths
          .flatMap(({ prev, next }) => [`M${prev.x} ${prev.y}h.01`, `M${next.x} ${next.y}h.01`])
          .filter((val, idx, arr) => arr.indexOf(val) === idx)
          .join('')}
        strokeWidth={props.strokeWidth}
        stroke="#000"
      />
    </mask>
    {paths.map(({ d }, i) => (
      <path key={i} d={d} {...props} mask="url(#point-overlap-mask)" />
    ))}
    <path
      d={paths
        .flatMap(({ prev, next }) => [`M${prev.x} ${prev.y}h.01`, `M${next.x} ${next.y}h.01`])
        .filter((val, idx, arr) => arr.indexOf(val) === idx)
        .join('')}
      {...props}
    />
  </>
);

const ColoredPath = ({
  colors,
  paths,
  ...props
}: { paths: Path[]; colors: string[] } & PathProps<never, 'd' | 'stroke'>) => (
  <>
    {paths.map(({ d, c }, i) => (
      <path
        key={i}
        d={d}
        stroke={colors[(c.name === 'path' ? i : c.id) % colors.length]}
        {...props}
      />
    ))}
  </>
);

const ControlPath = ({
  paths,
  radius,
  pointSize,
  ...props
}: { pointSize: number; paths: Path[]; radius: number } & PathProps<
  'stroke' | 'strokeWidth',
  'd'
>) => (
  <>
    {paths.map(({ d, prev, next, isStart, c }, i) => {
      const element = paths.filter((p) => p.c.id === c.id);
      const lastElement = element.at(-1)?.next;
      assert(lastElement);
      const isClosed = element[0].prev.x === lastElement.x && element[0].prev.y === lastElement.y;
      return ['rect', 'circle', 'ellipse'].includes(c.name) ? (
        <path key={i} d={d} {...props} />
      ) : (
        <React.Fragment key={i}>
          <mask id={`path-mask-${i}`} maskUnits="userSpaceOnUse" stroke="none">
            <rect x="0" y="0" width="24" height="24" fill="#fff" rx={radius} />
            <path d={`M${prev.x} ${prev.y}h.01`} strokeWidth={pointSize} stroke="#000" />
            <path d={`M${next.x} ${next.y}h.01`} strokeWidth={pointSize} stroke="#000" />
          </mask>
          <path d={`M${prev.x} ${prev.y}h.01`} {...props} />
          <path d={`M${next.x} ${next.y}h.01`} {...props} />
          {isStart && !isClosed && <circle cx={prev.x} cy={prev.y} r={pointSize / 2} {...props} />}
          {paths[i + 1]?.isStart !== false && !isClosed && (
            <circle cx={next.x} cy={next.y} r={pointSize / 2} {...props} />
          )}
          <path d={d} {...props} mask={`url(#path-mask-${i})`} />
        </React.Fragment>
      );
    })}
  </>
);

const SvgPreview = React.forwardRef<
  SVGSVGElement,
  { src: string; showGrid?: boolean; darkMode?: boolean }
>(({ src, showGrid = false, darkMode = false }, ref) => {
  const paths = getPaths(src);
  const shadowColor = darkMode ? '#fff' : '#777';
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={240}
      height={240}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {showGrid && <Grid strokeWidth={0.1} stroke={shadowColor} strokeOpacity={0.3} radius={1} />}
      <Shadow paths={paths} strokeWidth={4} stroke={shadowColor} radius={1} strokeOpacity={0.15} />
      <ColoredPath
        paths={paths}
        colors={[
          '#1982c4',
          '#4267AC',
          '#6a4c93',
          '#B55379',
          '#FF595E',
          '#FF7655',
          '#ff924c',
          '#FFAE43',
          '#ffca3a',
          '#C5CA30',
          '#8ac926',
          '#52A675',
        ]}
      />
      <ControlPath radius={1} paths={paths} pointSize={1} stroke="#fff" strokeWidth={0.125} />
    </svg>
  );
});

export default SvgPreview;
