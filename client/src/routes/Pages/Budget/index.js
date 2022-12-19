import React from "react";
import { Heading, 
    Container, 
    SimpleGrid, 
} from '@chakra-ui/react'

import Chart from './Chart';
import Expenses from './Expenses';
import Overview from './Overview';
import Spending from './Spending';

const Budget = () => {

    return (
        <Container maxW={'7xl'} px="12" py="6">
            <Heading as="h1">Budget</Heading>
            <SimpleGrid columns={[1, null, 2]} spacingX="6" spacingY="3">
                <SimpleGrid columns={1} spacingX="6" spacingY="3">
                    <Overview />
                    <Chart />
                </SimpleGrid>
                <SimpleGrid columns={1} spacingX="6" spacingY="3">
                    <Expenses />
                    <Spending />
                </SimpleGrid>
            </SimpleGrid>
        </Container>
    )
}

export default Budget;