import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { VStack, Heading, Text } from "@chakra-ui/react";
import CustomEditable from "./CustomEditable";
import actions from '../../../redux/actions/auth'


const Settings = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(({ auth }) => auth )
    const { accountInfo } = user
    console.log(user)
    
    const [ bankName, setBankName ] = useState(accountInfo.bankName)
    const [ creditName, setCreditName ] = useState(accountInfo.creditName)

    console.log('bank', bankName)
    console.log('credit', creditName)

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
                
            </VStack>                       
         </VStack>
    )
}

export default Settings;