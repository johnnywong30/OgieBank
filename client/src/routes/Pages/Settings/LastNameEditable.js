import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from '../../../redux/actions/auth';
import axios from "axios";
import CustomEditable from "./CustomEditable";
import validation from "../../../constants/validation";


const LastNameEditable = () => {
    const dispatch = useDispatch();
    const { lastName, id } = useSelector(({ auth }) => auth.user )

    const [ name, setName ] = useState(lastName ? lastName : '')

    const onCancel = () => setName(lastName ? lastName : '')
    const onChange = e => setName(e.target.value)
    const onSubmit = async e => {
        console.log(e)
        e.preventDefault()
        try {
            const value = await validation.checkName(name.trim(), 'Last Name')
            const uid = await validation.checkId(id)
            const reqBody = { value, id: uid }
            const { data } = await axios.post('/api/user/update/lastName', reqBody)
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
            label='Last Name'
            type='text'
            value={name}
            onChange={onChange}
            onCancel={onCancel}
            onSubmit={onSubmit}
        />
    )
    
}

export default LastNameEditable;