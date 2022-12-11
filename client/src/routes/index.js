import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from '../redux/actions/auth'
import axios from 'axios'

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
    const isAuth = useSelector(({ auth }) => auth.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // check session with the server
    useEffect(() => {
        const checkSession = async () => {
            console.log('checking session')
            const { data } = await axios.get('/api/user/session')
            if (!isAuth && !data.error) {
                console.log(data)
                dispatch(actions.loginAuthUser(data))
            }
            console.log('done checking session')
        }
        checkSession() 
    }, [])

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
            <Route path='*' element={<Error/>}/>
        </Routes>
    )
}

export default AllRoutes;