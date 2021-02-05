import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import catagoriesFile from '../../../categories.json'

export const CategoriesContext = createContext({})

const CategoriesContextProvider = ({ children }) => {
  const [catagories, setCategories] = useState(catagoriesFile)


  return (
    <CategoriesContext.Provider
      value={{
        catagories,
        setCategories
      }}
    >
       { children }
    </CategoriesContext.Provider>
  )
}

CategoriesContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.object
  ]).isRequired
}
export default CategoriesContextProvider
