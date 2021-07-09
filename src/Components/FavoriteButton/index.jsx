import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../../context/RecipesContext';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import './styles.css';

function FavoriteButton({ recipe, recipeType }) {
  const { setFavoriteRecipes, favoriteRecipes } = useContext(recipesContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const findFavorite = favoriteRecipes.favRecipes
    .find((fav) => fav[`id${recipeType}`] === recipe[`id${recipeType}`]);
  const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let findFavoriteLocal;
  if (localFavorites) {
    findFavoriteLocal = localFavorites
      .find((fav) => fav.id === recipe[`id${recipeType}`]);
  }

  const objLocalStorage = {
    id: recipe[`id${recipeType}`],
    type: recipeType === 'Meal' ? 'comida' : 'bebida',
    area: recipeType === 'Meal' ? recipe.strArea : '',
    category: recipe.strCategory,
    alcoholicOrNot: recipeType === 'Drink' ? recipe.strAlcoholic : '',
    name: recipe[`str${recipeType}`],
    image: recipe[`str${recipeType}Thumb`],
  };

  useEffect(() => {
    if (findFavoriteLocal || findFavorite) {
      setIsFavorite(true);
    }
  }, [findFavoriteLocal, findFavorite]);

  const saveFavoriteButton = (item) => {
    if (!isFavorite) {
      setIsFavorite(true);
      setFavoriteRecipes({
        favRecipes: [...favoriteRecipes.favRecipes, item],
      });
      return localFavorites
        ? localStorage.setItem(
          'favoriteRecipes', JSON.stringify([...localFavorites, objLocalStorage]),
        )
        : localStorage.setItem('favoriteRecipes', JSON.stringify([objLocalStorage]));
    }
    if (isFavorite) {
      setIsFavorite(false);
      const removedItem = favoriteRecipes.favRecipes
        .filter((fav) => fav[`id${recipeType}`] !== recipe[`id${recipeType}`]);
      setFavoriteRecipes({
        favRecipes: removedItem,
      });
      return localStorage.setItem('favoriteRecipes', JSON.stringify(
        localFavorites.filter((value) => value.id !== recipe[`id${recipeType}`]),
      ));
    }
    return localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  };

  return (
    <div className="fav-btn">
      <input
        type="image"
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="favorite button"
        onClick={ () => saveFavoriteButton(recipe) }
      />
    </div>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string),
  recipeType: PropTypes.string,
}.isRequired;
export default FavoriteButton;
