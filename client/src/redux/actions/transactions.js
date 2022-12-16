const deleteTransaction = (transaction) => {
  return async dispatch => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: {
        transaction: transaction
      }
    })
  }
}

const sortTransactions = (sortType) => {
  return async dispatch => {
    dispatch({
      type: "SORT_TRANSACTION",
      payload: {
        sort: sortType
      }
    })
  }
}

const addTransaction = (transaction) => {
  return async dispatch => {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: {
        transaction: transaction
      }
    })
  }
}

const setTransactions = (transactions) => {
  return async dispatch => {
    dispatch({
      type: "SET_TRANSACTIONS",
      payload: {
        transactions: transactions
      }
    })
  }
}

const transactionActions = {
  deleteTransaction,
  sortTransactions,
  addTransaction,
  setTransactions
}

export default transactionActions