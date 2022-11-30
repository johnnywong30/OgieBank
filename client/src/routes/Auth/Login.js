import React, { useState } from 'react'
import { Link, Heading, Box, FormControl, FormLabel, Input, Button, Stack, HStack } from '@chakra-ui/react'
import { Link as RouterLinks } from 'react-router-dom'
import SocialSignIn from './SocialSignIn'
// import { useDispatch } from 'react-redux'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const dispatch = useDispatch()
    
    const handleEmail = (e) => setEmail(e.target.value)
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
                        <FormLabel>Email</FormLabel>
                        <Input type='text' value={email} onChange={handleEmail} placeholder='Enter Email' id='email'/>
                        <FormLabel>Password</FormLabel>
                        <Input type='password' value={password} onChange={handlePassword} placeholder='Enter Password' id='password'/>
                        <HStack>
                            <Button type='submit'>Sign In</Button>
                            <Link as={RouterLinks} to='/register'>
                                Register
                            </Link>
                        </HStack>
                    </Stack>
                </FormControl>
            </form>
            <SocialSignIn/>
        </Box>
    )
}

export default Login