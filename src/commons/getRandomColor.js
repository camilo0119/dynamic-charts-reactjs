const getRandomColor = (dataArr) => {
    if (dataArr.length > 0) {
        let backgroundColor = []
        let borderColor = []
        let dataColor = {}
        dataArr.forEach(p => {
            dataColor = getColor()
            backgroundColor.push(dataColor.backgroundColor)
            borderColor.push(dataColor.borderColor)
        })
        return {
            backgroundColor,
            borderColor
        }
    }
}

const getColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return {
        backgroundColor: 'rgb(' + r + ',' + g + ',' + b + ',0.8)',
        borderColor: 'rgb(' + r + ',' + g + ',' + b + ',1)'
    }
}

export default getRandomColor;