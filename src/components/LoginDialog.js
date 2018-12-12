import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    textField: {
      width: '100%',
      padding: '4px',
    },
    flexContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    button: {
      maxWidth: '10%',
    },
    gridContainer: {
        padding: 10,
    },
    
})

class LoginDialog extends Component {
    constructor(props){
        super(props)
        const defaultData = this.props.defaultData

          this.state = {
            open: false,
            formData: {
              username:"",
              password:"",
            }
          }
    }    
    
  handleChange = name => event => {
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: event.target.value
      },
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleLogin = () => {
    this.props.handleSubmit(this.state.formData)
  }

  render() {
      const {classes, defaultData} = this.props
      const {formData} = this.state

    return (
      <div>
        <Button type="submit" color="inherit" onClick={this.handleClickOpen}>Login</Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          maxWidth='sm'
          fullWidth
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Login</DialogTitle>
            
          <DialogContent>
          
              <TextField
                id="username-input"
                label="Username"
                className={classes.textField}
                value={formData.url}
                onChange={this.handleChange('username')}
                margin="normal"
                variant="outlined"
              />

              <TextField
                type="password"
                id="password-input"
                label="Password"
                className={classes.textField}
                value={formData.img}
                onChange={this.handleChange('password')}
                margin="normal"
                variant="outlined"
              />

          </DialogContent>
          <DialogActions>

            <Button onClick={this.handleClose} color="primary">Cancel</Button>
            <Button onClick={this.handleLogin} color="primary" autoFocus>Submit</Button>

          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(LoginDialog);
