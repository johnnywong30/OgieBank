import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from '../../../redux/actions/auth';
import axios from "axios";
import CustomEditable from "./CustomEditable";
import validation from "../../../constants/validation";


const CreditLimitEditable = () => {
    const dispatch = useDispatch();
    const { accountInfo, id } = useSelector(({ auth }) => auth.user )
    const { creditLimit } = accountInfo

    const [ limit, setLimit ] = useState(creditLimit ? creditLimit : 0)

    const onCancel = () => setLimit(creditLimit ? creditLimit : 0)
    const onChange = e => {
        const stringifiedValue = e.target.value.toString()
        const strAfterDecimal = stringifiedValue.split('.', 2)[1]
        if (strAfterDecimal && strAfterDecimal.length > 2) {
            const decimalLocation = stringifiedValue.indexOf('.')
            const value = stringifiedValue.substring(0, decimalLocation + 3)
            setLimit(value)
        } 
        else {
            setLimit(e.target.value)
        }
    }
    const onSubmit = async e => {
        e.preventDefault()
        try {
            const value = await validation.checkCreditLimit(limit)
            const uid = await validation.checkId(id)
            const reqBody = { value, id: uid }
            const { data } = await axios.post('/api/user/update/creditLimit', reqBody)
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
            label='Credit Limit'
            type='number'
            value={limit}
            onChange={onChange}
            onCancel={onCancel}
            onSubmit={onSubmit}
        />
    )
    
}

export default CreditLimitEditable;