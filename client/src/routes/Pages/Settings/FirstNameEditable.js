import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from '../../../redux/actions/auth';
import axios from "axios";
import CustomEditable from "./CustomEditable";
import validation from "../../../constants/validation";


const FirstNameEditable = () => {
    const dispatch = useDispatch();
    const { firstName, id } = useSelector(({ auth }) => auth.user )

    const [ name, setName ] = useState(firstName ? firstName : '')

    const onCancel = () => setName(firstName ? firstName : '')
    const onChange = e => setName(e.target.value)
    const onSubmit = async e => {
        console.log(e)
        e.preventDefault()
        try {
            const value = await validation.checkName(name.trim(), 'First Name')
            const uid = await validation.checkId(id)
            const reqBody = { value, id: uid }
            const { data } = await axios.post('/api/user/update/firstName', reqBody)
            dispatch(actions.updateUser(data))
        } catch (error) {
            // i got lazy
            alert(error)
        }
    } 
    return (
        <CustomEditable 
            label='First Name'
            type='text'
            value={name}
            onChange={onChange}
            onCancel={onCancel}
            onSubmit={onSubmit}
        />
    )
    
}

export default FirstNameEditable;