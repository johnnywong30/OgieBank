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
    Divider,
    Flex,
    Spacer,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
} from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {useSelector} from 'react-redux';
import validation from '../../../constants/validation';
import { QuestionOutlineIcon } from '@chakra-ui/icons';

const Overview = () => {
    const userData = useSelector((state) => state.auth.user);
    const monthIncome = validation.getRounded(userData.budget.monthIncome);
    const monthRecurring = validation.getRounded(userData.budget.monthRecurring);
    const monthVariable = validation.getRounded(userData.budget.monthVariable);
    const remaining = validation.getRounded(monthIncome - monthRecurring - monthVariable);

    const { isOpen, onOpen, onClose } = useDisclosure();

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
            <Modal
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Budget Guide</ModalHeader>
                <ModalCloseButton />
                <ModalBody mb="4">
                    Welcome to budgeting! The top panel describes the current month, the amount of income you generated (any deposits), the sum of your monthly expenses,
                    and a running balance of your spending. 
                </ModalBody>
                <ModalBody mb="4">
                    Monthly expenses are allocations for your budget to see how much that expense will effect your savings. Adding a transaction from respective expenses will only effect
                    your balances and not your budget, as the expense is already accounted for.
                </ModalBody>
                <ModalBody mb="4">
                    The estimated savings is the sum of your income, expenses, and spending throughout the month.
                </ModalBody>
                <ModalBody mb="4">
                    You can also export your budget, located in the top right corner.
                </ModalBody>
                </ModalContent>
            </Modal>
            <Box
                w={'full'}
                bg={'white'}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>
                <SimpleGrid columns={[1]} spacingX="0" spacingY="0">
                    <Flex minWidth='max-content' alignItems='center' gap='2'>
                        <Text px='6' py='2' fontSize={'3xl'} fontWeight={800}>
                            {monthNames[d.getMonth()]}
                        </Text>
                        <Spacer />
                        <label for={'budgetHelp'}></label>
                        <Button
                            id={'budgetHelp'}
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
                    <Center>
                        <List spacing={3}>
                            <ListItem>
                                <Text fontSize={'xl'} fontWeight={800}>
                                    Estimated Savings: ${remaining}
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
                </Box>
            </Box>
        </Box>
    )
}

export default Overview;