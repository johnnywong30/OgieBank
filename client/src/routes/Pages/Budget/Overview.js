import React from "react";
import { 
    Box,
    Text,
    Stack,
    SimpleGrid, 
    Center,
    List,
    ListItem,
    ListIcon,
} from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {useSelector} from 'react-redux';
import validation from '../../../constants/validation';

const Overview = () => {
    const userData = useSelector((state) => state.auth.user);
    const monthIncome = validation.getRounded(userData.budget.monthIncome);
    const monthDeposit = validation.getRounded(userData.budget.monthDeposit);
    const monthRecurring = validation.getRounded(userData.budget.monthRecurring);
    const monthVariable = validation.getRounded(userData.budget.monthVariable);
    const remaining = validation.getRounded(monthIncome + monthDeposit - monthRecurring - monthVariable);

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
                                {monthNames[d.getMonth()]}'s Savings: ${remaining}
                            </Text>
                        </Stack>
                    </Stack>
                </SimpleGrid>
                <Box bg={'white'} px={6} py={10}>
                    <Center>
                        <List spacing={3}>
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
                </Box>
            </Box>
        </Box>
    )
}

export default Overview;