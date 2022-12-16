import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import CustomEditable from "./CustomEditable";
import axios from 'axios'
import actions from '../../../redux/actions/auth'


const BankNameEditable = () => {

    const dispatch = useDispatch()

    const { user } = useSelector(({ auth }) => auth )
    console.log(user)

    const accountType = user?.username ? 'REGULAR' : 'GOOGLE' 
    const accountBankName = useSelector(({ auth }) => auth?.user?.accountInfo?.bankName )
    const { accountInfo, id } = user
    console.log('account', accountInfo)
    
    const [ bankName, setBankName ] = useState(accountBankName ? accountBankName : '')

    const onCancelBankName = () => setBankName(accountBankName ? accountBankName : '')

    const onChangeBankName = e => setBankName(e.target.value) 

    const onUpdateBankName = async (event) => {
        // make axios call to route to update bank name for account
        event.preventDefault()
        console.log('HELLO PLEASE')
        console.log('trying to update')
        console.log('user', user)
        console.log(id)
        const reqBody = { value: bankName.trim(), id: id }
        console.log(reqBody)
        const { data } = await axios.post('/api/user/update/bank', reqBody)
        console.log(data)
        // then dispatch to update user in redux with new one from firestore
        dispatch(actions.updateUser(data))
    }
    console.log(onUpdateBankName())
    return (
            <CustomEditable label={'Bank Name'} value={bankName} onSubmit={onUpdateBankName} onCancel={onCancelBankName} onChange={onChangeBankName} />
    )
}

export default BankNameEditable;