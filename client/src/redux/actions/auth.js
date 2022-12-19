const loginAuthUser = (user) => {
    return async dispatch => {
        dispatch({
            type: "LOGIN_USER",
            payload: user
        })
    }
}


const logoutAuthUser = () => {
    return async dispatch => {
        dispatch({
            type: "LOGOUT_USER"
        })
    }
}

const updateUser = (user) => {
    return async dispatch => {
        dispatch({
            type: "UPDATE_USER",
            payload: user
        })
    }
}

const addTransactionUser = (transaction) => {
    return async dispatch => {
        dispatch({
            type: "ADD_TRANSACTION_USER",
            payload: transaction,
        })
    }
}

const deleteTransactionUser = (transaction) => {
    return async dispatch => {
        dispatch({
            type: "DELETE_TRANSACTION_USER",
            payload: transaction,
        })
    }
}

const addCategoryExpenseUser = (amount) => {
    return async dispatch => {
        dispatch({
            type: "ADD_CATEGORY_EXPENSE_USER",
            payload: {amount: amount},
        })
    }
}

const deleteCategoryExpenseUser = (amount) => {
    return async dispatch => {
        dispatch({
            type: "DELETE_CATEGORY_EXPENSE_USER",
            payload: {amount: amount},
        })
    }
}

const authActions = {
    loginAuthUser,
    logoutAuthUser,
    updateUser,
    addTransactionUser,
    deleteTransactionUser,
    addCategoryExpenseUser,
    deleteCategoryExpenseUser,
}

export default authActions;