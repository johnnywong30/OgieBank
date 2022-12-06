import React from 'react'
import { Container, Text, Link } from '@chakra-ui/react'
import { Link as RouterLinks  } from 'react-router-dom'

const Error = ({ error }) => {
    return (
        <Container border='1px' borderColor='gray.200' p='20px'>
            <Text>{error}</Text>
            <Link as={RouterLinks} to="/">Go Home</Link>
        </Container>
    )
}

export default Error;