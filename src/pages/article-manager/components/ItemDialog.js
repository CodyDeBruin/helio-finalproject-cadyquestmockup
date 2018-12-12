import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';



import {makeRequest} from '../../../services/fetch'

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

class ItemDialog extends Component {
    constructor(props){
        super(props)
        const defaultData = this.props.defaultData

        if(defaultData) {
          this.state = {
            open: false,
            formData: {
              title: defaultData.title,
              url: defaultData.url,
              desc: defaultData.desc,
              img: defaultData.image,
            }
          }
        } else {
          this.state = {
            open: false,
            formData: {
              title:"",
              url:"",
              desc:"",
              img:"",
            }
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

  handleSubmit = async () => {
    const defaultData = this.props.defaultData
    const myURL = `articles/${ defaultData ? defaultData._id : '' }`
    await makeRequest(myURL, defaultData ? 'PUT' : 'POST', this.state.formData)
          .then(async resp=>{
              if(resp.ok) {
                return resp.json()
              } else throw Error("Response Failed")
          })
          .catch(err=>console.log(err))

    this.props.onUpdate()

    this.setState({ 
        formData: {
          title:"",
          url:"",
          desc:"",
          img:"",
        }, 
        open: false 
      });
  };

  render() {
      const {classes, defaultData} = this.props
      const {formData} = this.state

    return (
      <div>
        <Button type="submit" color={this.props.color} variant={this.props.variant} onClick={this.handleClickOpen}>{defaultData ? "Edit Task" : "Create Task" }</Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          maxWidth='sm'
          fullWidth
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{defaultData ? defaultData.title : "New Task"}</DialogTitle>
            
          <DialogContent>
            
          <Grid container spacing={40} direction='column' className={classes.gridContainer}>
              <TextField
                id="title-input"
                label="Title"
                className={classes.textField}
                value={formData.title}
                onChange={this.handleChange('title')}
                margin="normal"
                variant="outlined"
              />

              <TextField
                id="desc-multiline-input"
                label="Task description"
                className={classes.textField}
                multiline
                rows="4"
                value={formData.desc}
                onChange={this.handleChange('desc')}
                margin="normal"
                variant="outlined"
              />

              <TextField
                id="url-input"
                label="Article URL"
                className={classes.textField}
                value={formData.url}
                onChange={this.handleChange('url')}
                margin="normal"
                variant="outlined"
              />

              <TextField
                id="image-input"
                label="Image URL"
                className={classes.textField}
                value={formData.img}
                onChange={this.handleChange('img')}
                margin="normal"
                variant="outlined"
              />
            </Grid>

          </DialogContent>
          <DialogActions>

            <Button onClick={this.handleClose} color="primary">Cancel</Button>
            <Button type="submit" onClick={this.handleSubmit} color="primary" autoFocus>Submit</Button>

          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(ItemDialog);
