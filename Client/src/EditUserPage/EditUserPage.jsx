import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Checkbox } from 'material-ui';
import {userService} from '@/_services';
import MapContainer from "@/MapContainer";

class EditUserPage extends React.Component {
  constructor(props){
    super(props);
    
    this.state={//add id to pass to the update function
      data: {
        id: 0,
        birthDate: '',
        city: '',
        email: '',
        firstName: '',
        isNaughty: false,
        lastName: '',
        latitude: 0,
        longitude: 0,
        postalCode: '',
        province: '',
        role: '',
        street: '',
        username: ''
      }
    };
  }

  componentDidMount() {
    this._loadUserData(this.props.location.state);
 }

 _loadUserData(id) {
   // fetch data and update state
   userService.getUserById(id)
   .then(json => this.setState({ data: json }))
  }
  
  render() {
    const dt = this.state.data;
    
    if(dt.id != 0){

      return (
        this.rendetData(dt)
      )

    }
    return(<div>Loading data...</div>)
  }

  rendetData(dt){
    return(
    <div className="container">
        <div className="row">
          <div className="col-xs-6">
            <MuiThemeProvider>
              <div>
              <form onSubmit={this.handleSubmit}>
              <TextField
                id='name'
                floatingLabelText="First Name"
                value={dt.firstName}
                  onChange = {(event,newValue) => this.setState(prevState => ({
                    data: {                  
                        ...prevState.data,    
                        firstName: newValue         
                          }
                        }
                      )
                    )
                  }
                />
              <br/>
              <TextField
                floatingLabelText="Last Name"
                value={dt.lastName}
                  onChange = {(event,newValue) => this.setState(prevState => ({
                    data: {                  
                        ...prevState.data,    
                        lastName: newValue         
                          }
                        }
                      )
                    )
                  }
                />
              <br/>
              <TextField
                floatingLabelText="Username"
                value={dt.username}
                  onChange = {(event,newValue) => this.setState(prevState => ({
                    data: {                  
                        ...prevState.data,    
                        username: newValue         
                          }
                        }
                      )
                    )
                  }
                />
              <br/>
              <TextField
                type = "email"
                floatingLabelText="Email"
                value={dt.email}
                  onChange = {(event,newValue) => this.setState(prevState => ({
                    data: {                  
                        ...prevState.data,    
                        email: newValue         
                          }
                        }
                      )
                    )
                  }
                />
              <br/>
              <TextField
                floatingLabelText= {'Birthday: '+ formatDate(dt.birthDate)}
                type = "date"
                format = "mm/dd/yyyy"
                value={dt.birthDate}
                  onChange = {(event,newValue) => this.setState(prevState => ({
                    data: {                  
                        ...prevState.data,    
                        birthDate:newValue     
                          }
                        }
                      )
                    )
                  }
                />
              <br/>
              <TextField
                floatingLabelText="Street"
                value={dt.street}
                  onChange = {(event,newValue) => this.setState(prevState => ({
                    data: {                  
                        ...prevState.data,    
                        street: newValue         
                          }
                        }
                      )
                    )
                  }
                />
              <br/>
              <TextField
                floatingLabelText="City"
                value={dt.city}
                  onChange = {(event,newValue) => this.setState(prevState => ({
                    data: {                  
                        ...prevState.data,    
                        city: newValue         
                          }
                        }
                      )
                    )
                  }
                />
              <br/>
              <TextField
                floatingLabelText="Province"
                value={dt.province}
                  onChange = {(event,newValue) => this.setState(prevState => ({
                    data: {                  
                        ...prevState.data,    
                        province: newValue         
                          }
                        }
                      )
                    )
                  }
                />
              <br/>
              <TextField
                floatingLabelText="Postal Code"
                value={dt.postalCode}
                  onChange = {(event,newValue) => this.setState(prevState => ({
                    data: {                  
                        ...prevState.data,    
                        postalCode: newValue         
                          }
                        }
                      )
                    )
                  }
                />
              <br/>
              <TextField
                floatingLabelText="Latitude"
                value={dt.latitude}
                  onChange = {(event,newValue) => this.setState(prevState => ({
                    data: {                  
                        ...prevState.data,    
                        latitude: parseFloat(newValue)         
                          }
                        }
                      )
                    )
                  }
                />
              <br/>
              <TextField
                floatingLabelText="Longitude"
                value={dt.longitude}
                  onChange = {(event,newValue) => this.setState(prevState => ({
                    data: {                  
                        ...prevState.data,    
                        longitude: parseFloat(newValue)         
                          }
                        }
                      )
                    )
                  }
                />
              <br/>
              <Checkbox
                  label="Is naughty?"
                  checked={dt.isNaughty}
                  onCheck = {(event,newValue) => this.setState(prevState => ({
                    data: {                  
                        ...prevState.data,    
                        isNaughty: newValue         
                          }
                        }
                      )
                    )
                  }
              />
              <RaisedButton label="Submit" primary={true} style={style} 
                
                onClick={() => {
                    userService.updateUser(this.state)
                      .catch(function (error) {
                            alert(error);
                          });
                          alert("Kid with id " + this.state.data.id + " is updated!");
                    }
                }/>
                </form>
              </div>
            </MuiThemeProvider>
          </div>
          <div className="col-xs-6"></div>
          <MapContainer lat = {dt.latitude} long = {dt.longitude} markerName = {dt.firstName + " lives here: " + dt.street + ", " + dt.postalCode}/>
         </div>
      </div>
    )
  }
}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [ month, day, year].join('/');
}

const style = {
  margin: 15,
};
export {EditUserPage};