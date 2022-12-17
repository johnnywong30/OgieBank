import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from '../../../redux/actions/auth';
import axios from "axios";
import CustomEditable from "./CustomEditable";
import validation from "../../../constants/validation";


const EmailEditable = () => {
    const dispatch = useDispatch();
    const { email, id } = useSelector(({ auth }) => auth.user )

    const [ emailAddress, setEmail ] = useState(email ? email : '')

    const onCancel = () => setEmail(email ? email : '')
    const onChange = e => setEmail(e.target.value)
    const onSubmit = async e => {
        console.log(e)
        e.preventDefault()
        try {
            const value = await validation.checkEmail(emailAddress)
            const uid = await validation.checkId(id)
            const reqBody = { value, id: uid }
            const { data } = await axios.post('/api/user/update/email', reqBody)
            dispatch(actions.updateUser(data))
        } catch (error) {
            // i got lazy
            alert(error)
        }
    } 
    return (
        <CustomEditable 
            label='Email'
            type='email'
            value={emailAddress}
            onChange={onChange}
            onCancel={onCancel}
            onSubmit={onSubmit}
        />
    )
    
}

export default EmailEditable;