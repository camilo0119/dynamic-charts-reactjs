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
            getElctoralProcessGenderCensus()
            getElectoralResultGenderCount()
            getElectoralResultCount()
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
            title: 'Reporte de Participación',
            headTitles: ['Tipo', 'Cantidad'],
            values: [
                {labels: 'Participación', data: resultsPolls?.populationCountDTO?.votes},
                {labels: 'Abstención', data: resultsPolls?.populationCountDTO?.population},
            ]
        }
        setChartData(old => ([
            ...old,
            dataPopulation
        ]))
    }

    const getElctoralProcessGenderCensus = () => {
        let headTitles = [] 
        let values = []
        if (resultsPolls?.electoralProcessGenderCensus.length > 0) {
            resultsPolls?.electoralProcessGenderCensus.forEach(p => {
                values.push({labels: `Participación ${p.gender.toUpperCase() === 'MASCULINO' ? 'Hombres' : 'Mujeres'}`, data: p.voteCount})   
                values.push({labels: `Abstención ${p.gender.toUpperCase() === 'MASCULINO' ? 'Hombres' : 'Mujeres'}`, data: p.noVote})
            })
        }
        const dataPopulation = {
            title: 'Abstinecia por Género',
            headTitles: ['Género', 'Total'],
            values
        }
        setChartData(old => ([
            ...old,
            dataPopulation
        ]))
    }

    const getElectoralResultGenderCount = () => {
        let values = []
        if (resultsPolls?.electoralResultGenderCount.length > 0) {
            resultsPolls?.electoralResultGenderCount.forEach(p => {
                values.push({labels: `${p?.gender?.toUpperCase() === 'MASCULINO' ? 'Hombres' : 'Mujeres'}`, data: p.count})
            })
        }
        const dataPopulation = {
            title: 'Participación por Género',
            headTitles: ['Género', 'Total'],
            values
        }
        setChartData(old => ([
            ...old,
            dataPopulation
        ]))
    }

    const getElectoralResultCount = () => {
        let values = []
        if (resultsPolls?.electoralResultCount.length > 0) {
            resultsPolls?.electoralResultCount.forEach(p => {
                values.push({labels: p.candidate, data: p.count})
            })
        }
        const dataPopulation = {
            title: 'Resultado de Votación',
            headTitles: ['Candidato', 'Total Votos'],
            values
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
