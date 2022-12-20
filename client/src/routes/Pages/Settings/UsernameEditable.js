import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from '../../../redux/actions/auth';
import axios from "axios";
import CustomEditable from "./CustomEditable";
import validation from "../../../constants/validation";


const UsernameEditable = () => {
    const dispatch = useDispatch();
    const { username, id } = useSelector(({ auth }) => auth.user )

    const [ name, setName ] = useState(username ? username : '')

    const onCancel = () => setName(username ? username : '')
    const onChange = e => setName(e.target.value)
    const onSubmit = async e => {
        console.log(e)
        e.preventDefault()
        try {
            const value = await validation.checkUsername(name)
            const uid = await validation.checkId(id)
            const reqBody = { value, id: uid }
            const { data } = await axios.post('/api/user/update/username', reqBody)
            dispatch(actions.updateUser(data))
        } catch (error) {
            // i got lazy
            const { response } = error
            const msg = response?.data?.error ? response?.data?.error : error.message 
            console.log(msg)
            alert(msg)
            onCancel()
        }
    } 
    return (
        <CustomEditable 
            label='Username'
            type='text'
            value={name}
            onChange={onChange}
            onCancel={onCancel}
            onSubmit={onSubmit}
        />
    )
    
}

export default UsernameEditable;