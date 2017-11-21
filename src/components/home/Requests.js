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
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import request from 'superagent';
import _ from 'lodash';

// Home page component
class Requests extends Component {
  constructor(props, context) {
      super(props, context);
      this.getRequests = this.getRequests.bind(this);
      this.changeStatus = this.changeStatus.bind(this);
      this.state = {
        requests: []
      }
  }

  componentDidMount(){
    if(this.props.user && !this.props.user.currentUser){
      window.location.href = '/';
      return;
    }

    this.getRequests();
  }

  getRequests(){
    request.get(`${API_CLIENT}/get_users_requests.php`)
      .query({'requested_to': this.props.user.currentUser.id})
      .end((err, response) => {
        if (!err && response.ok) {
          if(response.body.success == true){
            this.setState({
              requests: response.body.requests
            });
          }
        } else {
            
        }
      });
  }

  changeStatus(requestObj, newStatus){
    request.post(`${API_CLIENT}/update_request_status.php`)
      .send({'request_id': requestObj.request_id, 'new_status': newStatus})
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .end((err, response) => {
        if (!err && response.ok) {
          if(response.body.success == true){
            let requests = this.state.requests;
            let id = _.findIndex(requests, { request_id: requestObj.request_id });
            requests[id].status =  newStatus;
            this.setState({
              requests
            });
          }
        } else {
            
        }
      });
  }

  // render
  render() {
    let _this = this;
    return (
      <div>
      	<div className="row">
      		<div className="col-md-12">
        		<h2>Requests</h2>
          </div>
      	</div>

        <div className="row">
          <div className="col-md-12">
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>
                    Requesting Person
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    Request Type
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    Date
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    Actions
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                  {this.state.requests.map((request, index)=>{
                      return (
                          <TableRow key={index}>
                            <TableRowColumn><strong>{request.role == 'doctor' ? 'Dr.' : ''}{request.name}</strong></TableRowColumn>
                            <TableRowColumn>{request.role == 'doctor' &&
                              <span>Medical Records</span>
                            }{request.role == 'pharma' &&
                              <span>Prescriptions</span>
                            }</TableRowColumn>
                            <TableRowColumn><time>{request.date}</time></TableRowColumn>
                            <TableRowColumn>
                              <div className="color-red text-center">
                                {request.status == 'pending' &&
                                  <span>
                                    <RaisedButton onClick={_this.changeStatus.bind(_this, request, 'accepted')} label="Accept" primary={true} className="margin-right-5"/>
                                    <RaisedButton onClick={_this.changeStatus.bind(_this, request, 'rejected')} label="Reject" secondary={true}/>
                                  </span>
                                }
                                {request.status == 'accepted' &&
                                    <div className="color-green"><strong>Accepted</strong></div>
                                }

                                {request.status == 'rejected' &&
                                  <div className="color-red"><strong>Rejected</strong></div>
                                }
                              </div>
                            </TableRowColumn>
                          </TableRow>
                      )
                  })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

Requests.propTypes = {};

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(Requests);