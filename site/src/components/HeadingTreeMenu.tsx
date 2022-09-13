import { useMemo } from 'react';
import { useHeadingNavigationContext } from './HeadingNavigationProvider';

const HeadingTreeMenu = () => {
  const { headings } = useHeadingNavigationContext();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const headingElements = useMemo(
    () =>
      headings.map(heading => {
        const headingElement = document.getElementById(heading.anchor);

        return {
          element: headingElement,
          offsetTop: headingElement.getBoundingClientRect().top,
        };
      }),
    [headings],
  );

  return <div />;
};

export default HeadingTreeMenu;
