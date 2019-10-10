export const kebabToCamel = str => { 
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

export const camelToKebab = str => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};

export const debounce = (func, timer) => {
  let timeId = null;
  return (...args) => {
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      func(...args);
    }, timer);
  }
}

// Consider moving this into own utils file later
export const isRecipeFullyLoaded = (recipe) => {
  console.log('recipe');
  console.log(recipe)
  if (!recipe) return false;

  const recipeKeys = [
    '_id',
    'ingredients',
    'ratingCount',
    'ratingValue',
    'author',
    'titleMain',
    'titleSub',
    'cookTimeMins',
    'servings',
    'calories',
    'description',
    'thumbnailUrl',
    'ingredientsImageUrl',
    'instructions',
    'createdAt'
  ]

  return JSON.stringify(Object.keys(recipe)) === JSON.stringify(recipeKeys);
}


// this.addEventListener('keyup', debounce((e) => console.log(e.key), 1000))