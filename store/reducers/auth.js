// store tokens here if necessary
import { LOGIN, SIGNUP, ERROR, SIGNOUT, IS_LOADING } from '../actions/auth'

const initialState = {
    authenticated: false,
    uid: null,
    name: null,
    email: null,
    phone: null,
    errorMSG: null,
    errorType: null,
    isLoading: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP:
            return {...state, authenticated: action.authenticated, name: action.name, email: action.email, phone: action.phone, uid: action.uid }
        case LOGIN:
            return {...state, authenticated: action.authenticated, name: action.name, email: action.email, phone: action.phone, uid: action.uid }
        case ERROR:
            return {...state, errorMSG: action.errorMSG, isLoading: false, errorType: action.errorType }
        case IS_LOADING:
            return {...state, isLoading: action.value }
        case SIGNOUT:
            return {
                authenticated: false,
                uid: null,
                name: null,
                email: null,
                phone: null,
                errorMSG: null,
                errorType: null,
                isLoading: false
            }
        default:
            return state
    }
}

export default authReducer;