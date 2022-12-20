import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { CSVLink } from 'react-csv';

import actions from '../../../redux/actions/transactions'
import actions3 from '../../../redux/actions/auth';

import { 
    Box,
    Divider,
    Text,
    Stack,
    List,
    ListItem,
    Button,
    useColorModeValue, 
    SimpleGrid, 
    Center,
    Select,
    Flex,
    Spacer,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
} from '@chakra-ui/react'
import { MinusIcon } from '@chakra-ui/icons';
import { QuestionOutlineIcon } from '@chakra-ui/icons';

const Transactions = (props) => {
    const transactions = useSelector((state) => state.transactions.transactions)
    const page = useSelector((state) => state.transactions.currentPage)
    const dispatch = useDispatch();
    const color = useColorModeValue('gray.800', 'white')
    const bg = useColorModeValue('green.50', 'green.900')

    const [currentPage, setCurrentPage] = useState(0)
    const [selectValue, setSelectValue] = useState('recent')
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onSelect = (event) => {
        setSelectValue(event.target.value)
        dispatch(actions.sortTransactions(event.target.value))
    }

    const deleteTransaction = async (id, amount, category, payment) => {
        let reqBody = {
            id: id, 
            amount: amount, 
            category: category, 
            payment: payment
        }

        await axios.post('/api/calculations/deletetransaction', reqBody)
        dispatch(actions.deleteTransaction(id))
        let transaction = {
            amount: amount,
            category: category,
            payment: payment,
        }
        dispatch(actions3.deleteTransactionUser(transaction))
    }

    const onNextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const onPrevpage = () => {
        setCurrentPage(currentPage - 1)
    }

    const getData = async (reqBody) => {
        const { data } = await axios.get('/api/calculations/getAllTransactions')
        dispatch(actions.setTransactions(data.transactions))
        dispatch(actions.sortTransactions(selectValue))
    }

    useEffect(() => {
        getData()
    }, [])

    const buildTransactions = (transactionList) => {
        return (
            <List spacing={3}>
                {transactionList.map((t) => {
                    return (
                        <ListItem key={t.id}>
                            <SimpleGrid columns={[1, null, 3]} spacingX="0" spacingY="0">
                                <Stack
                                    px={6}
                                    py={2}
                                    color={color}>
                                    <Stack direction={'row'}>
                                        <Text fontSize={'3xl'} fontWeight={800}>
                                            {t.name}
                                        </Text>
                                    </Stack>
                                    <Stack direction={'row'}>
                                        <Text
                                            fontSize={'sm'}
                                            fontWeight={500}
                                            bg={bg}
                                            p={2}
                                            px={3}
                                            color={'green.900'}
                                            rounded={'full'}>
                                            {t.category + ' - ' + t.payment}
                                        </Text>
                                    </Stack>
                                </Stack>
                                <Stack
                                    py={2}
                                    color={color}>
                                    <Stack direction={'row'} flexGrow='1'>
                                        <Text fontSize={'3xl'} fontWeight={800}>
                                        </Text>
                                    </Stack>
                                    <Text
                                        fontSize={'sm'}
                                        fontWeight={500}
                                        p={2}
                                        px={3}
                                        rounded={'full'}>
                                        {t.date}
                                    </Text>
                                </Stack>
                                <Stack
                                    px={6}
                                    py={2}
                                    color={color}
                                    alignItems={'flex-end'}
                                    >
                                    <Stack direction={'row'} flexGrow='1'>
                                        <Text fontSize={'xl'} fontWeight={500}>
                                            {'$' + t.amount}
                                        </Text>
                                    </Stack>
                                    <Stack direction={'row'} flexGrow='1' justifyContent={'flex-end'}>
                                        <label htmlFor={t.id}></label>
                                        <Button
                                            id={t.id}
                                            width={'25%'}
                                            onClick={(event) => {
                                                deleteTransaction(t.id, t.amount, t.category, t.payment)
                                            }}
                                        >
                                            <MinusIcon />
                                        </Button>
                                    </Stack>
                                </Stack>
                            </SimpleGrid>
                            <Divider/>
                        </ListItem>
                    )
                })}
            </List>
        )
    }
  return (
    <Box
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between">
        <Modal
            onClose={onClose}
            isOpen={isOpen}
            motionPreset='slideInBottom'
        >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Transaction Guide</ModalHeader>
            <ModalCloseButton />
            <ModalBody mb="4">
                Here you can view all of your transactions!
            </ModalBody>
            <ModalBody mb="4">
                You can also delete a transaction, which will revert any change that transaction did to your balances or budget.
            </ModalBody>
            <ModalBody mb="4">
                You can also sort by 'Most Recent', 'Least Recent', 'Price Low To High', and 'Price High To Low'.
            </ModalBody>
            <ModalBody mb="4">
                Lastly, you can export your transactions, located in the right corner.
            </ModalBody>
            </ModalContent>
        </Modal>
        <Box
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}>
            <SimpleGrid columns={[2, null, 1]} spacingX="0" spacingY="0">
                <Stack
                    textAlign={'center'}
                    px={6}
                    py={2}
                    color={useColorModeValue('gray.800', 'white')}
                    align={'center'}>
                        <Flex minWidth='max-content' alignItems='center' gap='2'>
                            <Text px='6' py='2' fontSize={'3xl'} fontWeight={800}>
                                Monthly Transactions
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
                        <Stack width={'100%'} direction={'row'}>
                        <Select onChange={onSelect} value={selectValue}>
                            <option value='recent'>Most Recent</option>
                            <option value='oldest'>Least Recent</option>
                            <option value='low'>Price Low to High</option>
                            <option value='high'>Price High to Low</option>
                        </Select>
                            <Stack>
                                    <CSVLink filename={'transactions'} data={transactions}>
                                        <Button>Export</Button>
                                    </CSVLink>
                            </Stack>
                        </Stack>
                </Stack>
                <Stack
                    direction={'row'}
                    justifyContent={'center'}
                    textAlign={'center'}
                    px={6}
                    py={2}
                    color={useColorModeValue('gray.800', 'white')}
                    align={'center'}>
                        { currentPage === 0
                        ? ''
                        : <Button 
                            onClick={(event) => {
                                onPrevpage()
                            }}
                            disabled={currentPage === 0}>
                            Prev
                        </Button>
                        }

                        {transactions.slice((currentPage+1)*10, ((currentPage+1)*10) + 10).length === 0
                        ? ''
                        : <Button
                            disabled={transactions.slice((currentPage+1)*10, ((currentPage+1)*10) + 10).length === 0}
                            onClick={(event) => {
                                onNextPage()
                            }}>
                            Next
                        </Button>
                        }
                        
                        
                </Stack>
            </SimpleGrid>
            <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                <Center>
                {buildTransactions(transactions.slice(currentPage*10, (currentPage*10) + 10))}
            </Center>
            </Box>
        </Box>
    </Box>
  )
}

export default Transactions