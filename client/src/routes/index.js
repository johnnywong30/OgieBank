import React, { useEffect } from "react";
import { Redirect, Route, Switch, Router } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const Routes = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    
    return (
        <>
            <Switch>
                <Route exact path ="/login"/>
                <Route exact path ="/"/>
            </Switch>
        </>
    )
}