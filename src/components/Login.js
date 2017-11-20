import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import MuiPaper from 'material-ui/Paper';
import {Field, reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Upload from 'material-ui-upload/Upload';
import CircularProgress from 'material-ui/CircularProgress';
import request from 'superagent';
import {store} from '../store';
import * as actionTypes from '../constants/actionTypes';
import { routerMiddleware, push } from 'react-router-redux'

// Home page component
class Login extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
        step: 1,
        userId: null
      };
      this.styles = {
          
      }

      this.submitUserInfo = this.submitUserInfo.bind(this);
  }

  submitUserInfo(e){
    e.preventDefault();


    let payload = {
      phone: this.refs.phone.input.value,
      password: this.refs.password.input.value
    }

    request.post(`${API_CLIENT}/post_user_login.php`)
      .send(payload)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .end((err, response) => {
        if (!err && response.ok) {
          if(response.body.success == true){
            store.dispatch({
              type: actionTypes.GET_USER_INFO,
              data: response.body.user
            });
            }
        } else {
            
        }
      });
  }  

  componentWillReceiveProps(nextProps){
    if(nextProps.user && nextProps.user.currentUser){
      let role = nextProps.user.currentUser.role;
      if(role === 'user'){
        this.props.dispatch(push('/home/requests'));
      }
      else if(role === 'doctor'){
        this.props.dispatch(push('/home/doctor')); 
      }
      else if(role === 'pharma'){
        this.props.dispatch(push('/home/pharma')); 
      }
    }
  }

  
  // render
  render() {
    return (
      <div className="page-home">
      	<div className="row">
      		<div className="col-md-6 col-md-offset-3 form-container">
	      		<MuiPaper className="paper container-padding">
		        	<div className="signup-form">
                <div className="text-center">
                  <img width="300" src="https://recruiterflow.com/static/img/manual/careers/pharmeasy.png"/>
                </div>
                <div>
                  <form onSubmit={this.submitUserInfo.bind(this)}>
                    <TextField
                      ref="phone"
                      hintText="9996858100"
                      fullWidth={true}
                      floatingLabelText="Phone Number *"
                      type="number"
                      min="1000000000"
                      max="9999999999"
                      required
                    />
                    <TextField
                      ref="password"
                      hintText="*********"
                      fullWidth={true}
                      floatingLabelText="Password *"
                      type="password"
                      required
                    />
                    <div className="margin-top-20">
                      <RaisedButton type="submit" label="Login" primary={true} className="width-100" backgroundColor="green"/>
                      <div className="text-center margin-top-20 ">Or</div>
                      <div className="text-center margin-top-20 font-size-16"><a href="/signup">Create Account</a></div>
                    </div>
                 </form>
                </div>
		        	</div>
		        </MuiPaper>
	        </div>
      	</div>
      </div>
    );
  }
}

Login.propTypes = {};

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(Login);