import React, {useState} from 'react'
import { CircleSVG } from '../commons/CircleSVG'

export const TableInfoChart = ({data, colorList}) => {

    const [dataTable, setDataTable] = useState(data)

    console.log('colorList', colorList)

    return (
        <div>
            <div className="columns" style={{fontSize: 12}}>
                {
                    dataTable.headTitles.map((item, i) => (
                        <div className={i === 0 ? 'is-half column' : 'column'}><strong>{item}</strong></div>
                    ))
                }
            </div>
                {
                    dataTable.values.map((item, i) => (
                        <div className="columns is-gapless" style={{fontSize: 12}}>
                        <>
                            <div className="is-half column">
                                <span className="is-flex">
                                    <CircleSVG color={colorList?.backgroundColor[i]} border={colorList?.borderColor[i]}/>{item.labels}
                                </span>
                            </div>
                            <div className="column"><p style={{textAlign: 'center'}}>{item.data}</p></div>
                        </>
                        </div>
                    ))
                }
        </div>
    )
}
