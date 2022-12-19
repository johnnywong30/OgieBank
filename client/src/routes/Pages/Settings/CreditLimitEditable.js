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
    const onChange = e => setLimit(e.target.value)
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
            console.log(error)
            alert(error)
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