import {
  CLEAR_ERRORS,
  SET_ERRORS,
  SET_UI_LOADING,
  UNSET_UI_LOADING
} from "./types";

export const uiInitState = { loading: false, errors: null };
export const uiReducer = (state, action) => {
  switch (action.type) {
    case SET_UI_LOADING:
      return {
        ...state,
        loading: true
      };
    case UNSET_UI_LOADING:
      return {
        ...state,
        loading: false
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null
      };
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};
