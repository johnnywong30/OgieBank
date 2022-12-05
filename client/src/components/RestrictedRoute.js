import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RestrictedRoute = ({ element, ...rest }) => {
    const isAuth = useSelector(({ auth }) => auth.auth)

    if (isAuth) {
        return (
            <Routes>
                <Route
                {...rest}
                element={element}
                />
            </Routes>
        )
    } else {
        return (
            <Navigate to='/login' replace />
        )
    }
}

export default RestrictedRoute