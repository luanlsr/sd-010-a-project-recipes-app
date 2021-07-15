import fetchJson from '../lib/fetchJson';

function parseMealResults(results) {
  const parsed = results.meals.map((meal) => ({
    ...meal,
    id: meal.idMeal,
    name: meal.strMeal,
    imagePath: meal.strMealThumb,
  }));

  return parsed;
}

function parseIngredientResults(ingredients) {
  const parsed = ingredients.map((ingredient) => ({
    ...ingredient,
    id: ingredient.idIngredient,
    name: ingredient.strIngredient,
    imagePath: `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`,
  }));

  return parsed;
}

export async function mealsData(options) {
  const results = await fetchJson('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const resultsParsed = parseMealResults(results);

  const categories = await fetchJson('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

  if (options && options.category) {
    const filter = await fetchJson(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${options.category}`,
    );

    return parseMealResults(filter);
  }

  if (options && options.ingredient) {
    const filter = await fetchJson(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${options.ingredient}`,
    );

    return parseMealResults(filter);
  }

  if (options && options.name) {
    const filter = await fetchJson(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${options.name}`,
    );

    return parseMealResults(filter);
  }

  if (options && options.firstletter) {
    const filter = await fetchJson(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${options.firstletter}`,
    );

    return parseMealResults(filter);
  }

  return {
    titlePage: 'Comidas',
    categories: categories.meals,
    list: resultsParsed,
  };
}

export async function exploreMealsData(area) {
  const randomMeal = await fetchJson('https://www.themealdb.com/api/json/v1/1/random.php');

  const ingredients = await fetchJson('https://www.themealdb.com/api/json/v1/1/list.php?i=list');

  const areas = await fetchJson('https://www.themealdb.com/api/json/v1/1/list.php?a=list');

  if (area) {
    if (area === 'All') {
      const results = await fetchJson('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      return parseMealResults(results);
    }
    const filterMeals = await fetchJson(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    return parseMealResults(filterMeals);
  }

  const parseIngredients = parseIngredientResults(ingredients.meals);

  const parserRandom = parseMealResults(randomMeal);

  return {
    titlePage: 'Explorar Comidas',
    random: parserRandom,
    ingredients: parseIngredients,
    areas: areas.meals,
  };
}
