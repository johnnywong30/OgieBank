import React from "react";
import { Heading, VStack, Text, HStack, Image, Box, Divider } from '@chakra-ui/react'
import ALEX_JIANG_UNSPLASH from '../../../constants/imgs/alex-jiang-unsplash.jpg';
import BIPPY_MILLION from '../../../constants/imgs/bippy_million.png';
import { v4 as uuidv4 } from 'uuid';
// Photo by <a href="https://unsplash.com/@aleex1809?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alex jiang</a> on <a href="https://unsplash.com/t/business-work?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  

const Home = () => {

    const CONTRIBUTORS = [
        'Maxwell Metzner',
        'Eric Stazzone',
        'Jordan Wang',
        'Johnny Wong',
        'Sophia Zuo'
    ]

    const SECTION_H = '750px'

    return (
        <VStack>
            <Heading as='h1' size='4xl'>
                Welcome to Ogie Bank
            </Heading>
            <VStack spacing={1}>
                <Text fontSize='xl' color='gray.600'>
                    We help you keep track of your spending
                </Text>
                <Text fontSize='sm' color='gray.500'>
                    and keep you off the streets
                </Text>
            </VStack>
            <HStack spacing={8} marginTop="8">
                <VStack w='30vw' h={'600px'}>
                    <Heading as='h2' size='xl' color='gray.600'>
                        Budget Tracking
                    </Heading>
                    <VStack spacing={8} paddingTop={8}>
                        <Text fontSize='lg' color='gray.500'>
                            Over 48 million people that are student debt borrowers with an average of $28,400 in federal and private debt.
                            It can be difficult keeping up with spreadsheets of information such as your recent transactions.
                        </Text>
                        <Text fontSize='lg' color='gray.500'>
                            Here at Ogie Bank, we believe in simplicity and ease of use. We aim to create an intuitive space to manage your budget
                            and financial planning, especially for paying off debt.
                        </Text>
                        <Text fontSize='lg' color='gray.500'>
                            Users can track their spending, get an overview of their budget and savings statuses, as well as view and sort their statements.
                            Users will be able to easily input their information and export it.
                            Ogie Bank will generate charts and infographics to display users' various spending habits by category or amount.
                            Ogie bank also can provide paginated transaction pages, provide saving recommendations, and overall debt breakdowns so users can
                            see how far along they are in their process of paying off loans or towards a savings goal.
                        </Text>
                    </VStack>
                </VStack>
                <Box w='450px' h={SECTION_H}>
                    <Image src={ALEX_JIANG_UNSPLASH} alt='Welcome Image' rounded='15px'/>
                    <Text fontSize='md' color='gray.400' paddingTop={2}>
                        Photo by <a href="https://unsplash.com/@aleex1809?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alex Jiang</a> on <a href="https://unsplash.com/t/business-work?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
                    </Text>                
                </Box>
            </HStack>
            <HStack spacing={'10vw'}>
                <Box h='400px'>
                    <Image src={BIPPY_MILLION} alt='Bippy Rich' rounded='20px'/>
                </Box>
                <VStack h='300px' w='20vw'>
                    <Heading as='h3' size='lg' color='gray.500'>
                        Contributors
                    </Heading>
                    <VStack>
                        {
                            CONTRIBUTORS.map(contributor => {
                                return (
                                    <Text key={uuidv4()} fontSize='md' color='gray.400'>
                                        {contributor}
                                    </Text>
                                )
                            })
                        }
                    </VStack>

                </VStack>
            </HStack>
        </VStack>
    )
}

export default Home