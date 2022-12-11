import React, { useState } from "react";
import {
    Button
} from '@chakra-ui/react'
import { useSelector, useDispatch } from "react-redux";
import actions from '../../src/redux/actions/auth'
import axios from 'axios'

const Logout = () => {
    const isAuth = useSelector(({auth}) => auth.auth);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch() 

    const handleLogout = async (e) => {
        if (isAuth) {
            setLoading(true)
            await axios.get('/api/user/logout')
            dispatch(actions.logoutAuthUser())
            console.log('Logged Out!')
        }
    }
    return isAuth ? (
        <Button
            isLoading={loading}
            onClick={() => handleLogout()}
        >
            Logout
        </Button>
    ) : (
        <></>
    )
}

export default Logout