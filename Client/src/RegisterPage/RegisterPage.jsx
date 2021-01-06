import React, { Component } from 'react';
import { authenticationService } from '@/_services';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class RegisterPage extends Component {
  constructor(props){
    super(props);
    this.state={
      formData: {
        FirstName:'',
        LastName:'',
        Username:'',
        Password:'',
        Email:'',
        BirthDate:'1990-01-01',
        Street:'',
        City:'',
        Province:'',
        PostalCode:'',
        Latitude:0,
        Longitude:0
      }
    }
  }

  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  }

  handleSubmit = () => {
    console.log('TEST');
    const kid = this.state.formData;
    kid.Latitude = parseFloat(kid.Latitude);
    kid.Longitude = parseFloat(kid.Longitude);

    authenticationService.register(kid)
      .then(
          user => {
              const { from } = this.props.location.state || { from: { pathname: "/" } };
              this.props.history.push(from);
              authenticationService.login(kid.Username, kid.Password)
              .then(
                  user => {
                      const { from } = this.props.location.state || { from: { pathname: "/" } };
                      this.props.history.push(from);
                  },
                  error => {
                      setSubmitting(false);
                      setStatus(error);
                      console.log(error);
                  }
              );
          }
            ).catch(function (error) {
          alert(error);
        });
  
  }

  render() {
    const {formData, submitted} = this.state;
    return (
      <div className="row justify-content-center">
        <div className="col-md-auto">
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log('Error:' + errors)}
          >
            <h1>Register</h1>
            <TextValidator
              label="First Name"
              onChange={this.handleChange}
              name="FirstName"
              value={formData.FirstName}
              validators={['required']}
              errorMessages={['First Name is required!']}
              variant ="outlined"
            />
            <br/>
            <TextValidator
              label="Last Name"
              onChange={this.handleChange}
              name="LastName"
              value={formData.LastName}
              validators={['required']}
              errorMessages={['Last Name is required!']}
              variant ="outlined"
            />
            <br/>
            <TextValidator
              label="Username"
              onChange={this.handleChange}
              name="Username"
              value={formData.Username}
              validators={['required']}
              errorMessages={['Username is required!']}
              variant ="outlined"
            />
            <br/>
            <TextValidator
              label="Password"
              onChange={this.handleChange}
              name="Password"
              type="password"
              value={formData.Password}
              validators={['required']}
              errorMessages={['Password is required!']}
              variant ="outlined"
            />
            <br/>
            <TextValidator
              label="Email"
              onChange={this.handleChange}
              name="Email"
              type="email"
              value={formData.Email}
              variant ="outlined"
            />
            <br/>
            <TextValidator
              label="Birth Date"
              onChange={this.handleChange}
              name="BirthDate"
              value={formData.BirthDate}
              type = "date"
              variant ="outlined"
            />
            <br/>
            <TextValidator
              label="Street"
              onChange={this.handleChange}
              name="Street"
              value={formData.Street}
              variant ="outlined"
            />
            <br/>
            <TextValidator
              label="City"
              onChange={this.handleChange}
              name="City"
              value={formData.City}
              variant ="outlined"
            />
            <br/>
            <TextValidator
              label="Province"
              onChange={this.handleChange}
              name="Province"
              value={formData.Province}
              variant ="outlined"
            />
            <br/>
            <TextValidator
              label="Postal Code"
              onChange={this.handleChange}
              name="PostalCode"
              value={formData.PostalCode}
              variant ="outlined"
            />
            <br/>
            <TextValidator
              label="Latitude"
              onChange={this.handleChange}
              name="Latitude"
              value={formData.Latitude}
              type="number"
              variant ="outlined"
            />
            <br/>
            <TextValidator
              label="Longitude"
              onChange={this.handleChange}
              name="Longitude"
              value={formData.Longitude}
              type="number"
              variant ="outlined"
            />
            <br/>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={submitted}
              >
              Register
            </Button>
          </ValidatorForm>
          <Link to="/login" className="nav-link">Cancel</Link>
        </div>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export {RegisterPage};