import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import CocktailsContext from '../context/CocktailsContext';

export default function CocktailsCards() {
  const { cocktails, setCurrCategoryId } = useContext(CocktailsContext);
  const { drinks } = cocktails;
  const end = 12;
  const drinksArray = drinks ? drinks.slice(0, end) : [];

  return (
    <div>
      {drinksArray.length > 0
      && drinksArray.map((recipe, index) => (
        <Card
          onClick={ async () => setCurrCategoryId(recipe.idDrink) }
          style={ { width: '18rem' } }
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <Card.Img
            variant="top"
            src={ recipe.strDrinkThumb }
            data-testid={ `${index}-card-img` }
            alt="recipe"
          />
          <h3 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h3>
        </Card>
      ))}
    </div>
  );
}