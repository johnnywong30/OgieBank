import React from "react";
import { 
    Box,
    Text,
    Stack,
    SimpleGrid, 
    Divider,
} from '@chakra-ui/react'

const Chart = () => {
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
                                Chart
                            </Text>
                        </Stack>
                    </Stack>
                </SimpleGrid>
                <Divider/>
                <Box bg={'white'} px={6} py={10}>
                    Chart Here
                </Box>
            </Box>
        </Box>
    )
}

export default Chart;