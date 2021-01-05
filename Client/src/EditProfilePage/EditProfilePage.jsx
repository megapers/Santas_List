import React, { Component } from 'react';
import {userService, authenticationService} from '@/_services';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import Moment from 'moment';
import MapContainer from '../_services/maps.service';

class EditProfilePage extends React.Component {
  constructor(props){
    super(props);
    
    this.state={//add id to pass to the update function
      formData: {
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
      },
      
    };
    this.user = authenticationService.currentUserValue;
  }
  
  componentDidMount() {
    this._loadUserData(this.user.id);
 }

 _loadUserData(id) {
   // fetch data and update state
   userService.getUserById(id)
   .then(json => this.setState({ formData: json }));
  }

  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  }
  
  render() {
    const dt = this.state.formData;
    if(this.user.id != 0){
      return (
        this.renderData(dt)
      )
    }
    return(<div>Loading data...</div>)
  }

  handleSubmit = () => {
    //console.log(this.state.formData);
    const data = this.state.formData;
    data.latitude = parseFloat(data.latitude);
    data.longitude = parseFloat(data.longitude);
    userService.updateProfile(data)
      .catch(function (error) {
        alert(error);
      });
    alert("Profile with id " + this.state.formData.id + " is updated!");
    localStorage.setItem('currentUser', JSON.stringify(this.state.formData));
  }

  renderData(formData){
    return (
     
        <div className="row">
          <div className="col-md-3">
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
              onError={errors => console.log('Error:' + errors)}
            >
              <h2>Profile</h2>
              <br/>
              <TextValidator
                label="First Name"
                onChange={this.handleChange}
                name="firstName"
                value={formData.firstName}
                validators={['required']}
                errorMessages={['First Name is required!']}
                variant ="outlined"
              />
              <br/>
              <TextValidator
                label="Last Name"
                onChange={this.handleChange}
                name="lastName"
                value={formData.lastName}
                validators={['required']}
                errorMessages={['Last Name is required!']}
                variant ="outlined"
              />
              <br/>
              <TextValidator
                label="Username"
                onChange={this.handleChange}
                name="username"
                value={formData.username}
                validators={['required']}
                errorMessages={['Username is required!']}
                variant ="outlined"
              />
              <br/>
              <TextValidator
                label="Email"
                onChange={this.handleChange}
                name="email"
                type="email"
                value={formData.email}
                variant ="outlined"
              />
              <br/>
              <TextValidator
                label="Role"
                onChange={this.handleChange}
                name="role"
                value={formData.role}
                variant ="outlined"
                disabled = {true}
              />
              <br/>
              <TextValidator
                label="Birth Date"
                onChange={this.handleChange}
                name="birthDate"
                InputLabelProps={{ shrink: true }}
                value = {Moment(formData.birthDate).format('YYYY-MM-DD')}
                type = "date"
                variant ="outlined"
              />
              <br/>
              <TextValidator
                label="Street"
                onChange={this.handleChange}
                name="street"
                value={formData.street}
                variant ="outlined"
              />
              <br/>
              <TextValidator
                label="City"
                onChange={this.handleChange}
                name="city"
                value={formData.city}
                variant ="outlined"
              />
              <br/>
              <TextValidator
                label="Province"
                onChange={this.handleChange}
                name="province"
                value={formData.province}
                variant ="outlined"
              />
              <br/>
              <TextValidator
                label="Postal Code"
                onChange={this.handleChange}
                name="postalCode"
                value={formData.postalCode}
                variant ="outlined"
              />
              <br/>
              <TextValidator
                label="Latitude"
                onChange={this.handleChange}
                name="latitude"
                value={formData.latitude}
                type="number"
                variant ="outlined"
              />
              <br/>
              <TextValidator
                label="Longitude"
                onChange={this.handleChange}
                name="longitude"
                value={formData.longitude}
                type="number"
                variant ="outlined"
              />
              <br/> 
              <Button
                color="primary"
                variant="contained"
                type="submit"
                //disabled={submitted}
              >
                Submit
              </Button>
            </ValidatorForm>
          </div>
          <div className="col-md-8">
            <MapContainer key = {formData.latitude, formData.longitude} lat = {formData.latitude} long = {formData.longitude}/>
          </div>
        </div>
     
    );
  }
}

const style = {
  margin: 15,
};
export {EditProfilePage};