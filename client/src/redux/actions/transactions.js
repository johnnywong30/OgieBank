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

const transactionActions = {
  deleteTransaction,
  sortTransactions
}

export default transactionActions