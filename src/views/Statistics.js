import React, {useEffect, useState} from 'react'
import getRandomColor from '../commons/getRandomColor'
import { Charts } from '../components/Charts'
import { TableInfoChart } from '../components/TableInfoChart'

var colorList = []

export const Statistics = ({chartData, getData, loading, setDefaultChart, defaulChart}) => {

    const [chartsData, setChartsData] = useState([])
    const [chartSelected, setChartSelected] = useState('')
    const [updateChild, setUpdateChild] = useState(0)

    useEffect(() => {
        setChartSelected(defaulChart)
    }, [])

    useEffect(() => {
        setChartsData(chartData)
    }, [chartData])

    useEffect(() => {
        filterChart()
        setUpdateChild(old => old + 1)
        setDefaultChart(chartSelected)
    }, [chartSelected])

    const getColorForChart = (idx) => {
        const colors = getRandomColor(chartsData[idx].values)
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
                                <label className="label is-small" style={{paddingRight: 10, paddingTop: 5}}>Filtrar gráfico por: </label>
                                <select value={chartSelected} onChange={(e) => setChartSelected(e.target.value)}>
                                    <option value='' selected>Todos</option>
                                    {
                                        chartData.map((item, i) => (
                                            item.values.length > 0 && <option key={i} value={item.title}>{item.title}</option>
                                        ))
                                    }
                                </select>
                                <button className={`button is-link ml-1 ${loading && 'is-loading'}`} onClick={()=> getData()}>Refrescar Datos</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="columns is-multiline">
                {
                    chartsData.map((chart, i) => (
                        chart.values.length >0 &&
                            <div className={`${chartsData.length===1 ? 'column is-8 m-2': 'column is-6'}`} key={i}>
                            <div className="columns m-0 card-chart">
                                <div className="column">
                                    <div>
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
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
