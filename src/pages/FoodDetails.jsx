import React, { useState } from 'react';
import { Card, Carousel, Button } from 'react-bootstrap';
import FavoriteButton from '../components/FavoriteButton';
import RecipeDetail from '../effects/RecipeDetails';
import RecipeInit from '../effects/RecipeInit';
import { ApiCocktailFirstItems } from '../services/theCockTailAPI';
import { ApiRecipeDetail } from '../services/theMealAPI';
import ShareButton from '../components/ShareButton';

export default function FoodDetails() {
  const [currMeal, setCurrMeal] = useState({
    recipe: {},
    recomends: [],
    arrRecipeIngredients: [],
    arrRecipeMeasureUnit: [],
    doneRecipe: false,
    inProgress: false,
    recipeInit: false,
  });

  RecipeDetail(currMeal, ApiRecipeDetail, ApiCocktailFirstItems, setCurrMeal);
  RecipeInit(currMeal);
  let video = '';
  if (!currMeal.recipe) return;
  const { arrRecipeIngredients, arrRecipeMeasureUnit,
    recipe, recomends, doneRecipe, inProgress } = currMeal;
  if (recipe.strYoutube) {
    video = recipe.strYoutube.split('=');
  }
  return (
    <Card style={ { width: '18rem' } }>
      <h2 data-testid="recipe-title">{recipe.strMeal}</h2>
      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        data-testid="recipe-photo"
      />
      <ShareButton />
      <FavoriteButton recipe={ recipe } />
      <h3 data-testid="recipe-category">{recipe.strCategory}</h3>
      <h3>Ingredientes:</h3>
      {arrRecipeIngredients.map((ingredient, index) => {
        if (!ingredient[1]) return;
        return (
          <p
            key={ `${index}-${ingredient[1]}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredient[1]}: `}
            <span>{arrRecipeMeasureUnit[index][1]}</span>
          </p>
        );
      })}
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <iframe
        title="video"
        width="280"
        height="157.5"
        data-testid="video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write;
        encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        src={ recipe.strYoutube && `https://www.youtube.com/embed/${video[1]}` }
      />
      <h4>Bebidas Recomendadas:</h4>
      <Carousel>
        {recomends.map((item, index) => (
          <Carousel.Item key={ `${index}-${item.strDrink}` }>
            <img
              className="d-block w-100"
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
              data-testid={ `${index}-recomendation-card` }
            />
            <Carousel.Caption>
              <h3 data-testid={ `${index}-recomendation-title` }>{item.strDrink}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      {!doneRecipe ? (
        <Button
          variant="dark"
          className="fixed-bottom"
          data-testid="start-recipe-btn"
          onClick={ () => setCurrMeal({ ...currMeal, recipeInit: true }) }
        >
          {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
        </Button>) : null}
    </Card>
  );
}
