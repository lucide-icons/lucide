// https://github.com/FormidableLabs/react-native-svg-mock
import React from 'react';
import type { LucideProps } from '../../src/createReactComponent';
export type { SvgProps } from 'react-native-svg';

const createComponent = function (name: string) {
  const component = (props: LucideProps) => {
    return React.createElement(name, props, props.children);
  };

  component.displayName = name;

  return component;
};

// Mock all react-native-svg exports
// from https://github.com/magicismight/react-native-svg/blob/master/index.js
const Svg = createComponent('svg');
const Circle = createComponent('circle');
const Ellipse = createComponent('ellipse');
const G = createComponent('g');
const Text = createComponent('text');
const TextPath = createComponent('textPath');
const TSpan = createComponent('tSpan');
const Path = createComponent('path');
const Polygon = createComponent('polygon');
const Polyline = createComponent('polyline');
const Line = createComponent('line');
const Rect = createComponent('rect');
const Use = createComponent('use');
const Image = createComponent('image');
const Symbol = createComponent('symbol');
const Defs = createComponent('defs');
const LinearGradient = createComponent('linearGradient');
const RadialGradient = createComponent('radialGradient');
const Stop = createComponent('stop');
const ClipPath = createComponent('clipPath');
const Pattern = createComponent('pattern');
const Mask = createComponent('mask');

export {
  Svg,
  Circle,
  Ellipse,
  G,
  Text,
  TextPath,
  TSpan,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
};

export default Svg;
