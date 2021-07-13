import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../../styles/global.scss';
import c from './constants';
import Loading from '../../components/Loading';
import DetailContext from '../../context/DetailScreen/DetailContext';
import BasicInfo from '../../components/RecipeDetails/BasicInfo';
import InteractiveButtons from '../../components/RecipeDetails/InteractiveButtons';
import Ingredients from '../../components/RecipeDetails/Ingredients';
import Instructions from '../../components/RecipeDetails/Instructions';
import VideoRecipe from '../../components/RecipeDetails/VideoRecipe';
import Recommendations from '../../components/RecipeDetails/Recommendations';
import StartRecipe from '../../components/RecipeDetails/StartRecipe';

function DetailScreen() {
  const {
    setInfoDetails,
    setInfoRecommended,
    recipeDetails,
    isLoading,
  } = useContext(DetailContext);

  const { id } = useParams();
  const { pathname } = useLocation();
  const foodOrDrink = pathname.split('/')[1];
  const data = {
    comidas: {
      key: c.meals,
      domain: c.themealdb,
      name: c.Meal,
      category: c.strCategory,
      keyRecommend: c.drinks,
      domainRecommend: c.thecocktaildb,
      nameRecommend: c.Drink,
      categoryRecommend: c.strAlcoholic,
    },
    bebidas: {
      key: c.drinks,
      domain: c.thecocktaildb,
      name: c.Drink,
      category: c.strAlcoholic,
      keyRecommend: c.meals,
      domainRecommend: c.themealdb,
      nameRecommend: c.Meal,
      categoryRecommend: c.strCategory,
    },
  };

  const API_INFO_DETAILS = {
    id,
    key: data[foodOrDrink].key,
    domain: data[foodOrDrink].domain,
  };

  const API_INFO_RECOMMENDED = {
    key: data[foodOrDrink].keyRecommend,
    domain: data[foodOrDrink].domainRecommend,
    qtdR: 6,
  };

  const type = {
    name: data[foodOrDrink].name,
    category: data[foodOrDrink].category,
    nameRecommend: data[foodOrDrink].nameRecommend,
    categoryRecommend: data[foodOrDrink].categoryRecommend,
  };

  // const recipeDetails = useRecipeDetails(API_INFO_DETAILS);
  // const recommendedRecipes = useRecipes(API_INFO_RECOMMENDED);

  useEffect(() => {
    setInfoDetails(API_INFO_DETAILS);
    setInfoRecommended(API_INFO_RECOMMENDED);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleStorage() {
    let duplicated = false;
    let savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    let alcoholicOrNot = '';
    let area = '';
    if (type.category === 'strAlcoholic') alcoholicOrNot = 'Alcoholic';
    if (recipeDetails.strArea) area = recipeDetails.strArea;

    const favoriteRecipe = {
      id: recipeDetails[`id${type.name}`],
      type: foodOrDrink.split('s')[0],
      area,
      category: recipeDetails.strCategory,
      alcoholicOrNot,
      name: recipeDetails[`str${type.name}`],
      image: recipeDetails[`str${type.name}Thumb`],
    };

    if (savedRecipes) {
      savedRecipes = savedRecipes
        .filter(({ id: recipeId }) => {
          const isNotDuplicated = recipeId !== recipeDetails[`id${type.name}`];
          if (!isNotDuplicated) duplicated = true;
          return isNotDuplicated;
        });
      if (duplicated) {
        return localStorage
          .setItem('favoriteRecipes', JSON.stringify(savedRecipes));
      }
      return localStorage
        .setItem('favoriteRecipes', JSON.stringify([...savedRecipes, favoriteRecipe]));
    }

    localStorage
      .setItem('favoriteRecipes', JSON.stringify([favoriteRecipe]));
  }

  function renderDetails() {
    return (
      <>
        <BasicInfo
          name={ type.name }
          category={ type.category }
        />
        <InteractiveButtons handleStorage={ handleStorage } id={ id } />
        <Ingredients />
        <Instructions name={ type.name } />
        <VideoRecipe name={ type.name } />
        <Recommendations
          name={ type.nameRecommend }
          category={ type.categoryRecommend }
        />
        <StartRecipe />
      </>
    );
  }

  return (
    <div>
      {isLoading ? <Loading /> : renderDetails()}
    </div>

  );
}

export default DetailScreen;