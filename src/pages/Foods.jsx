import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import MyContext from '../contexts/MyContext';
import Footer from '../components/Footer';
import genericFetch from '../services/genericFetch';
import CategoryBar from '../components/CategoryBar';
import Loading from '../components/Loading';
import '../styles/recipes.css';

function Foods({ history }) {
  const { meals, setUserPage, noResultsFound, setNoResultsFound, shouldRedirect,
  } = useContext(MyContext);
  const message = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  const { alert } = window;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const setPage = () => {
      setUserPage('Foods');
    };
    setPage();
  }, [setUserPage]);

  useEffect(() => {
    const mealsCategoriesUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const quantity = 5;

    const getCategories = async () => {
      const data = await genericFetch(mealsCategoriesUrl);
      const fiveCategories = data.meals.slice(0, quantity);
      setCategories(fiveCategories);
    };

    getCategories();
  }, []);

  if (meals.length === 1 && shouldRedirect) history.push(`/comidas/${meals[0].idMeal}`);

  if (noResultsFound) {
    alert(message);
    setNoResultsFound(false);
  }

  return (
    <div>
      <Header pageTitle="Comidas" searchFeat />
      <CategoryBar categories={ categories } recipeType="meals" />
      <div className="master">
        {
          (
            (!meals.length) ? <Loading />
              : meals.map((meal, index) => (
                <Link key={ index } to={ `/comidas/${meal.idMeal}` }>
                  <RecipeCard
                    meal={ meal }
                    imgUrl={ meal.strMealThumb }
                    name={ meal.strMeal }
                    index={ index }
                  />
                </Link>
              ))
          )
        }
      </div>
      <Footer />
    </div>
  );
}

Foods.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Foods;