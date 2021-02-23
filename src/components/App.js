import React, { Component } from 'react'
import BarChart from './BarChart'
import Doughnut from './Doughnut'
import Table from './Table'
import Chart from 'chart.js'

import { analysisParameters, oppurtunityData } from '../data'
import { dashboardTitle } from '../text-asserts/constants.js'

import tireswheels from '../icons/alloy-wheel.svg'
import caraccessories from '../icons/repair-tool.svg'
import performancenonauto from '../icons/speedometer.svg'
import carelectronics from '../icons/battery.svg'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: analysisParameters,
      oppurtunityData: oppurtunityData
    }
    this.showMap = this.showMap.bind(this)
    this.renderRevenueVSGroup = this.renderRevenueVSGroup.bind(this)
    this.renderSubGroupWinLossRation = this.renderSubGroupWinLossRation.bind(this)
    this.renderTable = this.renderTable.bind(this)
    this.changeSort = this.changeSort.bind(this)
    this.deleteRow = this.deleteRow.bind(this)
    this.editRow = this.editRow.bind(this)
  }

  componentDidMount() {
    Chart.defaults.global.defaultFontColor = '#FFF'
    Chart.defaults.global.defaultFontFamily = 'serif'
    }

showMap(key, variants) {
   if(variants[0].category === 'region') {
     this.renderRevenueVSGroup(key, variants)
   } else if(variants[0].category === 'supplyGroup') {
      this.renderSubGroupWinLossRation(key, variants)
   } else if(variants[0].category === 'tabularView') {
       this.renderTable(variants[0].title, variants[0].value)
   }
 }

 renderSubGroupWinLossRation(key, variants) {
   const data = this.state.oppurtunityData
   let subGroupWinLossData = {}
   data.map(d => {
     if(d.suppliesGroup === key) {
      if(subGroupWinLossData[d.suppliesSubgroup]) {
        if(d.opportunityRes === 'Won') {
          subGroupWinLossData[d.suppliesSubgroup].win += 1
        } else if(d.opportunityRes === 'Loss') {
          subGroupWinLossData[d.suppliesSubgroup].loss += 1
        }
      } else {
        subGroupWinLossData[d.suppliesSubgroup] = {win: 0, loss: 0}
        if(d.opportunityRes === 'Won') {
          subGroupWinLossData[d.suppliesSubgroup].win = 1
        } else if(d.opportunityRes === 'Loss') {
          subGroupWinLossData[d.suppliesSubgroup].loss = 1
        }
      }
    }
   })
   let subGroupWinLoss = []
   for(let subgroup in subGroupWinLossData) {
     let subGroup = subGroupWinLossData[subgroup]
     let total = subGroup.win + subGroup.loss
     subGroup.winPercent = ((subGroup.win/total)*100).toFixed(2)
     subGroup.lossPercent = ((subGroup.loss/total)*100).toFixed(2)
     subGroup.key = subgroup
     subGroupWinLoss.push(subGroup)
   }
   this.setState({isChartData: true})
   this.setState({isBarGraph: false})
   this.setState({isPieChart : true, mapData: {title: variants[0].title, data: subGroupWinLoss}})
 }

 renderRevenueVSGroup(key, variants) {
   const data = this.state.oppurtunityData
   let revenueForEachGroup = {}
   data.map(d => {
     if(d.region === key) {
       if(revenueForEachGroup[d.suppliesGroup]) {
         revenueForEachGroup[d.suppliesGroup] += parseInt(d.opportunityAmount)
       } else {
         revenueForEachGroup[d.suppliesGroup] = parseInt(d.opportunityAmount)
       }
     }
     })
     this.setState({isChartData: true})
     this.setState({isPieChart: true})
     this.setState({isBarGraph : true, mapData: {title: variants[0].title, data: {...revenueForEachGroup}}})
 }

 renderTable(title, param) {
   const data = this.state.oppurtunityData
   let tableData = []
   data.forEach(item => {
     tableData.push(['##'+item['opportunityNum'], item[param], item['opportunityAmount'], item['competitorType'], item['dealSizeCategory'], item['shouldEdit'] && 'EDIT', item['canDelete'] && 'DELETE'])
   })

   tableData.sort(function(a,b) {
      var x = a[1].toLowerCase()
      var y = b[1].toLowerCase()
      return x < y ? -1 : x > y ? 1 : 0
      // return x < y ? 1 : x > y ? -1 : 0
    })
    // tableData.unshift([param, 'opportunityAmount', 'competitorType', 'dealSizeCategory', '', ''])
    const tableHeading = [param, 'opportunityAmount', 'competitorType', 'dealSizeCategory', '', '']
    this.setState({isChartData: false})
    this.setState({isTableView : true, isTableDataSorted: true, mapData: {title: title, heading: tableHeading, data: tableData}})
 }

changeSort() {
    const tableData = this.state.mapData.data
    const isAscendingSort = this.state.isTableDataSorted
    if(isAscendingSort) {
      tableData.sort(function(a,b) {
         var x = a[1].toLowerCase()
         var y = b[1].toLowerCase()
         return x < y ? 1 : x > y ? -1 : 0
       })
        this.setState({isTableDataSorted: false})
        this.setState(prevState => ({
          mapData: {
              ...prevState.mapData,
              data: tableData
          }
      }))
    } else {
      tableData.sort(function(a,b) {
         var x = a[1].toLowerCase()
         var y = b[1].toLowerCase()
         return x < y ? -1 : x > y ? 1 : 0
       })
       this.setState({isTableDataSorted: true})
       this.setState(prevState => ({
         mapData: {
             ...prevState.mapData,
             data: tableData
         }
     }))
    }
  }

deleteRow(row) {
    let id = row[0].replace('##', '')
    const data = this.state.oppurtunityData
    let isFound = false
    let dataIndex = 0
    data.map((d, index)=> {
      if(d.opportunityNum === id) {
        isFound = true
        dataIndex = index
      }
    })
    if(isFound) {
      data.splice(data.indexOf(dataIndex), 1)
      this.setState({oppurtunityData: data})
    }
  }

editRow(row) {
    //todo
}

  render() {
    const options = this.state.options
    const pieChartData = this.state.isChartData && this.state.isPieChart ? this.state.mapData.data : ''
    return (
      <div className='app'>
        <div className='title animation'>
          <h1>{dashboardTitle}</h1>
        </div>
        <div className='options-container'>{options.length > 0 && options.map((option, index) => {
          const keys = Object.keys(option.options)
          return (
            <div key={option.title+index+'container'} className='dropdown animation'>
              <button className='dropbtn' key={option.title+index}>{option.title}</button>
              <div className='dropdown-content'>
                {keys && keys.length > 0 && keys.map((key, index) => {
                  const svgKey = key.replaceAll(' ', '').replace('&', '').replace('-','').toLowerCase()
                  return (
                  <a key={key+index} onClick={() => this.showMap(key, option.options[key])}><span>{key}</span>
                  {option.isSVG && (svgKey === 'caraccessories' ? <img className='icon' src={caraccessories} alt={'car accessories'}/> :
                                    svgKey === 'carelectronics' ? <img className='icon' src={carelectronics} alt={'car electronics'}/> :
                                    svgKey === 'tireswheels' ? <img className='icon' src={tireswheels} alt={'tires and wheels'}/> :
                                    svgKey === 'performancenonauto' ? <img className='icon' src={performancenonauto} alt={'performance and nonauto'}/> : null
                                    )}
                  </a>
                  )
                })}
              </div>
            </div>
          )
        })}</div>
        {this.state.isChartData && this.state.isBarGraph && (
          <div className='sub chart-wrapper'>
            <BarChart
              data={this.state.mapData.data}
              title={this.state.mapData.title}
              color='#D57BB8'
            />
        </div>
        )}
        <div className='flexDiv'>{pieChartData.length > 0 && pieChartData.map((data, i) => {
          return (
              <div key={'data'+i} className='sub chart-wrapper doughnut'>
                <Doughnut
                  data={data}
                  title={data.key+' win loss ratio'}
                  colors={[
                    '#20D936',
                    '#FF4F33',
                  ]}
                />
              </div>
          )
        })}
        </div>
        {!this.state.isChartData && this.state.isTableView && (
            <Table mapData={this.state.mapData}
                   editRow={this.editRow}
                   deleteRow={this.deleteRow}
                   changeSort={this.changeSort}
            />
        )}
      </div>
    )
  }
}

export default App
