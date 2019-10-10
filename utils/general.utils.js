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
