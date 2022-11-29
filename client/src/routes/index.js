import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Auth from './Auth'

const AllRoutes = () => {
    return (
        <Router>
            <Auth/>
        </Router>
    )
}

export default AllRoutes