import React from "react";
import { Routes, BrowserRouter as Router, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from './Pages/Login'
import Register from './Pages/Register'
import Error from './Pages/Error'
import ProtectedTest from "./Pages/ProtectedTest";
import Home from './Pages/Home'

const RestrictedRoute = ({ children, redirectTo}) => {
    const isAuth = useSelector(({auth}) => auth.auth);
    return isAuth ? children : <Navigate to={redirectTo} />
}

// Page = Home Page, Login Page, Register Page; consists of multiple functionality
// Component = Button, Form, Something with one functionality


const AllRoutes = () => {
    // hook to just find the current location the user is at route wise
	const location = useLocation();
    return (
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />    
            <Route path='/protected' element={
                <RestrictedRoute redirectTo={'/login'}>
                    {/* this was just to test protected routes */}
                    <ProtectedTest/>
                </RestrictedRoute>
            }/>
            <Route path='/' element={<Home/>}/>
            <Route path='*' element={<Home/>}/>
        </Routes>
    )
}

export default AllRoutes;