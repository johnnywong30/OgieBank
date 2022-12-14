import React, {useState} from "react";
import { Heading, 
    Box, 
    Container, 
    Text,
    Stack,
    Button,
    useColorModeValue, 
    SimpleGrid, 
    FormControl,
    FormLabel,
    Input,
    HStack,
    FormErrorMessage,
    Select,
} from '@chakra-ui/react'

import {useSelector} from 'react-redux';
import { Formik, Field } from "formik";
import validation from '../../../constants/validation';

const Budget = () => {

    return (
        <Container maxW={'7xl'} px="12" py="6">
            <Heading as="h1">Budget</Heading>
            {/* <SimpleGrid columns={[1]} my="3">
                Test
            </SimpleGrid> */}
            <SimpleGrid columns={[1, null, 2]} spacingX="6" spacingY="3">
                <Box
                    marginTop={{ base: '1', sm: '5' }}
                    display="flex"
                    flexDirection={{ base: 'column', sm: 'row' }}
                    justifyContent="space-between">
                    <Box
                        w={'full'}
                        bg={useColorModeValue('white', 'gray.800')}
                        boxShadow={'2xl'}
                        rounded={'md'}
                        overflow={'hidden'}>
                        <SimpleGrid columns={[1]} spacingX="0" spacingY="0">
                            <Stack
                                textAlign={'center'}
                                px={6}
                                py={2}
                                color={useColorModeValue('gray.800', 'white')}
                                align={'center'}>
                                <Stack direction={'row'} align={'center'} justify={'center'}>
                                    <Text fontSize={'3xl'} fontWeight={800}>
                                        Add Transaction
                                    </Text>
                                </Stack>
                            </Stack>
                        </SimpleGrid>
                        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                            Test
                        </Box>
                    </Box>
                </Box>
            </SimpleGrid>
        </Container>
    )
}

export default Budget;