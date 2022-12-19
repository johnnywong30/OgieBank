import React from "react";
import { 
    Box,
    Text,
    Stack,
    List,
    ListItem,
    ListIcon,
    Button,
    SimpleGrid, 
    Center,
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
    const monthRecurring = validation.getRounded(userData.budget.monthRecurring);
    const monthVariable = validation.getRounded(userData.budget.monthVariable);
    const remaining = validation.getRounded(monthIncome - monthRecurring - monthVariable);

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const d = new Date();

    return (
        <Box
            marginTop={{ base: '1', sm: '5' }}
            display="flex"
            flexDirection={{ base: 'column', sm: 'row' }}
            justifyContent="space-between"
            w={'full'}
            >
            <Box
                w={'full'}
                bg={'#86cf9d'} //adjust header color here
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>
                <SimpleGrid columns={[1, null, 2]} spacingX="0" spacingY="0">
                    <Stack
                        textAlign={'center'}
                        px={6}
                        py={2}
                        color={'black'}
                        align={'center'}>
                        <Text
                            fontSize={'sm'}
                            fontWeight={500}
                            bg={'green.50'}
                            p={2}
                            px={3}
                            color={'black'}
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
                        color={'black'}
                        align={'center'}>
                        <Text
                            fontSize={'sm'}
                            fontWeight={500}
                            bg={'red.50'}
                            p={2}
                            px={3}
                            color={'black'}
                            rounded={'full'}>
                            {creditName}
                        </Text>
                        <Stack direction={'row'} align={'center'} justify={'center'}>
                            <Text fontSize={'xl'}>$</Text>
                            <Text fontSize={'3xl'} fontWeight={800}>
                                {creditBalance}
                            </Text>
                            <Text color={'black'}>/ {creditLimit}</Text>
                        </Stack>
                    </Stack>
                </SimpleGrid>
                <Box bg={'white'} px={6} py={10}>
                    <Center>
                    <List spacing={3}>
                            <ListItem>
                                <Text fontSize={'xl'} fontWeight={800}>
                                    Saved in {monthNames[d.getMonth()]}: ${remaining}
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
                        View Budget
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Balance;
