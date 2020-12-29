import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import {userService} from '@/_services';
import { history } from '@/_helpers';   

export default function DeleteDialog(props) {
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () =>{
    userService.deleteUser(props.userData.id)
      .catch(function (error) {
        alert(error);
      });
      handleClose();
      history.push('/Kids');
      
      //Remove a record from Kids table on /kids page
      if(typeof props.kidIndex !== 'undefined'){
        removePeople(props.kids);
        props.onChangeValue(props.kids);
      }
      
  }
  //Remove a record from Kids table on /kids page
  const removePeople = (arr) => {
    var index = props.kidIndex;
    if (index !== -1) {
      arr.splice(index, 1);
    }
  }

  return (
    <div>
      <Button 
          variant="contained" 
          color="secondary"
          size={props.buttonSize}
          onClick={handleClickOpen}
        >
        {props.buttonText}
        <DeleteIcon  />
      </Button>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to permanently delete this account?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <strong>First name:</strong> {props.userData.firstName}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <strong>Last name:</strong> {props.userData.lastName}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <strong>Id:</strong> {props.userData.id}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleClose} 
            color="primary" autoFocus>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="secondary"
            onClick={handleDelete}
            >
            <DeleteIcon  />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}