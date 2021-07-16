import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import formattingMeasuresAndIngredients from '../../services/formatingService';

import Container from './style';
import useDetailsProvider from '../../hooks/useDetailsProvider';

function RecipeIngredients({ recipe, idMeal, idDrink, type }) {
  const keysAndValues = Object.entries(recipe);

  const [checkedBox, setChecked] = useState([]);

  const {
    cocktails,
    setCocktailsIngredients,
    meals,
    setMealsIngredients, setIsDisabled } = useDetailsProvider();

  const formatting = formattingMeasuresAndIngredients(keysAndValues);
  const { ingredients, measures } = formatting;

  const setContextIngredients = useCallback(() => {
    switch (type) {
    case 'meals':
      setMealsIngredients({
        [idMeal]: checkedBox,
      });
      break;
    case 'drinks':
      setCocktailsIngredients({
        [idDrink]: checkedBox,
      });
      break;
    default:
      break;
    }
  }, [
    checkedBox,
    idMeal,
    idDrink,
    type,
    setMealsIngredients,
    setCocktailsIngredients]);

  useEffect(() => {
    setContextIngredients();
  }, [checkedBox, setContextIngredients]);

  const handleChange = ({ target }) => {
    if (target.checked) {
      setChecked([...checkedBox, parseInt(target.value, 10)]);
    } else {
      setChecked(checkedBox.filter((check) => check !== parseInt(target.value, 10)));
    }
  };

  useEffect(() => {
    if (checkedBox.length > 0) {
      const recipesKeys = { cocktails, meals };
      const jsonRecipes = JSON.stringify(recipesKeys);
      localStorage.setItem('inProgressRecipes', jsonRecipes);
    }
  }, [cocktails, meals, checkedBox]);

  useEffect(() => {
    const recipesJson = localStorage.getItem('inProgressRecipes');
    const storageRecipes = JSON.parse(recipesJson);

    if (recipesJson) {
      switch (type) {
      case 'meals':
        if (storageRecipes.meals[idMeal]) {
          setChecked(storageRecipes.meals[idMeal]);
        }
        break;
      case 'drinks':
        if (storageRecipes.cocktails[idDrink]) {
          setChecked(storageRecipes.cocktails[idDrink]);
        }
        break;
      default:
        break;
      }
    }
  }, [idMeal, idDrink, type]);

  useEffect(() => {
    if (checkedBox.length === ingredients.length) {
      setIsDisabled(false);
    }
  }, [checkedBox.length, ingredients.length, setIsDisabled]);

  // console.log(idMeal);

  return (
    <Container className="ing">
      {ingredients.map((element, index) => (
        <label
          htmlFor={ element }
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            key={ index }
            id={ element }
            value={ index }
            checked={ checkedBox.includes(index) }
            onChange={ handleChange }
          />
          { `${measures[index]} ${element}`}
        </label>))}
    </Container>
  );
}

export default RecipeIngredients;

RecipeIngredients.propTypes = {
  recipe: PropTypes.shape().isRequired,
  idMeal: PropTypes.string.isRequired,
  idDrink: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
