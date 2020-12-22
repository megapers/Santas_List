import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { authenticationService } from '@/_services';

class RegisterPage extends Component {
  constructor(props){
    super(props);
    this.state={
      FirstName:'',
      LastName:'',
      Username:'',
      Password:'',
      Email:'',
      BirthDate:'1900-01-01',
      Street:'',
      City:'',
      Province:'',
      PostalCode:'',
      Latitude:0,
      Longitude:0
    }
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           />
           <form onSubmit={this.handleSubmit}>
           <TextField
             id="standard-required"
             required={true}
             label="Required"
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({FirstName:newValue})}
            />
           <br/>
           <TextField
              id="standard-required"
              required={true}
              label="Required"
              hintText="Enter your Last Name"
              floatingLabelText="Last Name"
              onChange = {(event,newValue) => this.setState({LastName:newValue})}
            />
           <br/>
           <TextField
              id="standard-required"
              required={true}
              label="Required"
              hintText="Enter username"
              floatingLabelText="Username"
              onChange = {(event,newValue) => this.setState({Username:newValue})}
            />
           <br/>
           <TextField
              id="standard-required"
              required={true}
              label="Required"
              type = "password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange = {(event,newValue) => this.setState({Password:newValue})}
            />
           <br/>
           <TextField
             type = "email"
             hintText="Enter your Email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({Email:newValue})}
            />
           <br/>
           <TextField
             floatingLabelText='Birthday'
             type = "date"
             defaultValue="1900-01-01"
             onChange = {(event,newValue) => this.setState({BirthDate:newValue})}
            />
           <br/>
           <TextField
             hintText="Enter your street"
             floatingLabelText="Street"
             onChange = {(event,newValue) => this.setState({Street:newValue})}
            />
           <br/>
           <TextField
             hintText="Enter your city"
             floatingLabelText="City"
             onChange = {(event,newValue) => this.setState({City:newValue})}
            />
           <br/>
           <TextField
             hintText="Enter your province"
             floatingLabelText="Province"
             onChange = {(event,newValue) => this.setState({Province:newValue})}
            />
           <br/>
           <TextField
             hintText="Enter your postal code"
             floatingLabelText="Postal Code"
             onChange = {(event,newValue) => this.setState({PostalCode:newValue})}
            />
           <br/>
           <TextField
             hintText="Enter your latitude"
             floatingLabelText="Latitude"
             onChange = {(event,newValue) => this.setState({Latitude:parseFloat(newValue)})}
            />
           <br/>
           <TextField
             hintText="Enter your longitude"
             floatingLabelText="Longitude"
             onChange = {(event,newValue) => this.setState({Longitude:parseFloat(newValue)})}
            />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} 
            
            onClick={() => {
                //authenticationService.register(this.state.first_name, this.state.last_name, this.state.username, this.state.password)
                authenticationService.register(this.state)
                    .then(
                        user => {
                            const { from } = this.props.location.state || { from: { pathname: "/" } };
                            this.props.history.push(from);
                            authenticationService.login(this.state.Username, this.state.Password)
                            .then(
                                user => {
                                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                                    this.props.history.push(from);
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                        }
                    ).catch(function (error) {
                        alert(error);
                      });
                }
            }/>
            </form>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export {RegisterPage};