import { useReducer } from "react";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  // UPDATE_SORT,
  // UPDATE_CURRENT_SORT,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    // case UPDATE_SORT:
    //   return {
    //     ...state,
    //     sortoptions: [...action.sortoptions],
    //   };

    // case UPDATE_CURRENT_SORT:
    //   return {
    //     ...state,
    //     currentSort: action.currentSort,
    //   };

    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
