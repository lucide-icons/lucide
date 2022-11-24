import { splitProps } from 'solid-js';

export default function splitIconProps(props) {
  return splitProps(props, ['color', 'size', 'strokeWidth', 'children', 'class']);
}
