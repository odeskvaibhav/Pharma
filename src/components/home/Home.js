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
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { routerMiddleware, push } from 'react-router-redux';


// Home page component
class Home extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
        step: 1,
        userId: null
      };
      this.styles = {
          
      }


      this.changeRoute = this.changeRoute.bind(this);
  }

  changeRoute(path){
    this.props.dispatch(push(path));
  }

  // render
  render() {
    let currentUser = this.props.user && this.props.user.currentUser ? this.props.user.currentUser : {};
    return (
      <div>
        <div className="margin-top-20">
              <MuiPaper className="paper home-container container-padding">
                <div className="row">
                  <div className="col-md-12 header-block">
                    <header>
                      <div id="header">
                        <div className="header-left">
                          <a href="/">
                            <img width="180" className="logo" src="https://recruiterflow.com/static/img/manual/careers/pharmeasy.png" alt="Logo of the website" />
                          </a>
                        </div>

                        <div className="header-right">
                          <div>
                            {currentUser.role === 'user' &&
                              <span>
                                <a onClick={this.changeRoute.bind(this, "/home/requests")}><FlatButton label="Requests" primary={true} /></a>
                                <a onClick={this.changeRoute.bind(this, "/home/prescriptions")}><FlatButton label="My Prescriptions" primary={true} /></a>
                                <a onClick={this.changeRoute.bind(this, "/home/records")}><FlatButton label="Medical Records" primary={true} /></a>
                              </span>
                            }
                            {currentUser.role == 'doctor' &&
                                  <a onClick={this.changeRoute.bind(this, "/home/doctor")}><FlatButton label="Home" primary={true} /></a>
                                } 
                                {currentUser.role == 'pharma' &&
                                  <a onClick={this.changeRoute.bind(this, "/home/pharma")}><FlatButton label="Home" primary={true} /></a>
                                } 
                            <a href="/"><RaisedButton label="Logout" secondary={true} /></a>
                          </div>
                        </div>
                      </div>
                    </header>
                  </div>
                </div>

                <div className="children-container">
                  {this.props.children}
                </div>
              </MuiPaper>
            </div>
      </div>
    );
  }
}

Home.propTypes = {};

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(Home);