import { User } from '../../models/User'

const initialState = {
    user: {},
    auth: false
}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case "LOGIN_USER":
            return {
                ...state,
                user: new User(payload),
                auth: true
            }
        case "LOGOUT_USER":
            return {
                ...state,
                user: {},
                auth: false
            }
        case "UPDATE_USER":
            return {
                ...state,
                user: new User(payload),
                auth: true
            }
        default:
            return state
    }
}

export default authReducer;