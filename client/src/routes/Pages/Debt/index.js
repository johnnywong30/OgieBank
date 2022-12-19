// Make a dynamic calculator that takes principal, interest rate, and number of payments
// and returns the monthly payment amount and total interest paid

import React, { useState } from "react";
import { 
    Box,
    Text,
    Button,
    SimpleGrid, 
    Center
} from '@chakra-ui/react'

const Debt = () => {
    const [principal, setPrincipal] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [numPayments, setNumPayments] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);

    const calculate = () => {
        const monthlyInterestRate = interestRate / 100 / 12;
        const monthlyPayment = principal * (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numPayments)));
        const totalInterest = monthlyPayment * numPayments - principal;
        setMonthlyPayment(monthlyPayment);
        setTotalInterest(totalInterest);
    }

    // make the calculator look nice
    return (
        <Box>
            <Text fontSize="4xl" fontWeight="bold" textAlign="center" mt="10">Debt Calculator</Text>
            <Center>
                <SimpleGrid columns={2} spacing={10} mt="10" background="gray.100" p="10" borderRadius="10px">
                    <Box>
                        <Text fontSize="2xl" fontWeight="bold" textAlign="center">Principal</Text>
                        <input id="principal" type="number" value={principal} onChange={e => setPrincipal(e.target.value)} />
                        <label htmlFor="principal"></label>
                    </Box>
                    <Box>
                        <Text fontSize="2xl" fontWeight="bold" textAlign="center">Interest Rate (%)</Text>
                        <input id="interestRate" type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
                        <label htmlFor="interestRate"></label>
                    </Box>
                    <Box>
                        <Text fontSize="2xl" fontWeight="bold" textAlign="center">Months of Payments</Text>
                        <input id="payments" type="number" value={numPayments} onChange={e => setNumPayments(e.target.value)} />
                        <label htmlFor="payments"></label>
                    </Box>
                    <Box>
                        <Text fontSize="2xl" fontWeight="bold" textAlign="center">Monthly Payment</Text>
                        {/* input is disabled */}
                        <input type="number" value={monthlyPayment.toFixed(2)} onChange={e => setMonthlyPayment(e.target.value)} disabled />
                    </Box>
                    <Box>
                        <Text fontSize="2xl" fontWeight="bold" textAlign="center">Total Interest</Text>
                        {/* input is disabled */}
                        <input type="number" value={totalInterest.toFixed(2)} onChange={e => setTotalInterest(e.target.value)} disabled />
                    </Box>
                </SimpleGrid>
            </Center>
            <Center>
                <Button onClick={calculate} mt="10">Calculate</Button>
            </Center>
        </Box>
    )
}

export default Debt