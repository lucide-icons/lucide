import { forwardRef, SVGProps } from 'react';

interface IconWrapperProps extends SVGProps<SVGSVGElement> {
  content: string;
}

export const IconWrapper = forwardRef<SVGSVGElement, IconWrapperProps>((props, ref) => {
  const defaultAttrs : SVGProps<SVGSVGElement>= {
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

  const { content, ...rest } = props;
  const attrs = {
    ...defaultAttrs,
    ...rest,
  };

  return <svg ref={ref} {...attrs} dangerouslySetInnerHTML={{ __html: content }} />;
});
