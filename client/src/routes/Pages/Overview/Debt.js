import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'

// create pie charts using ApexCharts
import ReactApexChart from "react-apexcharts";
import { 
    Box,
    Text,
    Stack,
    List,
    ListItem,
    ListIcon,
    Button,
    useColorModeValue, 
    SimpleGrid, 
    Center
} from '@chakra-ui/react'

const Debt = () => {
    // Show spending by Bank/Credit, and by Category and separate by past week, month, year, all time

    // display the stats in a table
    
    const allTransactions = useSelector((state) => state.transactions.transactions)
    const dispatch = useDispatch();

    // create an array of all the transactions that are debts
    const [debts, setDebts] = useState([])
    const now = new Date()

    // given 'week', 'month', 'year', 'all', return the transactions that are in that time period
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
                // console.log("week" + transactions)
                break;
            case 'month':
                for (let i = 0; i < allTransactions.length; i++) {
                    let date = new Date(allTransactions[i].date)
                    if (date > lastMonth) {
                        transactions.push(allTransactions[i])
                    }
                }
                // console.log("month" + transactions)
                break;
            case 'year':
                for (let i = 0; i < allTransactions.length; i++) {
                    let date = new Date(allTransactions[i].date)
                    if (date > lastYear) {
                        transactions.push(allTransactions[i])
                    }
                }
                // console.log("year" + transactions)
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

    const getColors = (percentages) => {
        let colors = []
        percentages.forEach(p => {
            let color = ''
            if (p.percentage < 0.5) {
                color = `rgb(${255 * (1 - p.percentage * 2)}, 255, 0)`
            } else {
                color = `rgb(255, ${255 * (1 - (p.percentage - 0.5) * 2)}, 0)`
            }
            colors.push({name: p.name,
                color: color})
        })
        return colors
    }

    // Display the stats in a table
    const [timePeriod, setTimePeriod] = useState('all')
    const [sourceStats, setSourceStats] = useState([])
    const [categoryStats, setCategoryStats] = useState([])
    const [sourcePercentages, setSourcePercentages] = useState([])
    const [categoryPercentages, setCategoryPercentages] = useState([])
    const [sourceColors, setSourceColors] = useState([])
    const [categoryColors, setCategoryColors] = useState([])
    const [sourceTotal, setSourceTotal] = useState(0)
    const [categoryTotal, setCategoryTotal] = useState(0)
    
    useEffect(() => {
        const transactions = getTransactions(timePeriod)
        const sourceStats = getStats(transactions, 'source')
        const categoryStats = getStats(transactions, 'category')
        const sourcePercentages = getPercentages(sourceStats.stats, sourceStats.total)
        const categoryPercentages = getPercentages(categoryStats.stats, categoryStats.total)
        const sourceColors = getColors(sourcePercentages)
        const categoryColors = getColors(categoryPercentages)
        setSourceStats(sourceStats.stats)
        setCategoryStats(categoryStats.stats)
        setSourcePercentages(sourcePercentages)
        setCategoryPercentages(categoryPercentages)
        setSourceColors(sourceColors)
        setCategoryColors(categoryColors)
        setSourceTotal(sourceStats.total)
        setCategoryTotal(categoryStats.total)
    }

    , [timePeriod])

    // create the pie charts
    const [sourceSeries, setSourceSeries] = useState([])
    const [categorySeries, setCategorySeries] = useState([])
    const [sourceLabels, setSourceLabels] = useState([])
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
        setSourceSeries(sourceSeries)
        setCategorySeries(categorySeries)
        setSourceLabels(sourceLabels)
        setCategoryLabels(categoryLabels)
    }, [sourcePercentages, categoryPercentages])

    const sourceOptions = {
        chart: {
          type: "donut",
        },
        labels: sourceLabels,
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
                    return "$" + val;
                  }
                },
                total: {
                  show: true,
                  label: "Total",
                  color: "#373d3f",
                  formatter: function (w) {
                    return "$" + sourceTotal;
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
      
      const categoryOptions = {
        chart: {
          type: "donut",
        },
        labels: categoryLabels,
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
                    <Stack
                        textAlign={'center'}
                        px={6}
                        py={2}
                        color={'black'}
                        align={'center'}>
                        <Stack direction={'row'} align={'center'} justify={'center'}>
                            <Text fontSize={'3xl'} fontWeight={800}>
                                Debt Status
                            </Text>
                        </Stack>
                    </Stack>
                </SimpleGrid>
                    <div style={{backgroundColor: '#f5f5f5', padding: '20px'}}>
                    <div>
                        <div style={{display: 'flex', justifyContent: 'center', backgroundColor: '#e0e0e0', padding: '10px'}}>
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
                            <ReactApexChart 
                                options={categoryOptions} 
                                series={categorySeries} 
                                type="donut" 
                                width={500}
                            />
                        </div>
                        {/* <table>
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <div style={{width: '10px'}}></div>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryStats ? categoryStats.map(c => {
                                    return (
                                        <tr>
                                            <td>{c.name ? c.name : 'Uncategorized'}</td>
                                            <div style={{width: '10px'}}></div>
                                            <td>{c.amount ? c.amount : 0}</td>
                                        </tr>
                                    )
                                }) : 
                                <tr>
                                    <td>No data</td>
                                </tr>
                                }
                            </tbody>
                        </table> */}
                    </div>
                </div>
            </Box>
        </Box>
    )
}

export default Debt;