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
    Alert, 
    AlertIcon, 
    HStack,
    Text 
} from '@chakra-ui/react'
import { Link as RouterLinks } from 'react-router-dom'
import axios from 'axios'
// import { useDispatch } from 'react-redux'

const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [registerSuccessful, setRegisterSuccessful] = useState('')
    const [error, setError] = useState('')
    // const dispatch = useDispatch()
    
    const handleFirstName = (e) => setFirstName(e.target.value)
    const handleLastName = (e) => setLastName(e.target.value)
    const handleEmail = (e) => setEmail(e.target.value)
    const handleUsername = (e) => setUsername(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handleConfirmPassword = (e) => setConfirmPassword(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const reqBody = {
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password,
                confirmPassword: confirmPassword,
                email: email
            }
            const { data } = await axios.post('/signup', reqBody)
            setRegisterSuccessful(true)
        } catch (e) {
            setError(e.response.data.error)
            setRegisterSuccessful(false)
        }
    }
    return (
        <Container>
            <Heading as='h1'>Register</Heading>
            {registerSuccessful && (
                <Alert status='success'>
                    <AlertIcon/>
                    Successfully registered!
                </Alert>
            )}
            {!registerSuccessful && registerSuccessful !== '' && (
                <Alert status='error'>
                <AlertIcon/>
                    <Text>{error}</Text>
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <Stack>
                        <HStack>
                            <Stack>
                                <FormLabel>First Name</FormLabel>
                                <Input type='text' id='firstname' value={firstName} onChange={handleFirstName} placeholder='First Name'/>
                            </Stack>
                            <Stack>
                                <FormLabel>Last Name</FormLabel>
                                <Input type='text' id='lastname' value={lastName} onChange={handleLastName} placeholder='Last Name'/>
                            </Stack>
                        </HStack>
                        <FormLabel>Email</FormLabel>
                        <Input type='text' id='email' value={email} onChange={handleEmail} placeholder='Email'/>
                        <FormLabel>Username</FormLabel>
                        <Input type='text' id='username' value={username} onChange={handleUsername} placeholder='Username'/>
                        <HStack>
                            <Stack>
                                <FormLabel mb='0'>Password</FormLabel>
                                <Input type='password' id='password' value={password} onChange={handlePassword} placeholder='Password'/>
                            </Stack>
                            <Stack>
                                <FormLabel mb='0'>Confirm Password</FormLabel>
                                <Input type='password' id='confirmpassword' value={confirmPassword} onChange={handleConfirmPassword} placeholder='Confirm Password'/>
                            </Stack>
                        </HStack>
                        <HStack>
                            <Button type='submit'>Sign Up</Button>
                            <Link as={RouterLinks} to='/login'>
                                Log In!
                            </Link>
                        </HStack>
                    </Stack>
                </FormControl>
            </form>
        </Container>
    )
}

export default Register