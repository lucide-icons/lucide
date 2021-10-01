import { createContext, useState, useContext } from 'react';

interface HeadingTypes {
  anchor: string;
  label: string;
  headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const HeadingNavigationContext = createContext({
  headings: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addHeading: (heading: HeadingTypes) => {},
});

function HeadingNavigationProvider({ children }) {
  const [headings, setHeadings] = useState([]);

  const addHeading = (heading: HeadingTypes) => {
    if (!['h1', 'h2', 'h3'].includes(heading.headingLevel)) return;

    const currentHeadings = headings;
    currentHeadings.push(heading);
    setHeadings(currentHeadings);
  };

  const value = { headings, addHeading };

  return (
    <HeadingNavigationContext.Provider value={value}>{children}</HeadingNavigationContext.Provider>
  );
}

const useheadingNavigationContext = () => useContext(HeadingNavigationContext);

export { HeadingNavigationProvider, useheadingNavigationContext };
