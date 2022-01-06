import React from 'react'
import './table.css'
function Table({countries}) {
    return (
        <div className="table">
            {countries.map(({country,active}) =>(
                <tr>
                    <td>{country}</td>
                    <td><h3>{active}</h3></td>
                </tr>
            ))}
        </div>
    )
}

export default Table
