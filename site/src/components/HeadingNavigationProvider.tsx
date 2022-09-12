import { createContext, useState, useContext, useMemo, useCallback } from 'react';

interface HeadingTypes {
  anchor: string;
  label: string;
  headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const HeadingNavigationContext = createContext({
  headings: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  addHeading: (heading: HeadingTypes) => {},
});

export default function HeadingNavigationProvider({ children }) {
  const [headings, setHeadings] = useState([]);

  const addHeading = useCallback((heading: HeadingTypes) => {
    if (!['h1', 'h2', 'h3'].includes(heading.headingLevel)) return;

    setHeadings((currentHeadings) => [
      ...currentHeadings,
      heading
    ]);
  }, [headings]);

  const value = useMemo(() => ({ headings, addHeading }), [headings, addHeading]);

  return (
    <HeadingNavigationContext.Provider value={value}>{children}</HeadingNavigationContext.Provider>
  );
}

export const useHeadingNavigationContext = () => useContext(HeadingNavigationContext);

