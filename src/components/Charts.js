import React, {useState} from 'react'
import {Doughnut} from '@reactchartjs/react-chart.js'

export const Charts = ({data, colorList}) => {

    const chartConfigInitial = {
        // labels: data.map(p => p.labels),
        datasets: [
            {
                data: data.map(p => p.data),
                backgroundColor: colorList?.backgroundColor,
                borderColor: colorList?.borderColor,
                borderWidth: 1,
            }
        ]
    }

    const option = {
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var meta = dataset._meta[Object.keys(dataset._meta)[0]];
              var total = meta.total;
              var currentValue = dataset.data[tooltipItem.index];
              var percentage = parseFloat((currentValue/total*100).toFixed(1));
              return currentValue + ' (' + percentage + '%)';
            },
            title: function(tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            }
          }
        },
      }

    const [chartConfigData] = useState(chartConfigInitial)

    return (
        <div>
            <Doughnut data={chartConfigData} options={option}/>
        </div>
    )
}
