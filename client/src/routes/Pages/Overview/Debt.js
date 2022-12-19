import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'

// create pie charts using ApexCharts
import ReactApexChart from "react-apexcharts";
import { 
    Box,
    Text,
    Stack,
    SimpleGrid, 
    Button
} from '@chakra-ui/react'

const Debt = () => {   
    const allTransactions = useSelector((state) => state.transactions.transactions)
    const now = new Date()

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

    // Display the stats in a table
    const [updateGraphs, setUpdateGraphs] = useState(false)
    const [categoryPercentages, setCategoryPercentages] = useState([])
    const [categoryTotal, setCategoryTotal] = useState(0)
    
    useEffect(() => {
        const transactions = allTransactions
        const categoryStats = getStats(transactions)
        const categoryPercentages = getPercentages(categoryStats.stats, categoryStats.total)
        setCategoryPercentages(categoryPercentages)
        setCategoryTotal(categoryStats.total)
    }
    , [updateGraphs, allTransactions])

    // create the pie charts
    const [categorySeries, setCategorySeries] = useState([])
    const [categoryLabels, setCategoryLabels] = useState([])

    useEffect(() => {
        const categorySeries = []
        const categoryLabels = []
        categoryPercentages.forEach(c => {
            categorySeries.push(c.percentage)
            categoryLabels.push(c.name)
        })
        setCategorySeries(categorySeries)
        setCategoryLabels(categoryLabels)
    }, [categoryPercentages])
      
      const categoryOptions = {
        chart: {
          type: "donut",
        },
        // TWEAK COLORS HERE TO WORK WITH TOTA11Y
        // Use Dark Blue, Dark Green, Dark Purple, Dark Gray, Dark Red
        colors: ["#0D47A1", "#1B5E20", "#4A148C", "#212121", "#B71C1C"],
        labels: categoryLabels,
        // On hover, the percentage should be shown and truncated to 3 decimal places
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

    // On page load, refresh the graphs
    useEffect(() => {
        setUpdateGraphs(!updateGraphs)
    }, [])

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
                                Spending Summary
                            </Text>
                        </Stack>
                    </Stack>
                </SimpleGrid>
                        {/* if categoryOptions or categorySeries is empty, display a message saying "No transactions found", otherwise render the chart */}
                        {categoryOptions.labels.length === 0 ? 
                            <Text fontSize={'l'} fontWeight={800}>No transactions found</Text> :
                            <ReactApexChart 
                                options={categoryOptions} 
                                series={categorySeries} 
                                type="donut" 
                                // fit the size of the div 
                                width="100%"
                            />
                        }
            </Box>
        </Box>
    )
}

export default Debt;