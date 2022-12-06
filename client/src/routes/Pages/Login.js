import React, { useState } from 'react'
import { 
    Link, 
    Heading, 
    Box, 
    Container,
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
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../redux/actions/auth'
import Nav from '../../components/Nav'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginSuccessful, setLoginSuccessful] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch() 
    
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
            setLoading(true)
            const { data } = await axios.post('/login', reqBody)
            dispatch(actions.loginAuthUser(data))
            setLoginSuccessful(true)
            setLoading(false)
        } catch (e) {
            console.log(e)
            setError(e.response.data.error)
            setLoginSuccessful(false)
        }
    }
    //ADD REDUX STUFF
    const socialSignOn = async (provider) => {
        try {
            const userData = await FirebaseFunctions.doSocialSignIn(provider);
            const reqBody = {
                displayName: userData.displayName,
                email: userData.email,
                uid: userData.uid
            }
            const { data } = await axios.post('/loginauth', reqBody)
            console.log(data)
            dispatch(actions.loginAuthUser(data))
            setLoginSuccessful(true)
        } catch (e) {
            console.log(e)
            setError(`Unable to sign in using ${provider}`)
            setLoginSuccessful(false)
        }
      };

    return (
        <Container>
            <Nav/>
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
                            <Button type='submit' isLoading={loading}>Sign In</Button>
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
        </Container>
    )
}

export default Login