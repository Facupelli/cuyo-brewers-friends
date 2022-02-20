export enum RecipesActionType {
  RECIPES_LOADING = "RECIPES_LOADING",
  RECIPES_FAIL = "RECIPES_FAIL",
  RECIPES_GET = "RECIPES_GET",
  RECIPES_GET_TOP = "RECIPES_GET_TOP",
  LOAD_MORE_RECIPES = 'LOAD_MORE_RECIPES',
  TOTAL_NUM_RECIPES = 'TOTAL_NUM_RECIPES',
}

export enum ProductsActionType {
  PRODUCTS_LOADING = "PRODUCTS_LOADING",
  PRODUCTS_FAIL = "PRODUCTS_FAIL",
  PRODUCTS_GET = "PRODUCTS_GET",
  PRODUCTS_GET_TOP = "PRODUCTS_GET_TOP",
}

export enum UserActionType {
  SET_COOKIE = "SET_COOKIE",
  GET_USER_DATA = "GET_USER_DATA",
}

export enum BlogActionType {
  GET_BLOGS = "GET_BLOGS",
}
