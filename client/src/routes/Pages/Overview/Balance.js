import React from "react";
import { 
    Box,
    Text,
    Stack,
    List,
    ListItem,
    ListIcon,
    Button,
    useColorModeValue, 
    SimpleGrid, 
    Center
} from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux';
import validation from '../../../constants/validation';

const Balance = () => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.user);
    const bankName = userData.accountInfo.bankName === '' ? "Add Bank Name In Settings" : userData.accountInfo.bankName;
    const bankBalance = validation.getRounded(userData.accountInfo.bankBalance);
    const creditName = userData.accountInfo.creditName === '' ? "Add Credit Name In Settings" : userData.accountInfo.creditName;
    const creditBalance = validation.getRounded(userData.accountInfo.creditBalance);
    const creditLimit = validation.getRounded(userData.accountInfo.creditLimit);
    const monthIncome = validation.getRounded(userData.budget.monthIncome);
    const monthDeposit = validation.getRounded(userData.budget.monthDeposit);
    const monthRecurring = validation.getRounded(userData.budget.monthRecurring);
    const monthVariable = validation.getRounded(userData.budget.monthVariable);
    const remaining = validation.getRounded(monthIncome + monthDeposit - monthRecurring - monthVariable);

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
                <SimpleGrid columns={[1, null, 2]} spacingX="0" spacingY="0">
                    <Stack
                        textAlign={'center'}
                        px={6}
                        py={2}
                        color={useColorModeValue('gray.800', 'white')}
                        align={'center'}>
                        <Text
                            fontSize={'sm'}
                            fontWeight={500}
                            bg={useColorModeValue('green.50', 'green.900')}
                            p={2}
                            px={3}
                            color={'green.500'}
                            rounded={'full'}>
                            {bankName}
                        </Text>
                        <Stack direction={'row'} align={'center'} justify={'center'}>
                            <Text fontSize={'xl'}>$</Text>
                            <Text fontSize={'3xl'} fontWeight={800}>
                                {bankBalance}
                            </Text>
                        </Stack>
                    </Stack>
                    <Stack
                        textAlign={'center'}
                        px={6}
                        py={2}
                        color={useColorModeValue('gray.800', 'white')}
                        align={'center'}>
                        <Text
                            fontSize={'sm'}
                            fontWeight={500}
                            bg={useColorModeValue('red.50', 'red.900')}
                            p={2}
                            px={3}
                            color={'red.500'}
                            rounded={'full'}>
                            {creditName}
                        </Text>
                        <Stack direction={'row'} align={'center'} justify={'center'}>
                            <Text fontSize={'xl'}>$</Text>
                            <Text fontSize={'3xl'} fontWeight={800}>
                                {creditBalance}
                            </Text>
                            <Text color={'gray.500'}>/ {creditLimit}</Text>
                        </Stack>
                    </Stack>
                </SimpleGrid>
                <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                    <Center>
                    <List spacing={3}>
                            <ListItem>
                                <Text fontSize={'3xl'} fontWeight={800}>
                                    Remaining: ${remaining}
                                </Text>
                            </ListItem>
                            <ListItem>
                                <ListIcon as={TriangleUpIcon} color="green.400" />
                                Income: ${monthIncome}
                            </ListItem>
                            <ListItem>
                                <ListIcon as={TriangleDownIcon} color="red.400" />
                                Expenses: ${monthRecurring}
                            </ListItem>
                            <ListItem>
                                <ListIcon as={TriangleDownIcon} color="red.400" />
                                Spending: ${monthVariable}
                            </ListItem>
                        </List>
                    </Center>
                    <Button
                        onClick = {() => navigate('/budget')}
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
                        View Budget
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Balance;