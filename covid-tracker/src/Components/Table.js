import React from 'react'
import './table.css'
import numeral from 'numeral'
function Table({countries}) {
    return (
        <div className="table">
            {countries.map(({country,active}) =>(
                <tr>
                    <td>{country}</td>
                    <td><h3>{numeral(active).format("+0.0a")}</h3></td>
                </tr>
            ))}
        </div>
    )
}

export default Table
