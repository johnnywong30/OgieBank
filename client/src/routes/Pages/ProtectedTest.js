import React from 'react'
import { Container, Text, Link } from '@chakra-ui/react'
import { Link as RouterLinks  } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logout from '../../components/Logout'
import Nav from '../../components/Nav'

const ProtectedTest = ({ text }) => {
    const isAuth = useSelector(({auth}) => auth.auth);
    return (
        <Container border='1px' borderColor='gray.200' p='20px'>
            <Nav/>
            <Text>{text}</Text>
            <Text>{isAuth}</Text>
            <Logout/>
            <Link as={RouterLinks} to="/">Go Home</Link>
        </Container>
    )
}

export default ProtectedTest;