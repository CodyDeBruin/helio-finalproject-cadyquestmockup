import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import LoginDialog from './LoginDialog'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class NavBar extends Component {
  constructor(props){
      super(props)
      this.state = {

      }
  }
  
  render(){
     const {classes} = this.props
      return (
          <div>
            <AppBar position="static" >
              <Toolbar className={classes.root}>
                <Typography variant="h6" color="inherit" noWrap>
                  Cady Quest Example
                </Typography>
                <span className={classes.root}></span>

                <Button component={Link} to="/" color="inherit">Home</Button>

               
               { this.props.isAuth ? <Button component={Link} to="/articlemanager" color="inherit">Admin</Button> : <LoginDialog handleSubmit={this.props.loginFunc}/> }

              </Toolbar>
            </AppBar>
          </div>
        );
  } 
}


export default withStyles(styles)(NavBar)