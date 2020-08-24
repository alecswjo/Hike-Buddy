import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signin':
            return { errorMessage:'', token: action.payload };
        case 'clear_error_message':
            return { ...state, errorMessage: ''};
        case 'signout':
            return { token: null, errorMessage: ''};
        default:
            return state; 
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'signin', payload: token});
        navigate('TrackList');
    } else {
        navigate('Signup');
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'});
};

//QUICK EXAMPLE
// const add = (a, b) => {
//     return a + b;
// }

// Same thing as above:
// const add = (a, b) => a + b;

const signup = (dispatch) => async ({ email, password }) => {
        // make API request to sign up with that email and password
        try {
            //if we sign up, modify our state, and say that we are authenticated
            const response = await trackerApi.post('/signup', {email, password});
            
            // Storing JWT token on local device
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type: 'signin', payload: response.data.token});

            // Navigate to main flow
            navigate('TrackList');
        } catch (err) {
            //if signing up fails, we probably need to reflect an error message somewhere
            //We call dispatch every time we want to change a state
            dispatch({ type: 'add_error', payload: 'Something went wrong with sign up'});
        }
    };

const signin = (dispatch) => async ({ email, password }) => {
        // make API request to sign in with that email and password
        try {
            const response = await trackerApi.post('/signin', {email, password});
            
            // Storing JWT token on local device
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type: 'signin', payload: response.data.token});

            // Navigate to main flow
            navigate('TrackList');
        } catch (err) {
            dispatch({ type: 'add_error', payload: 'Something went wrong with sign up'});
        }
};

const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'signout'});
    navigate('loginFlow');
};

export const { Provider, Context } = createDataContext(
    authReducer,
    {signin, signout, signup, clearErrorMessage, tryLocalSignin},
    { token: null, errorMessage: '' }
);