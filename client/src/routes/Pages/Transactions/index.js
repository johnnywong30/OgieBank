import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { 
    Box,
    Divider,
    Text,
    Stack,
    List,
    ListItem,
    Button,
    useColorModeValue, 
    SimpleGrid, 
    Center
} from '@chakra-ui/react'
import { MinusIcon } from '@chakra-ui/icons';

const Transactions = (props) => {
    const transactions = useSelector((state) => state.transactions.transactions)
    const color = useColorModeValue('gray.800', 'white')
    const bg = useColorModeValue('green.50', 'green.900')

    const buildTransactions = (transactionList) => {
        return (
            <List spacing={3}>
                {transactionList.map((t) => {
                    return (
                        <ListItem key={t.id}>
                            <SimpleGrid columns={[1, null, 3]} spacingX="0" spacingY="0">
                                <Stack
                                    px={6}
                                    py={2}
                                    color={color}>
                                    <Stack direction={'row'}>
                                        <Text fontSize={'3xl'} fontWeight={800}>
                                            {t.name}
                                        </Text>
                                    </Stack>
                                    <Stack direction={'row'}>
                                        <Text
                                            fontSize={'sm'}
                                            fontWeight={500}
                                            bg={bg}
                                            p={2}
                                            px={3}
                                            color={'green.500'}
                                            rounded={'full'}>
                                            {t.category + ' - ' + t.payment}
                                        </Text>
                                    </Stack>
                                </Stack>
                                <Stack
                                    py={2}
                                    color={color}>
                                    <Stack direction={'row'} flexGrow='1'>
                                        <Text fontSize={'3xl'} fontWeight={800}>
                                        </Text>
                                    </Stack>
                                    <Text
                                        fontSize={'sm'}
                                        fontWeight={500}
                                        p={2}
                                        px={3}
                                        rounded={'full'}>
                                        {t.date}
                                    </Text>
                                </Stack>
                                <Stack
                                    px={6}
                                    py={2}
                                    color={color}
                                    alignItems={'flex-end'}
                                    >
                                    <Stack direction={'row'} flexGrow='1'>
                                        <Text fontSize={'xl'} fontWeight={500}>
                                            {'$' + t.amount}
                                        </Text>
                                    </Stack>
                                    <Stack>
                                        <Button
                                            width={'25%'}
                                        >
                                            <MinusIcon />
                                        </Button>
                                    </Stack>
                                </Stack>
                            </SimpleGrid>
                            <Divider/>
                        </ListItem>
                    )
                })}
            </List>
        )
    }
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
                        <Text fontSize={'3xl'} fontWeight={800}>
                            Overall Transactions
                        </Text>
                </Stack>
            </SimpleGrid>
            <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                <Center>
                {buildTransactions(transactions)}
            </Center>
        </Box>
    </Box>
</Box>
  )
}

export default Transactions