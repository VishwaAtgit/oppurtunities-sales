import dataModel from './content'
import {groupOptionText, regionOptionText, tabularViewText,
  groupOptions, regionOption, tableData
  } from '../text-asserts/constants'

export const oppurtunityData = dataModel.oppurtunityData
export const analysisParameters = getparameters(oppurtunityData)

function getparameters(array) {
  const groups = {}
  const regions = {}
  array.forEach(function(i) {
    if(!groups[i.suppliesGroup]) {
      groups[i.suppliesGroup] = groupOptions
    }
    if(!regions[i.region]) {
      regions[i.region] = regionOption
    }
  })

  return [
    {title: groupOptionText, options: groups, isSVG: true},
    {title: regionOptionText, options: regions},
    {title: tabularViewText, options: tableData}
  ]
}
