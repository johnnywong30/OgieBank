import React, { useState, useEffect } from "react";
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
    Center,
    Select
} from '@chakra-ui/react'
import { MinusIcon } from '@chakra-ui/icons';

// create pie charts using ApexCharts
import ReactApexChart from "react-apexcharts";

const Debts = () => {
    // Show spending by Bank/Credit, and by Category and separate by past week, month, year, all time

    // display the stats in a table
    
    const allTransactions = useSelector((state) => state.transactions.transactions)
    const dispatch = useDispatch();

    // create an array of all the transactions that are debts
    const [debts, setDebts] = useState([])

    // given 'week', 'month', 'year', 'all', return the transactions that are in that time period
    const getTransactions = (timePeriod) => {
        let transactions = []
        switch (timePeriod) {
            case 'week':
                transactions = allTransactions.filter(t => t.date > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
                break;
            case 'month':
                transactions = allTransactions.filter(t => t.date > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
                break;
            case 'year':
                transactions = allTransactions.filter(t => t.date > new Date(Date.now() - 365 * 24 * 60 * 60 * 1000))
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

    // given an array of objects with name and amount, return an array of objects with name and percentage
    const getPercentages = (stats, total) => {
        let percentages = []
        stats.forEach(s => {
            percentages.push({name: s.name, percentage: s.amount / total})
        })
        return percentages
    }

    // given an array of objects with name and percentage, return an array of objects with name and color
    const getColors = (percentages) => {
        let colors = []
        percentages.forEach(p => {
            let color = ''
            if (p.percentage > 0.5) {
                color = '#FF0000'
            } else if (p.percentage > 0.25) {
                color = '#FFA500'
            } else {
                color = '#FFFF00'
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
                                    return "$" + val;
                                }
                            },
                            total: {
                                show: true,
                                label: "Total",
                                color: "#373d3f",
                                formatter: function (w) {
                                    return "$" + categoryTotal;
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
        <div>
            <div>
                {/* create a time period selector with padding between buttons */}
                <div style={{display: 'flex', justifyContent: 'center'}}>
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
                    <ReactApexChart options={categoryOptions} series={categorySeries} type="donut" width={500} />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <div style={{width: '10px'}}></div>
                            <th>Amount</th>
                            <div style={{width: '10px'}}></div>
                            <th>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryStats.map(c => {
                            return (
                                <tr>
                                    <td>{c.name}</td>
                                    <div style={{width: '10px'}}></div>
                                    <td>{c.amount}</td>
                                    <div style={{width: '10px'}}></div>
                                    <td>{c.percentage}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Debts