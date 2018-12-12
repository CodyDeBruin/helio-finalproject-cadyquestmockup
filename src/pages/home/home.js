import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import {CardHolder} from './components/cardholder'
import {makeRequest} from '../../services/fetch'
import ItemDialog from './components/ItemDialog'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});


class PageHome extends Component {
    constructor(props){
        super(props)
        this.state = {
          allArticles:[],
          loaded:false,
          userAuth:false,
        }
    }

    async componentWillMount() {
      await makeRequest('articles/', 'GET') 
      .then(resp=>resp.json())
      .then(val=>this.setState({allArticles: val.msg.msg, loaded:true}))
      .catch(err=>console.log(err))
    }

    render(){
        const classes = this.props.classes
        return (
            <Fragment>
              <main>
                <div className={classes.heroUnit}>
                  <div className={classes.heroContent}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                      Ben's Quest tracker
                    </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" paragraph>
                      {/* Genesis 1:27 'So God created humankind in his image, in the image of God he created them; male and female he created them.' */}
                      Luke 1:37 'For nothing will be impossible with God'
                    </Typography>

                    <div className={classes.heroButtons}>

                      <Grid container spacing={16} justify="center">
                      
                        { this.state.userAuth ?
                        <Grid item>
                          <ItemDialog color="primary" variant="contained" />
                        </Grid>
                        : null}

                        {/* <Grid item>
                          <Button variant="outlined" color="primary">
                            Secondary action
                          </Button>
                        </Grid> */}

                      </Grid>
                    </div>
                  </div>
                </div>
                <div className={classNames(classes.layout, classes.cardGrid)}>

                 {this.state.loaded ? <CardHolder editAuth={this.state.userAuth} allArticles={this.state.allArticles} /> : null} 
                </div>
              </main>
            </Fragment>
          );
    }
  
}


export default withStyles(styles)(PageHome);

