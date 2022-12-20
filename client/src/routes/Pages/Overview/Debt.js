import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'

// create pie charts using ApexCharts
import ReactApexChart from "react-apexcharts";
import { 
    Box,
    Text,
    SimpleGrid, 
    Flex,
    Spacer,
    Divider,
} from '@chakra-ui/react'

const Debt = () => {   
    const [categoryTotal, setCategoryTotal] = useState(0)
    const [categorySeries, setCategorySeries] = useState([])
    const [categoryLabels, setCategoryLabels] = useState([])
    const [updateGraphs, setUpdateGraphs] = useState(false)
    const allTransactions = useSelector((state) => state.transactions.transactions)

    // On page load, refresh the graphs
    useEffect(() => {
        setUpdateGraphs(!updateGraphs)
    }, [])

    const getStats = (transactions) => {
        let stats = []
        let total = 0
        transactions.forEach(t => {
            let category = stats.find(s => s.name === t.category)
            if (category) {
                category.amount += t.amount
            } else {
                stats.push({name: t.category, amount: t.amount})
            }
            total += t.amount
        })
        return {stats, total}
    }

    const getPercentages = (stats, total) => {
        let percentages = []
        stats.forEach(s => {
            percentages.push({name: s.name, percentage: s.amount / total})
        })
        return percentages
    }

    useEffect(() => {
        // When the transactions are updated, update the graph

        // TODO: 
        // Breaks under these conditions:
        // There are no transactions
        // The first transaction is successfully added
        // The second transaction is added successfully but does not show up in the graph until the page is refreshed

        const transactions = allTransactions.filter(t => t.category !== "Deposit")
        const categoryStats = getStats(transactions)
        const categoryPercentages = getPercentages(categoryStats.stats, categoryStats.total)
        const categorySeries = []
        const categoryLabels = []
        categoryPercentages.forEach(c => {
            categorySeries.push(c.percentage)
            categoryLabels.push(c.name)
        })
        setCategoryTotal(categoryStats.total)
        setCategorySeries(categorySeries)
        setCategoryLabels(categoryLabels)
    }, [updateGraphs, allTransactions])

    // The code below works as intended, displaying categoryStats, categorySeries, and categoryLabels that were calculated in the useEffect hook above
      
      const categoryOptions = {
        chart: {
          type: "donut",
        },
        colors: ["#0D47A1", "#1B5E20", "#4A148C", "#212121", "#B71C1C", "#F57F17", "#737d00", "#008b00", "#009688", "#00BCD4", "#007aca", "#3F51B5", "#b26200", "#673AB7", "#E91E63", "#9C27B0", "#795548", "#607D8B"],
        labels: categoryLabels,
        tooltip: {
            y: {
                formatter: function (val) {
                    return (val * 100).toFixed(3) + "%";
                }
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                            name: {
                                show: true,
                                fontSize: "22px",
                                fontFamily: "Helvetica, Arial, sans-serif",
                                fontWeight: 600,
                                color: undefined,
                                offsetY: -10
                                },
                            value: {
                                show: true,
                                fontSize: "16px",
                                fontFamily: "Helvetica, Arial, sans-serif",
                                fontWeight: 400,
                                color: undefined,
                                offsetY: 16,
                                formatter: function (val) {
                                    return "$" + (categoryTotal * val).toFixed(2);
                                }
                            },
                            total: {
                                show: true,
                                label: "Total",
                                color: undefined,
                                formatter: function (w) {
                                    // truncate decimal values to 2 digits
                                    return "$" + categoryTotal.toFixed(2);
                                }
                            }
                        }
                    }
                }
            },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
        };

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
                    <Flex minWidth='max-content' alignItems='center' gap='2'>
                        <Text px='6' py='2' fontSize={'3xl'} fontWeight={800}>
                                Spending Summary
                        </Text>
                        <Spacer />
                    </Flex>
                </SimpleGrid>
                <Divider/>
                {categoryOptions.labels.length === 0 ? 
                    <Text fontSize={'l'} fontWeight={800} textAlign={'center'} marginTop={'5'}>
                        No transactions found
                    </Text> :
                    <ReactApexChart 
                        options={categoryOptions} 
                        series={categorySeries} 
                        type="donut" 
                        width="100%"
                    />
                }
            </Box>
        </Box>
    )
}

export default Debt;