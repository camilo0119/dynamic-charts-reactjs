import React from 'react'

export const CircleSVG = ({color, border}) => {
    return (
        <div className="circle-icon" style={{background: color, border: `1px solid ${border}`}}><p style={{width: 10}}></p></div>
    )
}
