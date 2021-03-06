import React, { useEffect, useState } from 'react'
import { useUsuario } from '../context/ususario-context';
import electoralProcessService from '../services/electroralProcesService'
import { Statistics } from './Statistics'

const StatisticsByCriteria = (props) => {

    const {usuario} = useUsuario();
    const [chartData, setChartData] = useState([])
    const [resultsPolls, setResultsPolls] = useState({})

    useEffect(()=> {
        getInfoPollByParticipation()
    }, [usuario])

    useEffect(() => {
        if (!!resultsPolls?.populationCountDTO) {
            getPopulation()
            getElctoralProcess()
        }
    }, [resultsPolls])

    useEffect(() => {
        if (chartData.length > 0) {
        }
    }, [chartData])

    const getInfoPollByParticipation = (id) => {
        electoralProcessService.getFindElectoralProcessInformationById(id).then(res => {
            setResultsPolls(res.data)
        })
    }

    const getPopulation = () => {
        const dataPopulation = {
            title: 'Reporte de Abstinecia',
            headTitles: ['Tipo', 'Cantidad'],
            values: [
                {labels: 'Sufragantes', data: resultsPolls?.populationCountDTO?.votes},
                {labels: 'Abstención', data: resultsPolls?.populationCountDTO?.population},
            ]
        }
        setChartData(old => ([
            ...old,
            dataPopulation
        ]))
    }

    const getElctoralProcess = () => {
        const dataPopulation = {
            title: 'Reporte de Abstinecia por Sexo',
            headTitles: ['Hombres', 'Mujeres'],
            values: [
                {labels: 'Hombres', data: resultsPolls?.populationCountDTO?.votes + 15},
                {labels: 'Mujeres', data: resultsPolls?.populationCountDTO?.population + 3},
            ]
        }
        setChartData(old => ([
            ...old,
            dataPopulation
        ]))
    }

    return (
        <div>
            <Statistics chartData={chartData} key={chartData}/>
        </div>
    )
}

export default StatisticsByCriteria;
