import React, { createRef, Component } from 'react'
import Chart from 'chart.js'

class Doughnut extends Component {
  constructor() {
    super()
    this.chartRef = createRef()
  }

  componentDidUpdate() {
      const {data, title} = this.props
      this.myChart.data.labels = ['win - '+ data.winPercent + '%', 'loss - ' + data.lossPercent + '%']
      this.myChart.data.datasets[0].data = [data.winPercent, data.lossPercent]
      this.myChart.options.title.text = title
      this.myChart.update()
  }

  componentDidMount() {
    const { data, title, colors } = this.props
    this.myChart = new Chart(this.chartRef.current, {
      options:{
          segmentShowStroke: false,
          maintainAspectRatio: false,
          legend:{
              labels:{
                  fontColor:'white'
              }
          },
          title: {
            display: true,
            text: title
          }
        },
      type: 'doughnut',
      data: {
        labels: ['win - '+ data.winPercent + '%', 'loss - ' + data.lossPercent + '%'],
        datasets: [
          {
            data: [data.winPercent, data.lossPercent],
            backgroundColor: colors,
            borderWidth: [0, 0, 0, 0],
          },
        ],
      },
    })
  }

  render() {
    return <canvas ref={this.chartRef} />
  }
}

export default Doughnut
