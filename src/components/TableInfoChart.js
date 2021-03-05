import React, {useState} from 'react'

export const TableInfoChart = ({data}) => {

    const [dataTable, setDataTable] = useState(data)

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
                        <div className="columns" style={{fontSize: 12}}>
                        <>
                            <div className="is-half column">{item.labels}</div>
                            <div className="column">{item.data}</div>
                        </>
                        </div>
                    ))
                }
        </div>
    )
}
