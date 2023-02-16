import { forwardRef, SVGProps } from 'react';
import SvgPreview from './SvgPreview';

interface IconWrapperProps extends SVGProps<SVGSVGElement> {
  showPreview?: boolean;
  src: string;
}

export const IconWrapper = forwardRef<SVGSVGElement, IconWrapperProps>((props, ref) => {
  if (props.showPreview) {
    return <SvgPreview src={props.src} />;
  }
  const defaultAttrs: SVGProps<SVGSVGElement> = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '24px',
    height: '24px',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2px',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  const { src, ...rest } = props;
  const attrs = {
    ...defaultAttrs,
    ...rest,
  };
  const content = src.replace(/<svg[^>]*>|<\/svg>/g, '');

  return <svg ref={ref} {...attrs} dangerouslySetInnerHTML={{ __html: content }} />;
});
