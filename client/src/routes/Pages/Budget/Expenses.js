import React from "react";
import { 
    Box,
    Text,
    Stack,
    SimpleGrid,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    HStack,
    FormErrorMessage,
    List,
    ListItem, 
    Divider,
    Flex,
} from '@chakra-ui/react'
import { Formik, Field } from "formik";
import {v4 as uuid} from 'uuid';
import { useDispatch, useSelector} from 'react-redux';
import actions from '../../../redux/actions/categories'
import { MinusIcon } from '@chakra-ui/icons';

const Expenses = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();

    const sendValues = async (values) => {
        values.id = uuid();
        values.isExpense = true;
        const reqBody = values;
        console.log(reqBody);
        dispatch(actions.addCategory(reqBody));
        //update firestore
        onClose();
    }

    const deleteExpense = (id, isExpense) => {
        dispatch(actions.deleteCategory(id, isExpense));
    }

    const expenses = useSelector((state) => state.categories.categories.expenses);

    return (
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
                    <Stack
                        textAlign={'center'}
                        px={6}
                        py={2}
                        color={'black'}
                        align={'center'}>
                        <Stack direction={'row'} align={'center'} justify={'center'}>
                            <Text fontSize={'3xl'} fontWeight={800}>
                                Expenses
                            </Text>
                        </Stack>
                    </Stack>
                </SimpleGrid>
                <Box bg={'white'} px={6} py={10}>
                    <List spacing={3}>
                    {expenses.map((e) => {
                        return (
                            <ListItem key={e.id}>
                                <Flex my="1" justifyContent="space-between" alignContent="center">
                                    <Box
                                        fontSize="xl"
                                        fontWeight="bold">
                                        <Button
                                            width={'25%'}
                                            ml={0}
                                            mr={3}
                                            onClick={() => deleteExpense(e.id, e.isExpense)}
                                        >
                                            <MinusIcon />
                                        </Button>
                                        {e.name}
                                    </Box>
                                    <Box
                                        fontSize="xl"
                                        fontWeight="bold"
                                        >
                                        ${e.amount}
                                    </Box>
                                </Flex>
                                <Divider/>
                            </ListItem>
                        )
                    })}
                    </List>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Add Expense</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Formik
                                    initialValues={{
                                        name: "",
                                        amount: "",
                                    }}
                                    onSubmit={(values, actions) => {
                                        sendValues(values);
                                        actions.setSubmitting(false);
                                        actions.resetForm({
                                            values: {
                                                name: "",
                                                amount: "",
                                            },
                                        });
                                        onClose();
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
                                                    as={Input}
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    variant="filled"
                                                    validate={(value) => {
                                                        let error;
                                                        if (!value || typeof value != 'string' || value.trim().length < 3) error = "Invalid Name"
                                                        return error;
                                                    }}
                                                />
                                                <FormErrorMessage>{errors.name}</FormErrorMessage>
                                            </FormControl>
                                            <FormControl isInvalid={!!errors.amount}>
                                                <FormLabel my={1} htmlFor="amount">Amount</FormLabel>
                                                <Field
                                                    as={Input}
                                                    id="amount"
                                                    name="amount"
                                                    type="number"
                                                    variant="filled"
                                                    validate={(value) => {
                                                        let error;
                                                        if (!value || value <= 0 || !Number(value)) error = "Invalid Amount"
                                                        return error;
                                                    }}
                                                />
                                                <FormErrorMessage>{errors.amount}</FormErrorMessage>
                                            </FormControl>
                                        </HStack>
                                        <ModalFooter>
                                            <Button bg={'black'} color={'white'} rounded={'xl'} boxShadow={'0 5px 20px 0px black / 43%)'}mx={'auto'} type='submit'>
                                                Add
                                            </Button>
                                        </ModalFooter>
                                    </form>
                                    )}
                                </Formik>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                    <Button
                        onClick={onOpen}
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
                        }}>
                        Add Expense
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Expenses;