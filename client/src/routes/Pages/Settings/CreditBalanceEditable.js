import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from '../../../redux/actions/auth';
import axios from "axios";
import CustomEditable from "./CustomEditable";
import validation from "../../../constants/validation";


const CreditBalanceEditable = () => {
    const dispatch = useDispatch();
    const { accountInfo, id } = useSelector(({ auth }) => auth.user )
    const { creditBalance } = accountInfo

    const [ balance, setBalance ] = useState(creditBalance ? creditBalance : 0)

    const onCancel = () => setBalance(creditBalance ? creditBalance : 0)
    const onChange = e => setBalance(e.target.value)
    const onSubmit = async e => {
        e.preventDefault()
        try {
            const value = await validation.checkCreditBalance(balance)
            const uid = await validation.checkId(id)
            const reqBody = { value, id: uid }
            const { data } = await axios.post('/api/user/update/creditBalance', reqBody)
            dispatch(actions.updateUser(data))
        } catch (error) {
            // i got lazy
            alert(error)
        }
    } 
    return (
        <CustomEditable 
            label='Credit Balance'
            type='number'
            value={balance}
            onChange={onChange}
            onCancel={onCancel}
            onSubmit={onSubmit}
        />
    )
    
}

export default CreditBalanceEditable;