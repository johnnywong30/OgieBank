import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import Auth from './Auth/index'

const Routes = () => {
    const dispatch = useDispatch()
    
    return (
        <>
            <BrowserRouter>
                <Route exact path ="/login" element={<Auth/>}/>
                <Route exact path ="/"/>
            </BrowserRouter>
        </>
    )
}

export default Routes