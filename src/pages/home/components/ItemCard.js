import React, { Component,Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ItemDialog from './ItemDialog'
import DeleteDialog from './DeleteDialog'


const styles = theme => ({
  card: {
    width: '300px',
  },
})

class ItemCard extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        const props = this.props.cardContent
        return (
            <Fragment>
                        <Card raise className={this.props.classes.card}>
                          {/* <CardMedia image={props.img} title={props.title}/> */}
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                              {props.title}
                            </Typography>
                            <Typography>
                              {props.desc}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            
                            { this.props.editAuth ? 
                            <Fragment>
                              <DeleteDialog color="secondary" article={props}/>
                              <ItemDialog defaultData={props}/>
                            </Fragment>
                            : null
                            }

                            {props.url ? <Button component='a' size="small" color="primary" variant="contained" href={props.url}>
                              Help
                            </Button> : null}
                          </CardActions>
                        </Card>
            </Fragment>
          );
    }
  
}

export default withStyles(styles)(ItemCard);
