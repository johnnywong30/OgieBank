import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Auth from './Auth'

const Routes = () => {
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