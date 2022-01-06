import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

function InfoBox({title,cases,total}) {
    return (
        <Card className="infoBox">
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
