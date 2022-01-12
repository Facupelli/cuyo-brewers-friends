import { Dispatch } from "redux";
import axios from "axios";
import { RecipesActionType, UserActionType, BlogActionType } from "../actions/ActionsTypes";
import { RecipeActions } from "../actions/RecipesActions";
import { UserActions } from "../actions/UserActions";
import { BlogActions } from "../actions/BlogActions";

export const loadingTrue = () => {
  return (dispatch: Dispatch<RecipeActions>) => {
    dispatch({
      type: RecipesActionType.RECIPES_LOADING,
    });
  };
};

type Filters = {
  style: string;
  sub_category: string;
  beer_title: string;
  username: string;
};

export const getRecipes =
  (filters?: Filters) => async (dispatch: Dispatch<RecipeActions>) => {
    try {
      dispatch({
        type: RecipesActionType.RECIPES_LOADING,
      });
      let res: any;

      if (filters) {
        if (filters.username) {
          res = await axios.get<any>(`/recipe?username=${filters.username}`);
        }
        if (filters.beer_title) {
          res = await axios.get<any>(`/recipe?title=${filters.beer_title}`);
        }
        if (filters.sub_category) {
          res = await axios.get<any>(
            `/recipe?sub_category=${filters.sub_category}`
          );
        }
      }
      if (!filters) {
        res = await axios.get<any>("/recipe");
      }

      return dispatch({
        type: RecipesActionType.RECIPES_GET,
        payload: res.data.recipesList,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: RecipesActionType.RECIPES_FAIL,
      });
    }
  };

export const getTopRecipes =
  () => async (dispatch: Dispatch<RecipeActions>) => {
    try {
      let res: any;

      res = await axios.get<any>("/recipe?top=true");

      return dispatch({
        type: RecipesActionType.RECIPES_GET_TOP,
        payload: res.data.recipesList,
      });
    } catch (e) {}
  };

// ------------------------ USER ACTIONS

export const setCookie = (cookie: string) => {
  return (dispatch: Dispatch<UserActions>) => {
    dispatch({
      type: UserActionType.SET_COOKIE,
      payload: cookie,
    });
  };
};

export const getUserData =
  (id: any) => async (dispatch: Dispatch<UserActions>) => {
    try {
      const res = await axios.get<any>(`/user?id=${id}`);

      return dispatch({
        type: UserActionType.GET_USER_DATA,
        payload: res.data,
      });
    } catch (e) {}
  };

// ------------------------ BLOG ACTIONS

export const getBlogs = () => async (dispatch: Dispatch<BlogActions>) => {
  try {
    const res = await axios.get<any>("/blog");

    return dispatch({
      type: BlogActionType.GET_BLOGS,
      payload: res.data,
    });
  } catch (e) {}
};
