import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from '../../../redux/actions/auth';
import axios from "axios";
import CustomEditable from "./CustomEditable";
import validation from "../../../constants/validation";


const CreditNameEditable = () => {
    const dispatch = useDispatch();
    const { accountInfo, id } = useSelector(({ auth }) => auth.user )
    const { creditName } = accountInfo

    const [ credit, setCredit ] = useState(creditName ? creditName : '')

    const onCancel = () => setCredit(creditName ? creditName : '')
    const onChange = e => setCredit(e.target.value)
    const onSubmit = async e => {
        console.log(e)
        e.preventDefault()
        try {
            const value = await validation.checkName(credit.trim(), 'Credit Name')
            const uid = await validation.checkId(id)
            const reqBody = { value, id: uid }
            const { data } = await axios.post('/api/user/update/credit', reqBody)
            dispatch(actions.updateUser(data))
        } catch (error) {
            // i got lazy
            console.log(error)
            alert(error)
            onCancel()
        }
    } 
    return (
        <CustomEditable 
            label='Credit Name'
            type='text'
            value={credit}
            onChange={onChange}
            onCancel={onCancel}
            onSubmit={onSubmit}
        />
    )
    
}

export default CreditNameEditable;