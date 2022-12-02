import React, { useState } from 'react'
import { 
    Link, 
    Heading, 
    Box, 
    FormControl, 
    FormLabel, 
    Input, 
    Button, 
    Stack, 
    HStack,
    Alert, 
    AlertIcon,
    Text
} from '@chakra-ui/react'
import {
    FcGoogle
} from 'react-icons/fc'
import FirebaseFunctions from '../../firebase/FirebaseFunctions'
import { Link as RouterLinks } from 'react-router-dom'
import axios from 'axios'
// import { useDispatch } from 'react-redux'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginSuccessful, setLoginSuccessful] = useState('')
    const [error, setError] = useState('')
    // const dispatch = useDispatch() NEED TO ADD REDUX STUFF
    
    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    // ADD REDUX STUFF
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const reqBody = {
                email: email,
                password: password
            }
            const { data } = await axios.post('/login', reqBody)
            setLoginSuccessful(true)
        } catch (e) {
            setError(e.response.data.error)
            setLoginSuccessful(false)
        }
    }
    //ADD REDUX STUFF
    const socialSignOn = async (provider) => {
        try {
          await FirebaseFunctions.doSocialSignIn(provider);
        } catch (error) {
          setError(`Unable to sign in using ${provider}`)
          setLoginSuccessful(false)
        }
      };

    return (
        <Box>
            <Heading as='h1'>Log In</Heading>
            {loginSuccessful && (
                <Alert status='success'>
                    <AlertIcon/>
                    Successfully logged in!
                </Alert>
            )}
            {!loginSuccessful && loginSuccessful !== '' && (
                <Alert status='error'>
                <AlertIcon/>
                    <Text>{error}</Text>
                </Alert>
            )}
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
            <Button
                onClick={() => socialSignOn('google')}
                leftIcon={<FcGoogle/>}
            >
                Google Sign In
            </Button>
        </Box>
    )
}

export default Login