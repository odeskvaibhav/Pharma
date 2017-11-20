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

      this.changeStep = this.changeStep.bind(this);
      this.fileUploaded = this.fileUploaded.bind(this);
  }

  changeStep(newStep, userId = null){

    if(newStep == 2){
      this.setState({
        userId: userId
      });
    }

    this.setState({
      step: newStep
    });
  }

  fileUploaded(data){
    
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
                  <form>
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

export default connect((state) => {return {}})(Signup);