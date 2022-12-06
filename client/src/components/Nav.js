import React from 'react'
import { Box, Link } from '@chakra-ui/react'
import { Link as RouterLinks  } from 'react-router-dom'

const Nav = () => {
    return (
        <Box>
            <Link as={RouterLinks} to='/'>Home</Link>
            <Link as={RouterLinks} to='/login'>Login</Link>
            <Link as={RouterLinks} to='/login'>Register</Link>
            <Link as={RouterLinks} to='/protected'>Protected</Link>
        </Box>
    )
}

export default Nav