import React, { Component, createRef } from 'react'
import Chart from 'chart.js'

class BarChart extends Component {
  constructor() {
    super()
    this.chartRef = createRef()
  }

  componentDidMount() {
    const { data, title, color } = this.props
    let xAxis = Object.keys(data)
    let yAxis = Object.values(data)
    this.myChart = new Chart(this.chartRef.current, {
      type: 'bar',
      options: {
        legend:{
          labels:{
              fontColor:'white'
          }
      },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          yAxes: [
            {
              gridLines:{
                color:'rgba(255,255,255, 0.9)'
              },
              ticks: {
                min: 10000,
                max: 3500000,
              },
            },
          ],
          xAxes:[
            {
              gridLines:{
                color:'rgba(255,255,255, 0.9)'
              }
            }
          ]
        },
      },
      data: {
        labels: xAxis,
        datasets: [
          {
            label: title,
            data: yAxis,
            backgroundColor: color,
          },
        ],
      },
    })
  }

  componentDidUpdate() {
    const { data } = this.props
    this.myChart.data.labels = Object.keys(data)
    this.myChart.data.datasets[0].data =  Object.values(data)
    this.myChart.update()
  }

  render() {
    return (
      <div>
        <canvas ref={this.chartRef} />
      </div>
    )
  }
}

export default BarChart
