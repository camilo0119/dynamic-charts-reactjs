import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { useUsuario } from '../context/ususario-context';
import electoralProcessService from '../services/electroralProcesService'
import { Statistics } from './Statistics'

const StatisticsByCriteria = (props) => {

    const {usuario} = useUsuario();
    const [chartData, setChartData] = useState([])
    const [resultsPolls, setResultsPolls] = useState({})
    const [loading, isLoading] = useState(false)
    const [updateKey, setUpdateKey] = useState(0)
    const [defaulChart, setDefaultChart] = useState('')

    const idEst = localStorage.getItem('estid')

    useEffect(()=> {
        if (usuario?.accessInfo?.access_token) {
            getInfoPollByParticipation()
        }
    }, [usuario])

    useEffect(() => {
        if (!!resultsPolls?.populationCountDTO) {
            getElectoralResultCount()
            getPopulation()
            getElctoralProcessGenderCensus()
            getElctoralProcessForGenderCensus('MASCULINO')
            getElctoralProcessForGenderCensus('FEMENINO')
            getElectoralResultGenderCount()
        }
    }, [resultsPolls])

    const getInfoPollByParticipation = (id = idEst) => {
        isLoading(true)
        setChartData([])
        electoralProcessService.getFindElectoralProcessInformationById(id).then(res => {
            setResultsPolls(res.data)
            isLoading(false)
            setUpdateKey(old => old+1)
        }).catch((error) => {
            isLoading(false)
            if (error.response.status === 403) {
                Swal.fire({
                    title: 'Lo sentimos!',
                    text: `Error de autenticación, no se pudo recuperar la información. ${error.response.data?.message}`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            } else {
                Swal.fire({
                    title: 'Lo sentimos!',
                    text: `${error.response.data?.message}`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        })
    }

    const getPopulation = () => {
        const dataPopulation = {
            title: 'Reporte de Participación estudiantil',
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
    
    const getGender = (gender) => {
        if (!!gender && gender.toUpperCase() === 'MASCULINO') {
            return 'Hombres'
        } else if (!!gender && gender.toUpperCase() === 'FEMENINO') {
            return 'Mujeres'
        } return 'No Definido'
    }

    const getElctoralProcessForGenderCensus = (gender) => {
        let values = []
        if (resultsPolls?.electoralProcessGenderCensus.length > 0) {
            resultsPolls?.electoralProcessGenderCensus.forEach(p => {
                if (gender.toUpperCase() === p.gender.toUpperCase()) {
                    values.push({labels: `Participación ${getGender(p.gender)}`, data: p.voteCount})   
                    values.push({labels: `Abstención ${getGender(p.gender)}`, data: p.noVote})
                }
            })
        }
        const dataPopulation = {
            title: `Reporte participación electores ${gender}`,
            headTitles: ['Género', 'Total'],
            values
        }
        setChartData(old => ([
            ...old,
            dataPopulation
        ]))
    }

    const getElctoralProcessGenderCensus = () => {
        let values = []
        if (resultsPolls?.electoralProcessGenderCensus.length > 0) {
            resultsPolls?.electoralProcessGenderCensus.forEach(p => {
                values.push({labels: `Participación ${getGender(p.gender)}`, data: p.voteCount})   
                values.push({labels: `Abstención ${getGender(p.gender)}`, data: p.noVote})
            })
        }
        const dataPopulation = {
            title: `Reporte participación por genero electores`,
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
        if (resultsPolls?.electoralResultGenderCount && resultsPolls?.electoralResultGenderCount.length > 0) {
            resultsPolls?.electoralResultGenderCount.forEach(p => {
                values.push({labels: `${getGender(p.gender)}`, data: p.count})
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
            headTitles: ['Candidato', 'Votos'],
            values
        }
        setChartData(old => ([
            ...old,
            dataPopulation
        ]))
    }

    return (
        <div>
            <Statistics 
                chartData={chartData}
                key={updateKey}
                loading={loading}
                getData={getInfoPollByParticipation}
                setDefaultChart={setDefaultChart}
                defaulChart={defaulChart}
                />
        </div>
    )
}

export default StatisticsByCriteria;
