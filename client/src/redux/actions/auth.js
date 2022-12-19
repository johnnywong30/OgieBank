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

const authActions = {
    loginAuthUser,
    logoutAuthUser,
    updateUser,
    addTransactionUser,
}

export default authActions;