import React, {useEffect, useState} from 'react'
import getRandomColor from '../commons/getRandomColor'
import { Charts } from '../components/Charts'
import { TableInfoChart } from '../components/TableInfoChart'

var colorList = []

export const Statistics = ({chartData}) => {

    const [chartsData, setChartsData] = useState([])
    const [chartSelected, setChartSelected] = useState('')
    const [updateChild, setUpdateChild] = useState(0)

    useEffect(() => {
        setChartsData(chartData)
    }, [chartData])

    useEffect(() => {
        filterChart()
        setUpdateChild(old => old + 1)
    }, [chartSelected])

    const getColorForChart = (idx) => {
        const colors = getRandomColor(chartData)
        colorList[idx] = colors
        return colors
    }

    const filterChart = async () => {
        if (!chartSelected) {
            await setChartsData(chartData)
        } else {
            let newChartList = chartData.filter(item => item.title === chartSelected)
            await setChartsData(newChartList)
        }
    }
 
    return (
        <div>
            <div className="columns">
                <div className="column">
                    <div className="field">
                        <div className="columns">
                            <div className="column is-flex">
                                <label className="label is-small" style={{paddingRight: 10}}>Filtrar gráfico por: </label>
                                <select value={chartSelected} onChange={(e) => setChartSelected(e.target.value)}>
                                    <option value='' selected>Todos</option>
                                    {
                                        chartData.map((item, i) => (
                                            <option key={i} value={item.title}>{item.title}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="columns is-multiline">
                {
                    chartsData.map((chart, i) => (
                        <div className="column is-5 card-chart" key={i}>
                            <p className="is-uppercase card-chart-title">{chart.title}</p>
                            <hr/>
                            <div className="columns">
                                <div className="column is-7">
                                    <Charts key={updateChild} data={chart.values} colorList={getColorForChart(i)}/>
                                </div>
                                <div className="column" style={{marginTop: 10}}>
                                    {
                                        colorList[i] &&
                                        <TableInfoChart key={updateChild} data={chart} colorList={colorList[i]}/>
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
