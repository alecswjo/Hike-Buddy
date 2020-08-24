import { NavigationActions } from 'react-navigation';

//We need to use this when we need to access navigate outside of React Components (example: express API)
let navigator;

export const setNavigator = (nav) => {
    navigator = nav;
};

export const navigate = (routeName, params) => {
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    );
};