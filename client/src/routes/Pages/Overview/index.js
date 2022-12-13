import React, {useState} from "react";
import { Heading, 
    Box, 
    Container, 
    Text,
    Stack,
    List,
    ListItem,
    ListIcon,
    Button,
    useColorModeValue, 
    SimpleGrid, 
    Center,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement, 
    Link, 
    Select } from '@chakra-ui/react'
import DatePicker from "react-datepicker";
import Balance from "./Balance";
import Debt from "./Debt";
import "react-datepicker/dist/react-datepicker.css";

const Overview = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <Container maxW={'7xl'} px="12" py="6">
            <Heading as="h1">Hello! UserName</Heading>
            <SimpleGrid columns={[1]} my="3">
                <Balance/>
            </SimpleGrid>
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
                                        Add a Transaction
                                    </Text>
                                </Stack>
                            </Stack>
                        </SimpleGrid>
                        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                            <Center>
                                <Stack spacing={4}>
                                    <HStack>
                                    <Box>
                                        <FormControl id="firstName" isRequired>
                                        <FormLabel>Tag</FormLabel>
                                        <Input type="text" />
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl id="lastName" isRequired>
                                        <FormLabel>Amount</FormLabel>
                                        <Input type="text" />
                                        </FormControl>
                                    </Box>
                                    </HStack>
                                    <FormControl id="email" isRequired>
                                    <FormLabel>Date</FormLabel>
                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                                    </FormControl>
                                    {/* <FormControl id="password" isRequired> */}
                                    <FormLabel>Select Category</FormLabel>
                                    {/* <InputGroup>
                                        <Input type={'text'} />
                                        <InputRightElement h={'full'}>
                                        </InputRightElement>
                                    </InputGroup>
                                    </FormControl> */}
                                    <Select placeholder='Select option'>
                                        <option value='option1'>Option 1</option>
                                        <option value='option2'>Option 2</option>
                                        <option value='option3'>Option 3</option>
                                    </Select>
                                    <FormLabel>Select Payment Method</FormLabel>
                                    {/* <Stack spacing={10} pt={2}>
                                    <Button
                                        loadingText="Submitting"
                                        size="lg"
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                        bg: 'blue.500',
                                        }}>
                                        Sign up
                                    </Button>
                                    </Stack> */}
                                    <Select placeholder='Select option'>
                                        <option value='option1'>Option 1</option>
                                        <option value='option2'>Option 2</option>
                                        <option value='option3'>Option 3</option>
                                    </Select>
                                </Stack>
                            </Center>
                            <Button
                                mt={10}
                                mx="25%"
                                w={'50%'}
                                bg={'green.400'}
                                color={'white'}
                                rounded={'xl'}
                                boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                                _hover={{
                                bg: 'green.500',
                                }}
                                _focus={{
                                bg: 'green.500',
                                }}>
                                Add Transaction
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Debt/>
            </SimpleGrid>
        </Container>
    )
}

export default Overview;