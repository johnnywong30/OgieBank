const initialState = {
  categories: {expenses: [], spending: []},
}

const categoryReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case "ADD_CATEGORY": {
      let newCategory = payload.category;
      if (!newCategory) return state;

      if (newCategory.isExpense === true){
        let expenses = state.categories.expenses;
        expenses.push(newCategory);
        return {...state, categories: {expenses: expenses, spending: state.categories.spending}}
      } else {
        let spending = state.categories.spending;
        newCategory.balance = 0;
        spending.push(newCategory);
        return {...state, categories: {expenses: state.categories.expenses, spending: spending}}
      }
    }
    case "DELETE_CATEGORY": {
      if (payload.isExpense){
        let expenses = state.categories.expenses.filter((e) => e.id !== payload.id);
        return {...state, categories: {expenses: expenses, spending: state.categories.spending}}
      } else {
        let spending = state.categories.spending.filter((e) => e.id !== payload.id);
        return {...state, categories: {expenses: state.categories.expenses, spending: spending}}
      }
    }
    default: 
      return state
  }
}

export default categoryReducer;