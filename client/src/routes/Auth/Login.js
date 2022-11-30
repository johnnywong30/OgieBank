import React, { useState } from 'react'
import { Link, Heading, Box, FormControl, FormLabel, Input, Button, Stack, HStack } from '@chakra-ui/react'
import { Link as RouterLinks } from 'react-router-dom'
import SocialSignIn from './SocialSignIn'
// import { useDispatch } from 'react-redux'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // const dispatch = useDispatch()
    
    const handleUsername = (e) => setUsername(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        // insert submit stuff here with firebase auth
        console.log("login")
    }
    return (
        <Box>
            <Heading as='h1'>Log In</Heading>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <Stack>
                        <FormLabel>Username</FormLabel>
                        <Input type='text' value={username} onChange={handleUsername} placeholder='Enter Username'/>
                        <FormLabel>Password</FormLabel>
                        <Input type='password' value={password} onChange={handlePassword} placeholder='Enter Password'/>
                        <HStack>
                            <Button type='submit'>Sign In</Button>
                            <Link as={RouterLinks} to='/register'>
                                Register
                            </Link>
                        </HStack>
                    </Stack>
                </FormControl>
            </form>
            <br>
                <SocialSignIn/>
            </br>
        </Box>
    )
}

export default Login