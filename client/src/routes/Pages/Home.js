import React from "react";
import { Heading, Box } from '@chakra-ui/react'
import Nav from '../../components/Nav'

const Home = () => {
    return (
        <Box>
            <Nav/>
            <Heading as='h1'>
                welcome
            </Heading>
        </Box>
    )
}

export default Home