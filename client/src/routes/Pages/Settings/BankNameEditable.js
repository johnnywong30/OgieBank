import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import CustomEditable from "./CustomEditable";
import actions from '../../../redux/actions/auth'


const BankNameEditable = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(({ auth }) => auth )
    const accountType = user?.username ? 'REGULAR' : 'GOOGLE' 
    const { accountInfo } = user
    
    const [ bankName, setBankName ] = useState(accountInfo?.bankName ? accountInfo.bankName : '')

    const onCancelBankName = () => setBankName(accountInfo?.bankName ? accountInfo.bankName : '')

    const onChangeBankName = e => setBankName(e) 

    const onUpdateBankName = () => {
        // make axios call to route to update bank name for account
        // then dispatch to update user in redux with new one from firestore
    }

    return (
            <CustomEditable label={'Bank Name'} value={bankName} onSubmit={onUpdateBankName} onCancel={onCancelBankName} onChange={onChangeBankName} />
    )
}

export default BankNameEditable;