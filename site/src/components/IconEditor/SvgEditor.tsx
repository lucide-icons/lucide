import { Menu, MenuItem, MenuList } from '@chakra-ui/react';
import memoize from 'lodash/memoize';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import SvgPreview from '../SvgPreview';
import { Path } from '../SvgPreview/types';
import { getNodes, getPaths } from '../SvgPreview/utils';
import { stringify, INode } from 'svgson';
import { throttle } from 'lodash';

const mGetPaths = memoize(getPaths);

const nodesToSvg = (nodes: INode[]) => `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
${nodes.map((node) => '  ' + stringify(node)).join('\n')}
</svg>`;

const pathToPathNode = (path: Path) => ({
  name: 'path',
  type: 'element',
  value: undefined,
  children: [],
  attributes: { d: path.d },
});

const SvgEditor = ({
  src,
  onChange,
  backdrop,
}: {
  src: string;
  onChange: (svg: string) => void;
  backdrop: string;
}) => {
  const [paths, setPaths] = useState<Path[]>([]);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const dragTargetRef = useRef(undefined);
  const [selected, setSelected] = useState(undefined);

  useEffect(() => {
    let scopedPaths: Path[];
    setSelected(undefined);
    try {
      scopedPaths = mGetPaths(src);
    } catch (e) {
      scopedPaths = [];
    }
    let scopedPathsString = JSON.stringify(scopedPaths);
    let movedPaths = JSON.parse(scopedPathsString) as typeof scopedPaths;
    try {
      setPaths(scopedPaths);
    } catch (e) {
      console.error(e);
    }

    console.log('render');
    const onMouseDown = (event: MouseEvent) => {
      const className = event.target?.getAttribute('class');
      console.log('mouseDown');
      if (event.target?.getAttribute('role') === 'menuitem') {
        return;
      }
      setIsContextMenuOpen(false);
      if (className?.startsWith('svg-editor-')) {
        event.preventDefault();
        dragTargetRef.current = {
          id: parseInt(className.split('-').at(-2)),
          idx: parseInt(className.split('-').at(-1)),
          startPosition: { x: event.clientX, y: event.clientY },
          type: className.split(' ')[0],
        };
        setSelected(dragTargetRef.current);
        return;
      }
      setSelected(undefined);
    };

    const limit = (val: number) => Math.max(0, Math.min(val, 24));
    const onMouseMove = throttle((event: MouseEvent) => {
      if (dragTargetRef.current) {
        event.preventDefault();
        const x = ((event.clientX - dragTargetRef.current.startPosition.x) * 24) / 480;
        const y = ((event.clientY - dragTargetRef.current.startPosition.y) * 24) / 480;
        const dragStart =
          dragTargetRef.current.type === 'svg-editor-path' ||
          dragTargetRef.current.type === 'svg-editor-start';
        const dragEnd =
          dragTargetRef.current.type === 'svg-editor-path' ||
          dragTargetRef.current.type === 'svg-editor-end';
        for (let i = 0; i < scopedPaths.length; i++) {
          if (
            scopedPaths[i].c.id === dragTargetRef.current.id &&
            scopedPaths[i].c.idx === dragTargetRef.current.idx
          ) {
            const n = scopedPaths[i].d.split(' ');
            let snapXDelta = 0;
            let snapYDelta = 0;
            if (dragStart) {
              movedPaths[i].prev.x = limit(scopedPaths[i].prev.x + x);
              movedPaths[i].prev.y = limit(scopedPaths[i].prev.y + y);
              snapXDelta = Math.round(movedPaths[i].prev.x * 2) / 2 - movedPaths[i].prev.x;
              snapYDelta = Math.round(movedPaths[i].prev.y * 2) / 2 - movedPaths[i].prev.y;
              movedPaths[i].prev.x += snapXDelta;
              movedPaths[i].prev.y += snapYDelta;
            }
            if (dragEnd) {
              movedPaths[i].next.x = limit(scopedPaths[i].next.x + x);
              movedPaths[i].next.y = limit(scopedPaths[i].next.y + y);
              if (dragStart) {
                movedPaths[i].next.x += snapXDelta;
                movedPaths[i].next.y += snapYDelta;
              } else {
                movedPaths[i].next.x = Math.round(movedPaths[i].next.x * 2) / 2;
                movedPaths[i].next.y = Math.round(movedPaths[i].next.y * 2) / 2;
              }
            }
            n[1] = movedPaths[i].prev.x + '';
            n[2] = movedPaths[i].prev.y + '';
            n[n.length - 2] = movedPaths[i].next.x + '';
            n[n.length - 1] = movedPaths[i].next.y + '';
            if (movedPaths[i].d !== n.join(' ')) {
              movedPaths[i].d = n.join(' ');
              setPaths(movedPaths.slice(0));
            }
          }
        }
      }
    }, 1000 / 60);

    const onMouseUp = () => {
      const movedPathsString = JSON.stringify(movedPaths);
      if (scopedPathsString !== movedPathsString) {
        scopedPaths = movedPaths;
        scopedPathsString = movedPathsString;
        movedPaths = JSON.parse(movedPathsString);
        const nodes = getNodes(src);
        onChange(
          nodesToSvg(
            nodes.flatMap((val, id) =>
              id === dragTargetRef.current?.id
                ? movedPaths.filter(({ c }) => c.id === id).map(pathToPathNode)
                : [val]
            )
          )
        );
      }
      dragTargetRef.current = undefined;
    };

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      setSelected(undefined);
      onMouseUp();
    };
  }, [src]);

  return (
    <>
      <SvgPreview
        showGrid
        src={paths}
        backdrop={backdrop}
        onContextMenu={(e) => {
          if (selected) {
            setIsContextMenuOpen(true);
            e.preventDefault();
          }
        }}
      >
        <filter id="shadow" color-interpolation-filters="sRGB">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.5" />
        </filter>
        <g strokeWidth={1.5} strokeOpacity={0}>
          {paths.map(({ d, c, next, prev }, i) => (
            <React.Fragment key={i}>
              <path className={`svg-editor-path svg-editor-segment-${c.id}-${c.idx}`} d={d} />
              <path
                className={`svg-editor-start svg-editor-segment-${c.id}-${c.idx}`}
                d={`M${prev.x} ${prev.y}h.01`}
              />
              <path
                className={`svg-editor-end svg-editor-segment-${c.id}-${c.idx}`}
                strokeWidth={1.5}
                d={`M${next.x} ${next.y}h.01`}
              />
            </React.Fragment>
          ))}
        </g>
      </SvgPreview>
      {selected &&
        JSON.stringify(paths.find(({ c }) => selected.id === c.id && selected.idx === c.idx).d)}
      {isContextMenuOpen && (
        <Menu isOpen>
          <MenuList
            top={selected ? selected.startPosition.y + 'px' : '0px'}
            left={selected ? selected.startPosition.x + 'px' : '0px'}
            position="fixed"
          >
            <MenuItem
              onClick={() => {
                const nodes = getNodes(src);
                onChange(
                  nodesToSvg(
                    nodes.flatMap((val, id) =>
                      id === selected?.id
                        ? paths
                            .filter(({ c }) => c.id === selected?.id && c.idx !== selected?.idx)
                            .map(pathToPathNode)
                        : [val]
                    )
                  )
                );

                setSelected(undefined);
                setIsContextMenuOpen(false);
              }}
            >
              Delete
            </MenuItem>
            <MenuItem
              onClick={() => {
                const nodes = getNodes(src);
                const path = paths.find(
                  ({ c }) => c.id === selected?.id && c.idx === selected?.idx
                );
                const n = path.d.split(' ');
                n[1] = path.prev.x + 1 + '';
                n[2] = path.prev.y + 1 + '';
                n[n.length - 2] = path.next.x + 1 + '';
                n[n.length - 1] = path.next.y + 1 + '';
                path.d = n.join(' ');
                onChange(nodesToSvg([...nodes, pathToPathNode(path)]));

                setSelected(undefined);
                setIsContextMenuOpen(false);
              }}
            >
              Duplicate
            </MenuItem>
          </MenuList>
        </Menu>
      )}
      <style>
        {`
.svg-preview-backdrop-group { stroke: red; stroke-opacity: 0.5; }
.svg-editor-path:hover, .svg-editor-start:hover, .svg-editor-end:hover { stroke: black; stroke-opacity: 0.5 }
.svg-editor-path, .svg-editor-start, .svg-editor-end { cursor: pointer }
.svg-editor-segment-${selected?.id}-${selected?.idx}.svg-editor-path { stroke: black; stroke-opacity: 0.5 }
.svg-editor-segment-${selected?.id}-${selected?.idx}:active { cursor: grabbing !important }
.icon-editor-highlight-segment-${selected?.id}-${selected?.idx} {
  box-shadow: 0 0 0 2px black !important;
}
      `}
      </style>
    </>
  );
};

export default SvgEditor;
