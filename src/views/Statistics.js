import React, {useEffect, useState} from 'react'
import { Charts } from '../components/Charts'
import { TableInfoChart } from '../components/TableInfoChart'

export const Statistics = () => {

    const chartDataMock = [
        {
            title: 'Estadísticas Candidatos por sexo',
            headTitles: ['Candiatos por Género', 'Sexo'],
            values: [
                {labels: 'No Realizado', data: 1000},
                {labels: 'Realizado', data: 50},
            ]
        },
        {
            title: 'Cualquier titulo',
            headTitles: ['Votos por Hombres', ''],
            values: [
                {labels: 'Votaron', data: 250},
                {labels: 'No votaron', data: 48},
            ]
        },
        {
            title: 'Lo que sea',
            headTitles: ['Votos por Mujeres', 'Sexo'],
            values: [
                {labels: 'Votaron', data: 10},
                {labels: 'No votaron', data: 75},
                {labels: 'NA', data: 10},
            ]
        },
    ]

    const [chartsData, setChartsData] = useState(chartDataMock)

    useEffect(() => {
        getApi()
    }, [])

    const getApi = () => {
        console.log('Consumir api y armar estructura JSON')
    }
 
    return (
        <div>
            <div className="columns is-multiline is-glapsess">
                {
                    chartsData.map(chart => (
                        <div className="column is-6">
                            <header className="card-header">
                                {chart.title}
                            </header>
                            <div className="card-content">
                                <div className="columns content">
                                    <div className="column">
                                        <Charts data={chart.values}/>
                                    </div>
                                    <div className="column">
                                        <TableInfoChart data={chart}/>
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
