import React, { useState, useEffect } from "react";
import { Heading,
    Stack,
    Container, 
    SimpleGrid, 
    Button
} from '@chakra-ui/react'
import { CSVLink } from 'react-csv';
import axios from 'axios';

import Expenses from './Expenses';
import Overview from './Overview';
import Spending from './Spending';

const Budget = () => {  
    const [budget, setBudget] = useState({})

    const findBudget = async () => {
        const data = await axios.get('/api/calculations/getUserBudget')

        let budgetData = data.data.budget.budget
        setBudget(budgetData)
    }

    useEffect(() => {
        findBudget()
    }, [])

    return (
        <Container maxW={'7xl'} px="12" py="6">
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Heading as="h1">Budget</Heading>
                <CSVLink filename={'budget'} data={[budget]}>
                    <Button>Export</Button>
                </CSVLink>
            </Stack>
            <SimpleGrid columns={1} mx="25%" width="50%" spacingX="6" spacingY="3">
                    <Overview />
            </SimpleGrid>
            <SimpleGrid columns={[1, null, 2]} spacingX="6" spacingY="3">
                    <Expenses />
                    <Spending />
            </SimpleGrid>
        </Container>
    )
}

export default Budget;