import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from '../../../redux/actions/auth';
import axios from "axios";
import CustomEditable from "./CustomEditable";
import validation from "../../../constants/validation";


const BankNameEditable = () => {
    const dispatch = useDispatch();
    const { accountInfo, id } = useSelector(({ auth }) => auth.user )
    const { bankName } = accountInfo

    const [ bank, setBank ] = useState(bankName ? bankName : '')

    const onCancel = () => setBank(bankName ? bankName : '')
    const onChange = e => setBank(e.target.value)
    const onSubmit = async e => {
        console.log(e)
        e.preventDefault()
        try {
            const value = await validation.checkName(bank.trim(), 'Bank Name')
            const uid = await validation.checkId(id)
            const reqBody = { value, id: uid }
            const { data } = await axios.post('/api/user/update/bank', reqBody)
            dispatch(actions.updateUser(data))
        } catch (error) {
            // i got lazy
            const { response } = error
            console.log(error)
            const msg = response?.data?.error ? response?.data?.error : error 
            console.log(msg)
            alert(msg)
            onCancel()
        }
    } 
    return (
        <CustomEditable 
            label='Bank Name'
            type='text'
            value={bank}
            onChange={onChange}
            onCancel={onCancel}
            onSubmit={onSubmit}
        />
    )
    
}

export default BankNameEditable;