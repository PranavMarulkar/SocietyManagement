import React, { Component } from 'react';
import AuthenticationService from '../../service/AuthenticationService';

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: '',
      authenticated: false,
      login: false,
    };
    //bind methods
    this.updateValues = this.updateValues.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  updateValues(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleLogin(event) {
    this.setState({ login: true });
    AuthenticationService.authenticateUser(this.state.user, this.state.pwd)
      .then((response) => {
        console.log('auth success', response);
        AuthenticationService.storeUserDetails(
          this.state.user,
          response.data.jwt
        );
        console.log(response.data.roles);
        if(response.data.roles.roleName === "ROLE_ADMIN"){
          this.props.history.push(`/Admin`);
        } else if(response.data.roles.roleName === "ROLE_FLATOWNER"){
          this.props.history.push(`/flatowner`);
        } else{
          this.props.history.push(`/worker`);
        }
      })
      .catch((error) => {
        console.log('auth failed ', error.message);
      });
  }

  render() {
    return (
      <>
      
<h1>Login</h1><br/>
       <div className='container'>
          {this.state.login && this.state.authenticated && (
            <div>Login Successful</div>
          )}
          {this.state.login && !this.state.authenticated && (
            <div className='alert alert-warning'>Invalid Login</div>
          )}
          <div>
          Email :{' '}
          <input
            type='text'
            name='user'
            value={this.state.user}
            onChange={this.updateValues}
          autoComplete="off" placeholder='Enter Your Email'></input><br/><br/></div>
         <div>
          Password :{' '}
          <input
            type='password'
            name='pwd'
            value={this.state.pwd}
            onChange={this.updateValues}
            autoComplete="off" placeholder='Enter Your Password'></input><br/><br/></div>
          
          <button className='btn btn-success' onClick={this.handleLogin}>
            Login
          </button>
        </div>
       
      </>
    );
  }
}
