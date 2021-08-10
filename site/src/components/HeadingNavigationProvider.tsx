import { createContext, useState, useContext } from 'react'

interface HeadingTypes {
  anchor : string,
  label: string,
  headingLevel: ('h1'| 'h2'| 'h3'| 'h4'| 'h5'| 'h6'),
}

const HeadingNavigationContext = createContext({
  headings: [],
  addHeading: (heading: HeadingTypes) => {},
})

function HeadingNavigationProvider({children}) {
  const [headings, setHeadings] = useState([])
  const addHeading = (heading: HeadingTypes) => {
    if( ['h1', 'h2', 'h3'].includes(heading.headingLevel) ) return;

    setHeadings([
      ...headings,
      heading
    ])
  }

  return <HeadingNavigationContext.Provider value={{headings, addHeading }}>{children}</HeadingNavigationContext.Provider>
}

const useheadingNavigationContext = () => useContext(HeadingNavigationContext);

export { HeadingNavigationProvider, useheadingNavigationContext }
