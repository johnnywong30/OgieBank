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

const authActions = {
    loginAuthUser,
    logoutAuthUser,
    updateUser
}

export default authActions;