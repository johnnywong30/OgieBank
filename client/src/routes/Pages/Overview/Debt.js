import React from "react";
import { 
    Box,
    Text,
    Stack,
    useColorModeValue, 
    SimpleGrid, 
} from '@chakra-ui/react'

const Debt = () => {
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
                <SimpleGrid columns={[1]} spacingX="0" spacingY="0">
                    <Stack
                        textAlign={'center'}
                        px={6}
                        py={2}
                        color={useColorModeValue('gray.800', 'white')}
                        align={'center'}>
                        <Stack direction={'row'} align={'center'} justify={'center'}>
                            <Text fontSize={'3xl'} fontWeight={800}>
                                Debt Status
                            </Text>
                        </Stack>
                    </Stack>
                </SimpleGrid>
                <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                    Text Here
                </Box>
            </Box>
        </Box>
    )
}

export default Debt;