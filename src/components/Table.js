import React, { Fragment } from "react";

function Table(props) {
  const {mapData, editRow, deleteRow, changeSort} = props
  const {title, heading, data} = mapData
  return (
    <Fragment>
    <h4>{title}</h4>
    <table>
      <thead>
        <tr>
          {heading && heading.map((title, index) => {
            return (<th key={'cell-heading'+index} colSpan={3}>
                    {index === 0 ? (
                      <button className='table-button' onClick={() => {changeSort()}}>{title.toUpperCase()}</button>
                    ) : <span>{title.toUpperCase()}</span>}
                    </th>)
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => {
          return (
            <tr key={'row'+i}>
              {row.map((val, i) => {
                return (
                  <Fragment key={'cell-value'+i}>
                    {!val.startsWith('##') && (
                      val === 'EDIT' ? (<td colSpan={3}> <button className='table-button' onClick={() => {editRow(row)}}>{val}</button></td>)
                      : val === 'DELETE' ? (<td colSpan={3}><button className='table-button' onClick={() => {deleteRow(row)}}>{val}</button></td>) :
                      <td className='cell-style' colSpan={3}>{val}</td>)}
                  </Fragment>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
    </Fragment>

  )
}

export default Table
