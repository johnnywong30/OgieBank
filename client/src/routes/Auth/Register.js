import React, { useState } from 'react'
import { Link, Heading, Box, FormControl, FormLabel, Input, Button, Stack, HStack } from '@chakra-ui/react'
import { Link as RouterLinks } from 'react-router-dom'
// import { useDispatch } from 'react-redux'

const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    // const dispatch = useDispatch()
    
    const handleFirstName = (e) => setFirstName(e.target.value)
    const handleLastName = (e) => setLastName(e.target.value)
    const handleEmail = (e) => setEmail(e.target.value)
    const handleUsername = (e) => setUsername(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handleConfirmPassword = (e) => setConfirmPassword(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        // insert submit stuff here with firebase auth
        console.log("register")
    }
    return (
        <Box>
            <Heading as='h1'>Register</Heading>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <Stack>
                        <HStack>
                            <Stack>
                                <FormLabel>First Name</FormLabel>
                                <Input type='text' value={firstName} onChange={handleFirstName} placeholder='First Name'/>
                            </Stack>
                            <Stack>
                                <FormLabel>Last Name</FormLabel>
                                <Input type='text' value={lastName} onChange={handleLastName} placeholder='Last Name'/>
                            </Stack>
                        </HStack>
                        <FormLabel>Email</FormLabel>
                        <Input type='text' value={email} onChange={handleEmail} placeholder='Email'/>
                        <FormLabel>Username</FormLabel>
                        <Input type='text' value={username} onChange={handleUsername} placeholder='Username'/>
                        <HStack>
                            <Stack>
                                <FormLabel mb='0'>Password</FormLabel>
                                <Input type='text' value={password} onChange={handlePassword} placeholder='Password'/>
                            </Stack>
                            <Stack>
                                <FormLabel mb='0'>Confirm Password</FormLabel>
                                <Input type='text' value={confirmPassword} onChange={handleConfirmPassword} placeholder='Confirm Password'/>
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
        </Box>
    )
}

export default Register