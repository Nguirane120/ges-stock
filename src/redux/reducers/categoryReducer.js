
const intialState = {
    categories: [],
  };


export const categoryReducer = (state = intialState, { type, payload }) => {
  switch (type) {

      case "CATEGORY_LIST":
        state =  {...state, categories: payload}
        return state
        break;
      case "ADD_CATEGORY":
        state = {...state, categories: payload}
        return state
        break;
      case "UPDATE_CATEGORY":
        return {...state, categories:[...state.categories.filter((category) => category.id !== payload.id
          )]}

          break;

      case "DELETE_CATEGRORY":
        return {...state, categories:[state.categories.filter((category) => category.id !== payload.id
          )]}
        break;
      default:
      return state
  }
};