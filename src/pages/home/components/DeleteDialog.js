import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {makeRequest} from '../../../services/fetch'


class DeleteDialog extends Component {
  state = {
    open: false,
  }
  
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = async () => {
    const defaultData = this.props.article._id
    
    const myURL = `articles/${ defaultData }`
    const getData = await makeRequest(myURL, 'DELETE', this.state.formData)
          .then(async resp=>{
              if(resp.ok) {
                return resp.json()
              } else throw Error("Response Failed")
          })
          .catch(err=>console.log(err))

    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button type="submit" color={this.props.color} variant={this.props.variant} onClick={this.handleClickOpen}>Delete Article</Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          maxWidth='sm'
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.article.title}</DialogTitle>

          <DialogContent>
              Are you sure you want to delete this article? 
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteDialog;
