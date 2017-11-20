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
import LinearProgress from 'material-ui/LinearProgress';
import request from 'superagent';


// Home page component
class Prescriptions extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
        file_completion: 0,
        files: []
      }

      this.getFiles = this.getFiles.bind(this);
  }

  openFileDialog (file_type) {
    var fileInputDom = ReactDOM.findDOMNode(this.refs[file_type])
    fileInputDom.click();
  }

  componentDidMount(){
    if(this.props.user && !this.props.user.currentUser && !this.props.params.id){
      window.location.href = '/';
      return;
    }

    this.getFiles();
  }

  getFiles(){
    let user_id;
    if(this.props.params.id){
      user_id = this.props.params.id;
    }
    else{
      user_id = this.props.user.currentUser.id;
    }

    request.get(`${API_CLIENT}/get_users_files.php`)
      .query({'user_id': user_id, 'type': 'prescription'})
      .end((err, response) => {
        if (!err && response.ok) {
          if(response.body.success == true){
            this.setState({
              files: response.body.files
            });
          }
        } else {
            
        }
      });
  }

  handleFile (event) {
    _.keys(event.target.files).map((index) => {
        let _this = this;
        let file = event.target.files[index];

        let formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'prescription');
        formData.append('user_id', this.props.user.currentUser.id);

        request.post(`${API_CLIENT}/upload_document.php`)
         .set("Content-Type", undefined)
         .on('progress', function(e) {
            let newState = {};
            newState['file_completion'] = e.percent;
            _this.setState(newState);
          })
          .send(formData)
          .end((err, response) => {
            if (!err && response.ok) {
                let files = this.state.files;
                files.push({'name': response.body.file_name});
                this.setState({
                  files: files,
                  file_completion: 0
                })
            } else {
                
            }
          });

    })
  }

  // render
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
          
            {this.props.user.currentUser && this.props.user.currentUser.role == 'user' &&
              <div className="upload-container margin-top-20">
                        <RaisedButton
                          label={'Upload Prescriptions'}
                          onClick={this.openFileDialog.bind(this, 'prescription')} className="upload-buttons"
                          disabled={this.state.prescription}
                          className="width-100"
                          />
                <input
                  type='file'
                  multiple={this.props.multi}
                  ref='prescription'
                  name='prescription'
                  style={{ display: 'none' }}
                  accept={this.props.accept}
                  onChange={this.handleFile.bind(this)} />

                <LinearProgress mode="determinate" value={this.state.file_completion} />
              </div>
            }
          </div>
        </div>
        <div className="row doc-container margin-top-20">

          {this.state.files.map((file, index)=>{
            return (
              <div className="col-md-4 doc-image" key={index}>
                <img src={`${API_CLIENT}/${file.name}`}/>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

Prescriptions.propTypes = {};

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(Prescriptions);