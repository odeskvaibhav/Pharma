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
import { routerMiddleware, push } from 'react-router-redux';


// Home page component
class Pharma extends Component {
  constructor(props, context) {
      super(props, context);
      this.submitRequest = this.submitRequest.bind(this);
      this.getRequests = this.getRequests.bind(this);
      this.changeRoute = this.changeRoute.bind(this);
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

  changeRoute(path){
    this.props.dispatch(push(path));
  }

  getRequests(){
    request.get(`${API_CLIENT}/get_requests.php`)
      .query({'requests_by': this.props.user.currentUser.id})
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

  submitRequest(e){
    e.preventDefault();


    let payload = {
      phone_email: this.refs.phone_email.input.value,
      requests_by: this.props.user.currentUser.id,
      type: "pharma"
    }

    request.post(`${API_CLIENT}/post_request.php`)
      .send(payload)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .end((err, response) => {
        if (!err && response.ok) {
          if(response.body.success == true){
            this.refs.phone_email.input.value = "";
            this.getRequests();
          }
        } else {
            
        }
      });
  }

  // render
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12 request-form">
            <form onSubmit={this.submitRequest.bind(this)}>
              <TextField
                ref="phone_email"
                hintText="9996858100 or vaibhav@gmail.com"
                floatingLabelText="Enter phone number or email"
                fullWidth="true"
                required
              />
              <RaisedButton type="submit" label="Request Prescriptions" primary={true} className="width-100"/>
            </form>
          </div>
          
        </div>
        <div className="row margin-top-20">
          <div className="col-md-12">
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>
                    Requested to
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    Phone
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    Email
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    Status
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
                            <TableRowColumn>{request.name}</TableRowColumn>
                            <TableRowColumn>{request.phone}</TableRowColumn>
                            <TableRowColumn>{request.email}</TableRowColumn>
                            <TableRowColumn secondary={true}  className={request.status === 'rejected' ? 'color-red' : (request.status === 'accepted' ? 'color-green' : 'color-blue')}><strong>{request.status}</strong></TableRowColumn>
                            <TableRowColumn>
                                  <RaisedButton onClick={this.changeRoute.bind(this, `/home/prescriptions/${request.requested_to}`)} disabled={request.status === 'pending' || request.status === 'rejected'} label="View Prescriptions" Primary={true}/>
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

Pharma.propTypes = {};

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(Pharma);