const initialState = {
  currentPage: 0,
  transactions: []
}

const transactionReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case "SET_TRANSACTIONS" :{
      return {...state, transactions: payload.transactions}
    }
    case "SORT_TRANSACTION": {
      if (payload.sort === 'low') {
        let transactions = state.transactions.sort((a, b) => (a.amount > b.amount) ? 1 : -1)
        return {...state, transactions: transactions}
      }

      else if (payload.sort === 'high') {
        let transactions = state.transactions.sort((a, b) => (a.amount < b.amount) ? 1 : -1)
        return {...state, transactions: transactions}
      }

      else if (payload.sort === 'oldest') {
        let transactions = state.transactions.sort((a, b) => new Date(a.date) - new Date(b.date))
        return {...state, transactions: transactions}
      }
      else if (payload.sort === 'recent') {
        let transactions = state.transactions.sort((a, b) => new Date(b.date) - new Date(a.date))
        return {...state, transactions: transactions}
      }
      else {
        return {...state}
      }
    }
    case "DELETE_TRANSACTION": {
      let transactions = state.transactions.filter((t) => t.id !== payload.transaction)
      return {...state, transactions: transactions}
    }
    case "ADD_TRANSACTION": {
      let newTransaction = payload.transaction;
      if (!newTransaction) return state;
      let transactions = [newTransaction, ...state.transactions];
      return {...state, transactions: transactions};
    }
    default: 
      return state
  }
}

export default transactionReducer