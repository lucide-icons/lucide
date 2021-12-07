import { useEffect, useMemo } from 'react';
import { useheadingNavigationContext } from './HeadingNavigationProvider';

const HeadingTreeMenu = () => {
  const { headings } = useheadingNavigationContext();
  const headingElements = useMemo(
    () =>
      headings.map(heading => {
        const headingElement = document.getElementById(heading.anchor);
        console.log(headingElement);

        return {
          element: headingElement,
          offsetTop: headingElement.getBoundingClientRect().top,
        };
      }),
    [headings],
  );

  useEffect(() => {
    console.log(headingElements);
  }, [headingElements, headings]);

  return <div />;
};

export default HeadingTreeMenu;
