const deleteTransaction = (transaction) => {
  return async dispatch => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: transaction
    })
  }
}

const transactionActions = {
  deleteTransaction,
}

export default transactionActions