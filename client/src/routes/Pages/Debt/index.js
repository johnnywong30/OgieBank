// Make a dynamic calculator that takes principal, interest rate, and number of payments
// and returns the monthly payment amount and total interest paid

import React, { useState } from "react";
import { 
    Box,
    Text,
    Button,
    SimpleGrid, 
    Center,
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
import { QuestionOutlineIcon } from '@chakra-ui/icons';

const Debt = () => {
    const [principal, setPrincipal] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [numPayments, setNumPayments] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const calculate = () => {
        // Perform input validation for all inputs
        // convert all inputs to numbers, if they are not numbers, alert the user
        // if any of the inputs are negative, alert the user
        // if the interest rate is greater than 100%, alert the user
        // if any of the inputs are blank, alert the user

        const newPrincipal = Number(principal);
        const newInterestRate = Number(interestRate);
        const newNumPayments = Number(numPayments);
        if (typeof newPrincipal !== "number" || typeof newInterestRate !== "number" || typeof newNumPayments !== "number") {
            alert("Please enter valid numbers for all inputs");
            return;
        }
        if (newPrincipal <= 0 || newInterestRate <= 0 || newNumPayments <= 0) {
            alert("Please enter positive numbers for all inputs");
            return;
        }
        if (newInterestRate > 100) {
            alert("Interest rate cannot be greater than 100%");
            return;
        }
        if (newPrincipal === "" || newInterestRate === "" || newNumPayments === "") {
            alert("You cannot leave inputs blank");
            return;
        }
        // Divide your interest rate by the number of payments you’ll make that year. If you have a 6 percent interest rate and you make monthly payments, you would divide 0.06 by 12 to get 0.005.
        // Multiply that number by your remaining loan balance to find out how much you’ll pay in interest that month. 
        const monthlyPayment = (newPrincipal * (newInterestRate / 100) / 12) / (1 - Math.pow(1 + (newInterestRate / 100) / 12, -newNumPayments));
        const totalInterest = (monthlyPayment * newNumPayments) - newPrincipal;
        setMonthlyPayment(monthlyPayment);
        setTotalInterest(totalInterest);
    }

    // make the calculator look nice
    return (
        <Box>
            <Modal
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Debt Breakdown Guide</ModalHeader>
                <ModalCloseButton />
                <ModalBody mb="4">
                    Our debt breaking provides a simple understanding in providing a monthly expense for a large loan or sum.
                </ModalBody>
                <ModalBody mb="4">
                    You input the total amount of the principal, the interest rate as a percent (ex. 10), and the number of months you will be paying that amount
                    (ex. 60 months = 5 years).
                </ModalBody>
                <ModalBody mb="4">
                    We will provide you the generated interest with a total principal plus the interest.
                </ModalBody>
                <ModalBody mb="4">
                    Lastly, we will give you an estimated monthly expense. Which you can add later as a monthly expense in the budget!
                </ModalBody>
                </ModalContent>
            </Modal>
            <Flex minWidth='max-content' alignItems='center' gap='2'>
                <Text px='6' py='2' fontSize={'3xl'} fontWeight={800}>
                    Debt Breakdown
                </Text>
                <Spacer />
                <label for={'debtHelp'}></label>
                <Button
                    id={'debtHelp'}
                    width={'10%'}
                    ml={0}
                    mr={3}
                    onClick={onOpen}
                >
                    <QuestionOutlineIcon />
                </Button>
            </Flex>
            <Center>
                <SimpleGrid columns={[1, null, 2]} spacing={10} mt="2" background="gray.100" p="10" borderRadius="10px">
                    <Box>
                        <Text fontSize="2xl" fontWeight="bold">Principal</Text>
                        <input id="principal" type="number" value={principal} onChange={e => setPrincipal(e.target.value)} />
                        <label htmlFor="principal"></label>
                    </Box>
                    <Box>
                        <Text fontSize="2xl" fontWeight="bold">Interest Rate (%)</Text>
                        <input id="interestRate" type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
                        <label htmlFor="interestRate"></label>
                    </Box>
                    <Box>
                        <Text fontSize="2xl" fontWeight="bold">Months of Payments</Text>
                        <input id="payments" type="number" value={numPayments} onChange={e => setNumPayments(e.target.value)} />
                        <label htmlFor="payments"></label>
                    </Box>
                    <Box>
                    </Box>
                    <Box>
                        <Text fontSize="2xl" fontWeight="bold">Total Interest</Text>
                        {/* input is disabled */}
                        <input type="text" value={"$" + totalInterest.toFixed(2)} onChange={e => setTotalInterest(e.target.value)} disabled />
                    </Box>
                    <Box>
                        <Text fontSize="2xl" fontWeight="bold">Total Paid</Text>
                        {/* input is disabled */}
                        <input type="text" value={"$" + (monthlyPayment * numPayments).toFixed(2)} onChange={e => setTotalInterest(e.target.value)} disabled />
                    </Box>
                </SimpleGrid>
            </Center>
            <Center>
                <Box my="6" borderRadius="10px">
                    <Text fontSize="2xl" fontWeight="bold">Estimated Monthly Expense</Text>
                    {/* input is disabled */}
                    <Center>
                    <input type="text" value={"$" + monthlyPayment.toFixed(2)} onChange={e => setMonthlyPayment(e.target.value)} disabled /></Center>
                </Box>
            </Center>
            <Center>
                <Button onClick={calculate} mt="10">Calculate</Button>
            </Center>
        </Box>
    )
}

export default Debt