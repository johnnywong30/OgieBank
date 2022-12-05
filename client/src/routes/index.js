import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Error from '../components/Error'
import RestrictedRoute from '../components/RestrictedRoute'

import Auth from './Pages/Auth'


const AllRoutes = () => {
    // hook to just find the current location the user is at route wise
	const location = useLocation();
    const isAuth = useSelector(({auth}) => auth.auth)
    const freePaths = ['/', '/login', '/register']
    // don't have any restricted paths yet
    const restrictedPaths = ['/error']
    // if (! isAuth && (restrictedPaths.includes(location.pathname))) {
    //     return <Navigate to={'/login'} replace/>
    // } else if (isAuth && (freePaths.includes(location.pathname))) {
    //     // might need to fix where this goes
    //     return <Navigate to={'/register'} replace/>
    // } 
    return (
        <>
            <Auth/>
            {/* <RestrictedRoute exact path='/error' element={<Error/>}/> */}
        </>
    )
}

export default AllRoutes