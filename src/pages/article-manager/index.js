import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import {makeRequest} from '../../services/fetch'
import ItemDialog from './components/ItemDialog'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {TaskTabRow} from './components/TaskTabRow'

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


class PageArticleManager extends Component {
    constructor(props){
        super(props)
        this.state = {
          allArticles:[],
          loaded:false,
          userAuth:true,
        }
    }

    async componentWillMount() {
      this.refreshTaskList()
    }

    refreshTaskList = async () => {
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

                 {/* {this.state.loaded ? <CardHolder editAuth={this.state.userAuth} allArticles={this.state.allArticles} /> : null}  */}
                
                 <Paper className={classes.root}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell >Name</TableCell>
                        <TableCell >Description</TableCell>
                        <TableCell >Url</TableCell>
                        <TableCell >Image</TableCell>
                        <TableCell >Options</TableCell>
                        <TableCell padding="none"><ItemDialog onUpdate={this.refreshTaskList} color='primary' variant='contained'/></TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {this.state.loaded ? this.state.allArticles.map(row => <TaskTabRow key={row._id} onRefresh={this.refreshTaskList} propsOb={row}/>) : null}
                    </TableBody>
                  
                  </Table>
                </Paper>

              </main>
            </Fragment>
          );
    }
  
}


export default withStyles(styles)(PageArticleManager);

