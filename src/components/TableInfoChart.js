import React, {useState, useEffect} from 'react'
import ReactTooltip from 'react-tooltip'
import { CircleSVG } from '../commons/CircleSVG'

export const TableInfoChart = ({data, colorList}) => {

    const [dataTable, setDataTable] = useState(data)
    const [totalData, setTotalData] = useState(0)

    useEffect(() => {
        getTotal()
        console.log('colorList', colorList)
    }, [])

    const getTotal = () => {
        let sum = 0
        dataTable.values.forEach(val => {
            sum = Number(sum) + Number(val.data)
        })
        setTotalData(sum)
    }

    return (
        <div>
            <div className="columns is-gapless" style={{fontSize: 12}}>
                {
                    dataTable.headTitles.map((item, i) => (
                        <div className={i === 0 ? 'is-half column' : 'column'} style={{borderBottom: '1px solid #e9e9e9'}}>
                            <p style={{textAlign: i === 0 ? 'left' : 'center'}}><strong>{item}</strong></p>
                        </div>
                    ))
                }
            </div>
                {
                    dataTable.values.map((item, i) => (
                        item !== undefined &&
                        <div className="columns is-gapless" style={{fontSize: 12, marginBottom: 2, borderBottom: '1px dotted #e9e9e9'}}>
                        <>
                            <div className="is-half column">
                                <span data-for='tooltip' className="is-flex ellipsis-text" data-tip={item.labels}>
                                        <CircleSVG color={colorList?.backgroundColor[i]} border={colorList?.borderColor[i]}/>{item.labels}
                                </span>
                                <ReactTooltip id='tooltip' getContent={(dataTip) => `${dataTip}`}/>
                            </div>
                            <div className="column"><p style={{textAlign: 'center'}}>{item.data}</p></div>
                        </>
                        </div>
                    ))
                }
                <div className="columns is-gapless" style={{backgroundColor: '#e9e9e9'}}>
                    <div className="column">
                        <strong style={{fontSize: 12}}>Total</strong>
                    </div>
                    <div className="column">
                        <p style={{textAlign: 'center'}}>
                            <strong style={{fontSize: 12}}>{totalData}</strong>
                        </p>
                    </div>
                </div>
        </div>
    )
}
