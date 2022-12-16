const addCategory = (category) => {
    return async dispatch => {
        dispatch({
            type: "ADD_CATEGORY",
            payload: {
                category: category
            }
        })
    }
}

const deleteCategory = (id, isExpense) => {
    return async dispatch => {
      dispatch({
        type: "DELETE_CATEGORY",
        payload: {
          id: id,
          isExpense: isExpense,
        }
      })
    }
  }

const setCategories = (categories) => {
    return async dispatch => {
      dispatch({
        type: "SET_CATEGORIES",
        payload: {
          categories: categories,
        }
      })
    }
  }
  
const categoryActions = {
  addCategory,
  deleteCategory,
  setCategories,
}
  
  export default categoryActions;