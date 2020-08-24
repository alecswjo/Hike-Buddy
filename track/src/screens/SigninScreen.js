import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { NavigationEvents } from 'react-navigation'; 


const SigninScreen = () => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext);

    return (
        <View style = {styles.container}>
            <NavigationEvents 
                onWillFocus = {clearErrorMessage} 
                onWillBlur = {clearErrorMessage}
            />
            <AuthForm
                headerText= "Sign In for Tracker"
                errorMessage={state.errorMessage}
                submitButtonText= "Sign In"
                onSubmit= {signin}
            />
            <NavLink 
                routeName = "Signup"
                text="Don't have an account? Sign up instead"
            />
        </View>
    );
};

SigninScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 250
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    }
});

export default SigninScreen;