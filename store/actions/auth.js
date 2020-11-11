import { auth } from '../../firebase/config';

// TYPES
export const LOGIN = 'LOGIN'
export const SIGNUP = 'SIGNUP'
export const ERROR = 'ERROR'
export const SIGNOUT = 'SIGNOUT'
export const IS_LOADING = 'IS_LOADING'

export const login = (email, password) => {
    return async(dispatch) => {
        dispatch(isLoading(true))
        auth.signInWithEmailAndPassword(email, password).then((response) => {
            const uid = auth.currentUser.uid
            const email = auth.currentUser.email
            const phone = auth.currentUser.photoURL
            const name = auth.currentUser.displayName

            dispatch({
                type: LOGIN,
                authenticated: true,
                uid,
                email,
                phone,
                name
            })
            dispatch(isLoading(false))
        }).catch((err) => dispatch(error(err, "login")))
    }
}


export const signup = (email, password, name, phone) => {
    return async(dispatch) => {
        dispatch(isLoading(true))
        auth.createUserWithEmailAndPassword(email, password).then((result) => {
            name = name.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
            email = email.toLowerCase()
            phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
            const uid = result.user.uid

            result.user.updateProfile({
                    displayName: name,
                    // set phone to photoURL to because we can't set phone
                    photoURL: phone
                })
                .then(() => {
                    dispatch({
                        type: SIGNUP,
                        authenticated: true,
                        uid,
                        email,
                        phone,
                        name
                    })
                    dispatch(isLoading(false))
                })
                .catch((err) => { throw (err) })
        }).catch((err) => {
            dispatch(error(err, "signup"))
            console.log(err)
        })
    }
}

// handle authentication errors here
export const error = (errorMSG, errorType) => {
    return (dispatch) => {
        if (errorMSG) {
            errorMSG = errorMSG.toString()
        }
        dispatch({
            type: ERROR,
            errorMSG: errorMSG,
            errorType
        })
    }
}

export const signOut = () => {
    return async(dispatch) => {
        auth.signOut().then(() => {
            dispatch({ type: SIGNOUT })
        })
    }
}

export const isLoading = (value) => {
    return (dispatch) => {
        dispatch({ type: IS_LOADING, value })
    }
}