import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import shareIcon from '../images/shareIcon.svg';
// import favoriteWhiteIcon from '../images/whiteHeartIcon.svg';
import favoriteBlackIcon from '../images/blackHeartIcon.svg';
import FavoriteWithDetails from '../effects/FavoriteWithDetails';

export default function FavoriteMeals() {
  const [allWithDetails, setAllWithDetails] = useState([]);

  FavoriteWithDetails(setAllWithDetails);

  const checkType = (item, index) => {
    const keys = Object.keys(item);
    const isFood = keys.find((key) => key === 'idMeal');
    if (isFood) {
      return (
        <Card key={ index }>
          <Card.Img
            data-testid={ `${index}-horizontal-image` }
            src={ item.strMealThumb }
          />
          <Card.Title
            data-testid={ `${index}-horizontal-name` }
          >
            { item.strMeal }
          </Card.Title>
          <Card.Text data-testid={ `${index}-horizontal-top-text` }>
            { item.strCategory }
          </Card.Text>
          <Card.Text data-testid={ `${index}-horizontal-done-date` }>
            { item.dateModified }
          </Card.Text>
          <Card.Text data-testid={ `${index}-${item.strTags}-horizontal-tag` }>
            {item.strTags}
          </Card.Text>
          <Card.Text>{ item.strArea }</Card.Text>
          <Card.Img
            type="button"
            style={ { width: '2rem' } }
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="Compartilhar"
          />
          <Card.Img
            style={ { width: '2rem' } }
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ favoriteBlackIcon }
            alt="desfavoritar"
          />
        </Card>
      );
    }
  };

  return (
    <div>
      { allWithDetails.map((item, index) => checkType(item, index)) }
    </div>
  );
}

FavoriteMeals.propTypes = {
  item: PropTypes.obj,
  index: PropTypes.index,
}.isRequired;
