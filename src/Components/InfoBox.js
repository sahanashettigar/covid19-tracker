import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import './InfoBox.css'

function InfoBox({title,cases,active,total,...props}) {
    return (
        <Card
        onClick={props.onClick}
         className={`infoBox ${active && "infoBox--selected"}`}>
            <CardContent>
                {/*title,number of cases, total*/}
                <Typography className='infoBox__title' color='textSecondary'>
                    {title}
                </Typography>
                <h2 className='infoBox__cases'>{cases}</h2>
                <Typography color='textPrimary' className='infoBox__total'>Total : {total}</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
