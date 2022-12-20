import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { VStack, Heading, Text } from "@chakra-ui/react";
import BankNameEditable from "./BankNameEditable";
import BankBalanceEditable from "./BankBalanceEditable";
import CreditNameEditable from "./CreditNameEditable";
import CreditBalanceEditable from "./CreditBalanceEditable";
import CreditLimitEditable from "./CreditLimitEditable";
import FirstNameEditable from "./FirstNameEditable";
import LastNameEditable from "./LastNameEditable";
import EmailEditable from "./EmailEditable";
import UsernameEditable from "./UsernameEditable";


const Settings = () => {
    const { user } = useSelector(({ auth }) => auth )
    
    const ACCOUNT_TYPE = user?.username ? 'OGIE' : 'GOOGLE'

    return (
        <VStack>
            <Heading as='h1' size='2xl' color='gray.600' my={4}>
                Account Info
            </Heading>
            <VStack>
                <Text as='h2' fontSize={'2xl'} my={2} color='gray.600'>My Profile</Text>
                {
                    ACCOUNT_TYPE === 'OGIE'
                    ?
                    (
                        <>
                            <FirstNameEditable />
                            <LastNameEditable />
                            <EmailEditable />
                            <UsernameEditable />
                        </>
                    )
                    :
                    (
                        <>
                            <Text fontSize='lg' color='gray.600'>
                                We cannot let you change your Google Account Info from here.
                                Sorry about that!
                            </Text>
                        </>
                    )
                }
                <Text as='h2' fontSize={'2xl'} my={2} color='gray.600'>My Banking</Text>
                <BankNameEditable />
                <BankBalanceEditable/>
                <CreditNameEditable />
                <CreditBalanceEditable/>
                <CreditLimitEditable />
            </VStack>                       
         </VStack>
    )
}

export default Settings;