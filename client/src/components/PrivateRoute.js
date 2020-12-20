import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticationService } from '../services';

export const PrivateRoute = ({component: Component, ...rest}) => {
    const currentUser = authenticationService.currentUserValue;
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            currentUser ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};