import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [type, setType] = useState(null);
  const [splitEnd, setSplitEnd] = useState(null);
  const [mealOrDrink, setMealOrDrink] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState(null);
  const [idMeal, setIdMeal] = useState();
  const [idDrink, setIdDrink] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [mealsAndDrinkByIngredients, setMealsAndDrinkByIngredients] = useState(null);
  const [allChecked, setAllChecked] = useState(true);

  const contextValue = {
    type,
    splitEnd,
    setType,
    setSplitEnd,
    mealOrDrink,
    setMealOrDrink,
    recipes,
    setRecipes,
    searchedRecipes,
    setSearchedRecipes,
    idMeal,
    setIdMeal,
    idDrink,
    setIdDrink,
    ingredients,
    setIngredients,
    mealsAndDrinkByIngredients,
    setMealsAndDrinkByIngredients,
    allChecked,
    setAllChecked,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default RecipesProvider;