

const initialState = [
    {
        
    }
]
let copyState = null;
let index = 0;
const authReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case "LOGIN_USER":
            return 'login'
        case "LOGOUT_USER":
            return 'logout'
        case "UPDATE_USER":
            return 'update'
        default:
            return state
    }
}

export default authReducer;