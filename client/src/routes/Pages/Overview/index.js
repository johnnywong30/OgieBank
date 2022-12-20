import React, {useState, useEffect} from "react";
import { Heading, 
    Box, 
    Container, 
    Text,
    Button,
    SimpleGrid, 
    FormControl,
    FormLabel,
    Input,
    HStack,
    FormErrorMessage,
    Select,
    Divider,
    Flex,
    Spacer,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from '@chakra-ui/react'

import Balance from "./Balance";
import Debt from "./Debt";
import { useDispatch, useSelector} from 'react-redux';
import { Formik, Field } from "formik";
import validation from '../../../constants/validation';
import actions from '../../../redux/actions/transactions';
import actions2 from '../../../redux/actions/categories';
import actions3 from '../../../redux/actions/auth';
import axios from 'axios';
import {v4 as uuid} from 'uuid';
import { QuestionOutlineIcon } from '@chakra-ui/icons';

const Overview = () => {
    const [startDate, setStartDate] = useState(new Date());
    const startDateFormat = (((startDate.getMonth() > 8) ? (startDate.getMonth() + 1) : ('0' + (startDate.getMonth() + 1))) + '/' + ((startDate.getDate() > 9) ? startDate.getDate() : ('0' + startDate.getDate())) + '/' + startDate.getFullYear());
    const userData = useSelector((state) => state.auth.user);
    const userName = userData.displayName === undefined ? userData.username : userData.displayName;
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const [category, setCategory] = useState("Deposit");
    const [payment, setPayment] = useState("Bank");
    
    const handleChange = (event) => {
        setCategory(event.target.value);
    }

    const handleChange2 = (event) => {
        setPayment(event.target.value)
    }

    const sendValues = async (values) => {
        values.id = uuid();
        values.category = category;
        values.payment = payment;
        const reqBody = values;
        await axios.post('/api/calculations/addtransaction', reqBody);
        dispatch(actions.addTransaction(values));
        dispatch(actions3.addTransactionUser(values));
        setCategory('Deposit');
        setPayment("Bank");
        const { data } = await axios.get('/api/user/session');
        dispatch(actions3.updateUser(data));
    }

    const expenses = useSelector((state) => state.categories.categories.expenses);
    const spending = useSelector((state) => state.categories.categories.spending);

    const getData = async () => {

        const getTransactions = async () => {
            const { data } = await axios.get('/api/calculations/getAllTransactions')
            return data
        }
        const getCategories = async () => {
            const { data } = await axios.get('/api/calculations/getAllCategories');
            return data

        }

        const { categories }  = await getCategories();
        dispatch(actions2.setCategories(categories));

        const { transactions } = await getTransactions(); 
        dispatch(actions.setTransactions(transactions));
    }

    useEffect(() => {
        getData();
    },[userData])

    return (
        <Container maxW={'7xl'} px="12" py="6">
            <Modal
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Adding A Transaction</ModalHeader>
                <ModalCloseButton />
                <ModalBody mb="4">
                    Adding a transaction is easy! Simply label your transaction with the 'name' field. Next in 'amount' field, input the amount transacted.
                </ModalBody>
                <ModalBody mb="4">
                    By entering a date, the transaction will either apply to your current month's budget or just update your balances.
                </ModalBody>
                <ModalBody mb="4">
                    You can either 'Deposit' a transaction (adding it to your bank balance or accruing your credit balance), or you can select your budgeted categories. 
                </ModalBody>
                <ModalBody mb="4">
                    Selecting one of your monthly recurring expenses will not effect your budget and will just update your account balances. Selecting a spending category will effect your budget and update your account balances.
                </ModalBody>
                <ModalBody mb="4">
                    Lastly, select the payment method.
                </ModalBody>
                </ModalContent>
            </Modal>
            <Heading as="h1">Hello {userName}!</Heading>
            <SimpleGrid columns={[1]} my="3">
                <Balance/>
            </SimpleGrid>
            <SimpleGrid columns={[1, null, 2]} spacingX="6" spacingY="3">
                <Box
                    marginTop={{ base: '1', sm: '5' }}
                    display="flex"
                    flexDirection={{ base: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    height='auto'>
                    <Box
                        w={'full'}
                        bg={'white'}
                        boxShadow={'2xl'}
                        rounded={'md'}
                        overflow={'hidden'}>
                        <SimpleGrid columns={[1]} spacingX="0" spacingY="0">
                            <Flex minWidth='max-content' alignItems='center' gap='2'>
                                <Text px='6' py='2' fontSize={'3xl'} fontWeight={800}>
                                        Add Transaction
                                </Text>
                                <Spacer />
                                <label htmlFor={'transactionHelp'}></label>
                                <Button
                                    id={'transactionHelp'}
                                    width={'10%'}
                                    ml={0}
                                    mr={3}
                                    onClick={onOpen}
                                >
                                    <QuestionOutlineIcon />
                                </Button>
                            </Flex>
                        </SimpleGrid>
                        <Divider/>
                        <Box bg={'white'} px={6} py={10}>
                            <Formik
                                initialValues={{
                                    name: "",
                                    amount: "",
                                    date: "",
                                }}
                                onSubmit={(values, actions) => {
                                    sendValues(values);
                                    actions.setSubmitting(false);
                                    actions.resetForm({
                                        values: {
                                            name: "",
                                            amount: "",
                                            date: "",
                                        },
                                    });
                                }}
                                validateOnChange={false}
                                validateOnBlur={false}
                            >
                                {({  handleSubmit, errors }) => (
                                    <form onSubmit={handleSubmit}>
                                        <HStack>
                                        <FormControl isInvalid={!!errors.name}>
                                            <FormLabel my={1} htmlFor="name">Name</FormLabel>
                                                <Field
                                                    key={'name'}
                                                    as={Input}
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    variant="filled"
                                                    validate={(value) => {
                                                        let error;
                                                        if (!value || typeof value != 'string' || value.trim().length < 3 || value.trim().length > 50) error = "Invalid Name"
                                                        return error;
                                                    }}
                                                />
                                                <FormErrorMessage>{errors.name}</FormErrorMessage>
                                            </FormControl>
                                            <FormControl isInvalid={!!errors.amount}>
                                                <FormLabel my={1} htmlFor="amount">Amount</FormLabel>
                                                <Field
                                                    as={Input}
                                                    key={'amount'}
                                                    id="amount"
                                                    name="amount"
                                                    type="number"
                                                    variant="filled"
                                                    validate={(value) => {
                                                        let error;
                                                        const stringifiedValue = value.toString()
                                                        const strAfterDecimal = stringifiedValue.split('.', 2)[1]
                                                        if (!value || typeof value != 'string' || value.trim().length < 3 || value.trim().length > 50) error = "Invalid Name"
                                                        if (strAfterDecimal && strAfterDecimal.length > 2) error = 'Amount cannot have more than 2 decimals'
                                                        return error;
                                                    }}
                                                />
                                                <FormErrorMessage>{errors.amount}</FormErrorMessage>
                                            </FormControl>
                                        </HStack>
                                        <FormControl isInvalid={!!errors.date}>
                                            <FormLabel my={1} htmlFor="date">Date</FormLabel>
                                            <Field
                                                as={Input}
                                                id="date"
                                                key={'date'}
                                                name="date"
                                                type="text"
                                                variant="filled"
                                                placeholder={startDateFormat}
                                                validate={(value) => {
                                                    let error;
                                                    let splitSearchTerm = value.split("/");
                                                    let year = splitSearchTerm[2];
                                                    if (!value || typeof value != 'string' || value.trim().length === 0 || Number(year) < 2000){
                                                        error = "Invalid Date (format: mm/dd/yyyy)";
                                                        return error;
                                                    }
                                                    try {
                                                        validation.checkValidDate(value);
                                                    } catch {
                                                        error = "Invalid Date (format: mm/dd/yyyy)";
                                                    }
                                                    return error;
                                                }}
                                            />
                                            <FormErrorMessage>{errors.date}</FormErrorMessage>
                                        </FormControl>
                                        <FormLabel my={1} htmlFor="category">Category</FormLabel>
                                        <Select
                                            value={category}
                                            onChange={handleChange}
                                        >
                                            <option value={'Deposit'}>Deposit</option>
                                            {spending.map((s) => {
                                                return(<option key={s.name} value={s.name}>{s.name}</option>);
                                            })}
                                            {expenses.map((e) => {
                                                return(<option  key={e.name} value={e.name}>{e.name}</option>);
                                            })}
                                        </Select>
                                        <FormLabel my={1} htmlFor="payment">Payment</FormLabel>
                                        <Select
                                            value={payment}
                                            onChange={handleChange2}
                                        >
                                            <option key={'bank'} value="Bank">{userData.accountInfo.bankName ? userData.accountInfo.bankName : "Bank"}</option>
                                            <option key={'credit'} value="Credit">{userData.accountInfo.creditName ? userData.accountInfo.creditName : "Credit"}</option>
                                        </Select>
                                        <Button
                                            mt={10}
                                            mx="25%"
                                            w={'50%'}
                                            bg={'black'}
                                            color={'white'}
                                            rounded={'xl'}
                                            boxShadow={'0 5px 20px 0px black / 43%)'}
                                            _hover={{
                                            bg: 'black',
                                            }}
                                            _focus={{
                                            bg: 'black',
                                            }}
                                            type='submit'
                                            >
                                            Add Transaction
                                        </Button>
                                    </form>
                                )}
                            </Formik>
                        </Box>
                    </Box>
                </Box>
                <Debt/>
            </SimpleGrid>
        </Container>
    )
}

export default Overview;