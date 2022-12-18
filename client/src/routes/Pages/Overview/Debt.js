import React, {useState, useEffect} from "react";
import { useSelector } from 'react-redux'
import { 
    Box,
    Text,
    Stack,
    useColorModeValue, 
    SimpleGrid, 
} from '@chakra-ui/react'


const Debt = () => {
    const allTransactions = useSelector((state) => state.transactions.transactions)
    // make an array called transactions that is initialized to state
    const [transactions, setTransactions] = useState([])
    const [debt, setDebt] = useState(0)
    const [month1, setMonth1] = useState('January')
    const [month2, setMonth2] = useState('January')
    const [month3, setMonth3] = useState('January')
    const [thisMonth, setThisMonth] = useState([])
    const [prevMonth, setPrevMonth] = useState([])
    const [prevPrevMonth, setPrevPrevMonth] = useState([])

    const now = new Date()

    useEffect(() => {
        // just use allTransactions for now, no need to filter
        setTransactions(allTransactions)
    }, [allTransactions])

    useEffect(() => {
        let total = 0
        thisMonth.forEach(transaction => {
            total += transaction.amount
        })
        setDebt(total)
    }, [thisMonth])

    useEffect(() => {
        const d = new Date()
        const months = ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"]
        setMonth1(months[d.getMonth()])
        setMonth2(months[d.getMonth() - 1])
        setMonth3(months[d.getMonth() - 2])
    }, [])

    // thisMonth should be an array of transactions that are in the current month and year
    useEffect(() => {
        const thisMonth = transactions.filter(transaction => {
            const d = new Date(transaction.date)
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
        })
        setThisMonth(thisMonth)
        const prevMonth = transactions.filter(transaction => {
            const d = new Date(transaction.date)
            return d.getMonth() === now.getMonth() - 1 && d.getFullYear() === now.getFullYear()
        })
        setPrevMonth(prevMonth)
        const prevPrevMonth = transactions.filter(transaction => {
            const d = new Date(transaction.date)
            return d.getMonth() === now.getMonth() - 2 && d.getFullYear() === now.getFullYear()
        })
        setPrevPrevMonth(prevPrevMonth)
    }, [transactions])

    return (
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
                                Debt Status
                            </Text>
                        </Stack>
                    </Stack>
                </SimpleGrid>
                <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                    {/* Display the current month and how much debt you have in that month */}
                    <Stack spacing={0} align={'center'} justify={'center'}>
                        <Text
                            color={useColorModeValue('gray.800', 'white')}
                            fontWeight={600}
                            fontSize={'2xl'}>
                            {month1}
                        </Text>
                        <Text fontSize={'4xl'} fontWeight={800} color={'black'}>
                            ${debt}
                        </Text>
                    </Stack>
                    {/* Display the previous month and how much debt you had in that month */}
                    <Stack spacing={0} align={'center'} justify={'center'}>
                        <Text
                            color={useColorModeValue('gray.800', 'white')}
                            fontWeight={600}
                            fontSize={'2xl'}>
                            {month2}
                        </Text>
                        <Text fontSize={'4xl'} fontWeight={800} color={'black'}>
                            ${prevMonth.reduce((acc, transaction) => acc + transaction.amount, 0)}
                        </Text>
                    </Stack>
                    {/* Display the month before that and how much debt you had in that month */}
                    <Stack spacing={0} align={'center'} justify={'center'}>
                        <Text
                            color={useColorModeValue('gray.800', 'white')}
                            fontWeight={600}
                            fontSize={'2xl'}>
                            {month3}
                        </Text>
                        <Text fontSize={'4xl'} fontWeight={800} color={'black'}>
                            ${prevPrevMonth.reduce((acc, transaction) => acc + transaction.amount, 0)}
                        </Text>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default Debt;