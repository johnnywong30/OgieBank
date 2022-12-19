import React, { useState, useEffect } from 'react'
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
import FirebaseFunctions from '../../../firebase/FirebaseFunctions'
import { Link as RouterLinks, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../../redux/actions/auth'
import validation from '../../../constants/validation'

const Login = () => {
    const isAuth = useSelector(({ auth }) => auth.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth) {
            // TODO: change to '/' when home page is developed...
            navigate('/overview')
        }
    }, [isAuth, navigate])


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginSuccessful, setLoginSuccessful] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false);
    
    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    // ADD REDUX STUFF
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await validation.checkEmail(email)
            const reqBody = {
                email: email,
                password: password
            }
            const { data } = await axios.post('/api/user/login', reqBody)
            dispatch(actions.loginAuthUser(data))
            setLoginSuccessful(true)
            setLoading(false)
        } catch (e) {
            console.log(e)
            if (e.response)
                setError(e.response.data.error)
            else
                setError(e)
            setLoginSuccessful(false)
            setLoading(false)
        }
    }
    //ADD REDUX STUFF
    const socialSignOn = async (provider) => {
        try {
            setGoogleLoading(true);
            const userData = await FirebaseFunctions.doSocialSignIn(provider);
            const reqBody = {
                displayName: userData.displayName,
                email: userData.email,
                uid: userData.uid
            }
            const { data } = await axios.post('/api/user/loginauth', reqBody)
            console.log(data)
            dispatch(actions.loginAuthUser(data))
            setLoginSuccessful(true)
            setGoogleLoading(false);
        } catch (e) {
            console.log(e)
            setError(`Unable to sign in using ${provider}`)
            setLoginSuccessful(false)
            setGoogleLoading(false);
        }
      };

    return (
        <Container>
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
                        <FormLabel id='labelForEmail' htmlFor='email'>Email</FormLabel>
                        <Input type='email' value={email} onChange={handleEmail} placeholder='Enter Email' id='email'/>
                        <FormLabel id='labelForPassword' htmlFor='password'>Password</FormLabel>
                        <Input type='password' value={password} onChange={handlePassword} placeholder='Enter Password' id='password'/>
                        <HStack>
                            <Button type='submit' isLoading={loading}>Sign In</Button>
                            {/* <Link as={RouterLinks} to='/register'>
                                Register
                            </Link> */}
                        </HStack>
                    </Stack>
                </FormControl>
            </form>
            <Button
                onClick={() => socialSignOn('google')}
                leftIcon={<FcGoogle/>}
                isLoading={googleLoading}
            >
                Google Sign In
            </Button>
        </Container>
    )
}

export default Login