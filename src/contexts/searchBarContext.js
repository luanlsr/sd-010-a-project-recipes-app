import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const SearchBarContext = createContext();

export function SearchBarContextProvider({ children }) {
  const [recipes, setRecipes] = useState({});
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({});
  return (
    <SearchBarContext.Provider
      value={ { recipes,
        setRecipes,
        categories,
        setCategories,
        loading,
        setLoading,
        buttonState,
        setButtonState,
        currentCategory,
        setCurrentCategory } }
    >
      {children}
    </SearchBarContext.Provider>
  );
}

SearchBarContextProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
