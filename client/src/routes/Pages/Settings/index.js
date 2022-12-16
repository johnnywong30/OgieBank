import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { VStack, Heading, Text } from "@chakra-ui/react";
import CustomEditable from "./CustomEditable";
import actions from '../../../redux/actions/auth'
import BankNameEditable from "./BankNameEditable";


const Settings = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(({ auth }) => auth )

    return (
        <VStack>
            <Heading as='h1' size='2xl' color='gray.600'>
                Account Info
            </Heading>
            <VStack>
                <BankNameEditable />
            </VStack>                       
         </VStack>
    )
}

export default Settings;