import React from 'react'
import { Box, Container, Text, Link, Heading } from '@chakra-ui/react'
import { Link as RouterLinks  } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logout from '../../components/Logout'
import Nav from '../../components/Nav'

const ProtectedTest = ({ text }) => {
    // const isAuth = useSelector(({auth}) => auth.auth);
    return (
        <Box>
            <Heading as='h1'>
                welcome but protected
            </Heading>
        </Box>
    )
}

export default ProtectedTest;