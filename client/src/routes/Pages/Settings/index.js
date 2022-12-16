import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { VStack, Heading, Text } from "@chakra-ui/react";
import CustomEditable from "./CustomEditable";
import actions from '../../../redux/actions/auth'


const Settings = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(({ auth }) => auth )
    const accountType = user?.username ? 'REGULAR' : 'GOOGLE' 
    const { accountInfo } = user
    console.log(user)
    console.log(accountType)
    
    const [ bankName, setBankName ] = useState(accountInfo?.bankName ? accountInfo.bankName : '')
    const [ creditName, setCreditName ] = useState(accountInfo?.creditName ? accountInfo.creditName : '')

    console.log('bank', bankName)
    console.log('credit', creditName)

    const onCancelBankName = () => setBankName(accountInfo?.bankName ? accountInfo.bankName : '')
    const onCancelCreditName = () => setCreditName(accountInfo?.creditName ? accountInfo.creditName : '')

    const onChangeBankName = e => setBankName(e) 
    
    const onChangeCreditName = e => setCreditName(e)

    const onUpdateBankName = () => {
        // make axios call to route to update bank name for account
        // then dispatch to update user in redux with new one from firestore
    }

    const onUpdateCreditName = () => {
        // make axios call to route to update credit name for account
        // then dispatch to update user in redux with new one from firestore
    }

    return (
        <VStack>
            <Heading as='h1' size='2xl' color='gray.600'>
                Account Info
            </Heading>
            <VStack>
                <CustomEditable label={'Bank Name'} value={bankName} onSubmit={onUpdateBankName} onCancel={onCancelBankName} onChange={onChangeBankName} />
            </VStack>                       
         </VStack>
    )
}

export default Settings;