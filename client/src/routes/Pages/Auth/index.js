import * as React from 'react'

import { Routes, BrowserRouter as Router, Route } from "react-router-dom";

import Login from './Login'
import Register from './Register'

const Auth = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
        </Routes>
    )
}

export default Auth