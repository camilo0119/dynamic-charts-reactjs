import React, {useState, useEffect} from 'react'
import ReactTooltip from 'react-tooltip'
import { CircleSVG } from '../commons/CircleSVG'

export const TableInfoChart = ({data, colorList}) => {

    const [dataTable] = useState(data)
    const [totalData, setTotalData] = useState(0)

    useEffect(() => {
        getTotal()
    }, [])

    const getTotal = () => {
        let sum = 0
        let participation = null
        let abstention = null
        dataTable.values.forEach(val => {
            if (val.labels === 'Participación' && dataTable.values.length === 2) {
                abstention = Number(val.data)
            } else if (val.labels === 'Abstención' && dataTable.values.length === 2) {
                participation = Number(val.data)
            }
            sum = Number(sum) + Number(val.data)
        })
        if (abstention !== null || participation !== null) {
            sum = participation - abstention
        }
        setTotalData(sum)
    }

    return (
        <div>
                <div className="columns is-gapless is-mobile" style={{fontSize: 12, marginBottom: 0}}>
                    {
                        dataTable.headTitles.map((item, i) => (
                            <div className={i === 0 ? 'column' : 'column is-4'} style={{borderBottom: '1px solid #e9e9e9'}}>
                                <p style={{textAlign: i === 0 ? 'left' : 'center'}}><strong>{item}</strong></p>
                            </div>
                        ))
                    }
                </div>
                <div>
                {
                    dataTable.values.map((item, i) => (
                        item !== undefined &&
                        <div className="columns is-gapless is-mobile is-flex" style={{fontSize: 12, marginBottom: 2, borderBottom: '1px dotted #e9e9e9'}}>
                            <div className="column is-half">
                                <span data-for='tooltip' className="is-flex ellipsis-text" data-tip={item.labels}>
                                    <CircleSVG color={colorList?.backgroundColor[i]} border={colorList?.borderColor[i]}/>
                                    <p className="ellipsis-text">{item.labels.slice(0, 16)}</p>
                                </span>
                                <ReactTooltip id='tooltip' getContent={(dataTip) => `${dataTip}`}/>
                            </div>
                            <div className="column is-4"><p style={{textAlign: 'right'}}>{item.data}</p></div>
                        </div>
                    ))
                }
                </div>
                <div className="columns is-gapless is-mobile" style={{backgroundColor: '#e9e9e9'}}>
                    <div className="column">
                        <strong style={{fontSize: 12}}>Total</strong>
                    </div>
                    <div className="column is-4">
                        <p style={{textAlign: 'center'}}>
                            <strong style={{fontSize: 12, paddingRight: 8}}>{totalData}</strong>
                        </p>
                    </div>
                </div>
        </div>
    )
}
