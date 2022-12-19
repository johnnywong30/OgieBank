import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'

// create pie charts using ApexCharts
import ReactApexChart from "react-apexcharts";
import { 
    Box,
    Text,
    Stack,
    SimpleGrid, 
} from '@chakra-ui/react'

const Debt = () => {   
    const allTransactions = useSelector((state) => state.transactions.transactions)
    const now = new Date()

    const getTransactions = (timePeriod) => {
        let transactions = []
        const lastWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
        const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
        switch (timePeriod) {
            case 'week':
                // set transactions to all transactions that are within the past week
                for (let i = 0; i < allTransactions.length; i++) {
                    // translate date in MM/DD/YYYY format to a date object
                    let date = new Date(allTransactions[i].date)
                    if (date > lastWeek) {
                        transactions.push(allTransactions[i])
                    }
                }
                break;
            case 'month':
                for (let i = 0; i < allTransactions.length; i++) {
                    let date = new Date(allTransactions[i].date)
                    if (date > lastMonth) {
                        transactions.push(allTransactions[i])
                    }
                }
                break;
            case 'year':
                for (let i = 0; i < allTransactions.length; i++) {
                    let date = new Date(allTransactions[i].date)
                    if (date > lastYear) {
                        transactions.push(allTransactions[i])
                    }
                }
                break;
            case 'all':
                transactions = allTransactions
                break;
            default:
                transactions = allTransactions
                break;
        }
        return transactions
    }

    // given an array of transactions, and either 'source' or 'category', return an array of objects with the name and amount of the source/category
    const getStats = (transactions, type) => {
        let stats = []
        let total = 0
        transactions.forEach(t => {
            if (type === 'source') {
                let source = stats.find(s => s.name === t.source)
                if (source) {
                    source.amount += t.amount
                } else {
                    stats.push({name: t.source, amount: t.amount})
                }
            } else if (type === 'category') {
                let category = stats.find(s => s.name === t.category)
                if (category) {
                    category.amount += t.amount
                } else {
                    stats.push({name: t.category, amount: t.amount})
                }
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
    const [timePeriod, setTimePeriod] = useState('all')
    const [sourcePercentages, setSourcePercentages] = useState([])
    const [categoryPercentages, setCategoryPercentages] = useState([])
    const [categoryTotal, setCategoryTotal] = useState(0)
    
    useEffect(() => {
        const transactions = getTransactions(timePeriod)
        const sourceStats = getStats(transactions, 'source')
        const categoryStats = getStats(transactions, 'category')
        const sourcePercentages = getPercentages(sourceStats.stats, sourceStats.total)
        const categoryPercentages = getPercentages(categoryStats.stats, categoryStats.total)
        setSourcePercentages(sourcePercentages)
        setCategoryPercentages(categoryPercentages)
        setCategoryTotal(categoryStats.total)
    }

    , [timePeriod])

    // create the pie charts
    const [categorySeries, setCategorySeries] = useState([])
    const [categoryLabels, setCategoryLabels] = useState([])

    useEffect(() => {
        const sourceSeries = []
        const sourceLabels = []
        sourcePercentages.forEach(s => {
            sourceSeries.push(s.percentage)
            sourceLabels.push(s.name)
        })
        const categorySeries = []
        const categoryLabels = []
        categoryPercentages.forEach(c => {
            categorySeries.push(c.percentage)
            categoryLabels.push(c.name)
        })
        setCategorySeries(categorySeries)
        setCategoryLabels(categoryLabels)
    }, [sourcePercentages, categoryPercentages])
      
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

    // On page load, setTimePeriod('week')
    useEffect(() => {
        setTimePeriod('all')
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
                    <div style={{backgroundColor: '#f5f5f5', padding: '20px'}}>
                    <div>
                        <div style={{display: 'flex', justifyContent: 'center', backgroundColor: '#e0e0e0', padding: '10px'}}>
                            <Text fontSize={'l'} fontWeight={800}>
                                Choose a time period: 
                            </Text>
                            <div style={{width: '10px'}}></div>
                            <button onClick={() => setTimePeriod('week')}>Week</button>
                            <div style={{width: '10px'}}></div>
                            <button onClick={() => setTimePeriod('month')}>Month</button>
                            <div style={{width: '10px'}}></div>
                            <button onClick={() => setTimePeriod('year')}>Year</button>
                            <div style={{width: '10px'}}></div>
                            <button onClick={() => setTimePeriod('all')}>All</button>
                        </div>
                    </div>
                    <div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            {/* if categoryOptions or categorySeries is empty, display a message saying "No transactions found", otherwise render the chart */}
                            {categoryOptions.labels.length === 0 ? 
                                <Text fontSize={'l'} fontWeight={800}>No transactions found</Text> :
                                <ReactApexChart 
                                    options={categoryOptions} 
                                    series={categorySeries} 
                                    type="donut" 
                                    width={500}
                                />
                            }
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    )
}

export default Debt;