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
import * as actionTypes from '../constants/actionTypes';
import {store} from '../store';
import { routerMiddleware, push } from 'react-router-redux'


// Home page component
class Signup extends Component {
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
      name: this.refs.name.input.value,
      email: this.refs.email.input.value,
      phone: this.refs.phone.input.value,
      role: 'user',
      password: this.refs.password.input.value,
    }

    request.post(`${API_CLIENT}/post_user_info.php`)
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
      this.props.dispatch(push('/home/requests'));
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
                      ref="name"
                      hintText="Vaibhav Jain"
                      fullWidth={true}
                      floatingLabelText="Name *"
                      required
                    />
                    <TextField
                      ref="email"
                      hintText="John@doe.com"
                      fullWidth={true}
                      floatingLabelText="Email *"
                      required
                      type="email"
                    />
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
                      required
                      type="password"
                    />
                    <div className="margin-top-20">
                      <RaisedButton type="submit" label="Sign me up !" primary={true} className="width-100" backgroundColor="green"/>
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

Signup.propTypes = {};

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(Signup);