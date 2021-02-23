export const dashboardTitle = 'Oppurtunities Sales Dashboard'
export const groupOptionText = 'ANALYSIS ACCORDING TO SUPPLY GROUPS'
export const regionOptionText = 'ANALYSIS ACCORDING TO REGIONS'
export const tabularViewText = 'TABULAR VIEW DATA ANALYSIS'
export const groupOptions = [
  {
    category: 'supplyGroup',
    title: 'SUPPLIERS SUB GROUP WISE WIN LOSS RATION',
    param1: 'suppliesSubgroup',
    param2: 'opportunityRes'
  }
]
export const regionOption = [
  {
    category: 'region',
    title: 'SUPPLIERS GROUP VS OPPURTUNITY AMT',
    param1: 'suppliesGroup',
    param2: 'opportunityAmount'
  }
]
export const tableData = {'Supply Group': [{ category: 'tabularView', value: 'suppliesGroup', title: 'SUPPLY GROUP WISE DATA'}],
                          'Supply SubGroup': [{ category: 'tabularView', value: 'suppliesSubgroup', title: 'SUPPLY SUB GROUP WISE DATA'}],
                          'Region': [{ category: 'tabularView', value: 'region', title: 'REGION WISE DATA'}],
                          'Route To Market': [{ category: 'tabularView', value: 'routeToMarket', title: 'ROUTE TO MARKET WISE DATA'}]
                        }
