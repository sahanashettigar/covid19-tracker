import {Circle,Popup} from 'react-leaflet'
import React from 'react'
import numeral from 'numeral'
export const sortData=(data)=>{
    const sortedData=[...data];
    sortedData.sort((a,b)=>{
        if(a.cases>b.cases){
            return -1;//false
        }
        else{
            return 1;
        }
    })
    return sortedData; 
}
//to draw circles on the map with interactive tooltip
const casesTypeColors={
    active:{
        hex:'#CC1034',
        half_op:"rgba(204,16,52,0.5)",//opacity of border
        multiplier:300,//size of the circle
    },
    recovered:{
        hex:'#7dd71d',
        rgb:'rgb(125,215,29)',
        half_op:"rgba(125,215,29,0.5)",
        multiplier:300,
    },
    deaths:{
        hex:'#fb4443',
        rgb:'rgb(251,68,67)',
        half_op:"rgba(251,68,67,0.5)",
        multiplier:1000,
    },
}
export const showDataOnMap=(data,casesType='active')=>(
    data.map(country=>(
        <Circle 
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        pathOptions={{color: casesTypeColors[casesType].hex,
                     fillColor: casesTypeColors[casesType].hex }}
        radius={Math.sqrt(country[casesType])*casesTypeColors[casesType].multiplier}
        >
        <Popup>
            <div className="info-container">
                <div className="info-flag" style={{backgroundImage:`url(${country.countryInfo.flag})`}}></div>
                <div className='info-name'>{country.country}</div>
                <div className='info-confirmed'>Active:{numeral(country.active).format("0.0")}</div>
                <div className='info-recovered'>Recovered:{numeral(country.recovered).format("0.0")}</div>
                <div className='info-deaths'>Deaths:{numeral(country.deaths).format("0.0")}</div>
            </div>
        </Popup>
        </Circle>
    ))
)
export const prettyPrintStat=(stat)=>{
    return stat?`+${numeral(stat).format("0.0a")}`:"+0"
}