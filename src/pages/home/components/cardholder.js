import React from 'react'
import Grid from '@material-ui/core/Grid';
import ItemCard from './ItemCard'

export const CardHolder = (props) => {

    return(
        <Grid container spacing={40} alignContent='center'>
            {props.allArticles.map((card, idx) => (<Grid item key={idx}><ItemCard editAuth={props.editAuth} cardContent={card} /></Grid>  ))}
        </Grid>
    )
}