import React, { Component } from 'react'
import { Formik } from 'formik'
import { object, ref, string } from 'yup'
import { Input } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { Button } from '@material-ui/core';
import {Paper } from '@material-ui/core';
import {CardFooter, Form, Col, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from "react-redux";
import axios from 'axios'
import Modal from "react-bootstrap/Modal";


import Spinner from './Spinner'
import Alert from './Alert'

 class FormPasswordReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passChangeSuccess: false,
            users:[],
            name:"Text",
            show:false, 
        
          
        
          }
           
         
      }
      

      componentDidMount() {


        fetch(`https://alphax-api.azurewebsites.net/api/users/${this.props.id}`)
        .then(res => res.json())
        .then(user =>
            this.setState({ users:user}),
          

        )
        .catch(error => {

            this.setState({error: true});
        });

      //Start the timer
      
    
    
      
      }


  _handleModalClose = () => {
    this.setState(() => ({
      passChangeSuccess: false,
    }))
  }
  _handleClose = () => {
    this.setState(() => ({
      show: false,
    }))
  }

  _handleShow = () => {
    this.setState(() => ({
      show: true,
    }))
  }
  _renderModal = () => {
    const onClick = () => {
   
      this.setState(() => ({ passChangeSuccess: false }))


      
    }
   
    return (
      <Alert
        isOpen={this.state.passChangeSuccess}
        onClose={this._handleClose}
        handleSubmit={onClick}
        title="Password Reset"
        text="Your password was changed successfully"
        submitButtonText="Done"
      />
    )
  }

  _handleSubmit = ({
    currentPass,
    newPass,
    confirmPass,
    setSubmitting,
    resetForm,
    
    
  }) => {
    // fake async login
        

        var decodedStringBtoA = currentPass+`:`+newPass;
        var encodedStringBtoA = btoa(decodedStringBtoA);

      
      
        let url = `https://alphax-api.azurewebsites.net/api/users/PasswordChange/${this.props.id}`;

        var axios = require('axios');
        var config = {
            method: 'put',
            url: url,
            headers: {
                'Authorization': 'Basic '+ encodedStringBtoA,
            },

        };

    
        axios(config)
        
        .then((response) => {
        
          setTimeout(async () => {
           
            this.setState(() => ({
              passChangeSuccess: true,
              
            }))
          
      
            resetForm()
          }, 1000)
          
        })

            .catch(error => {
              console.log("Error:" + error.message);

              var str = error.toString();
                var res = str.replace(/\D/g, "");
                  if(res==='400') {
                     setTimeout(async () => {
          
                this.setState(() => ({
                  show:true,
                  
                }))
              
          
                resetForm()
              }, 1000)

                  }
               
             
             
            })
    
  



  
  }
  
 
  render() {
    


  

  
    return (
 
     <div>
     

<Formik

initialValues={{

 oldPassword:"",
  currentPass: '',
  newPass: '',
  confirmPass: '',
}}
validationSchema={object().shape({

  currentPass: string()
   .oneOf([ref('currentPass')], 'Passwords do not match')
  .required('Current password is required'),
  newPass: string().required('New password is required'),
  confirmPass: string()
    .oneOf([ref('newPass')], 'Passwords do not match')
    .required('Password is required'),
})}
onSubmit={(
  { currentPass, newPass, confirmPass },
  { setSubmitting, resetForm }
) =>
  this._handleSubmit({
    currentPass,
    newPass,
    confirmPass,
    setSubmitting,
    resetForm,
    
    
  }
  
  
  )

  
}
render={props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting,
  } = props
  return isSubmitting ? (
    

    <Spinner />
    
   
    
  )
   : (
 
    <center>
       
       <Row className="justify-content-left">
    
    
    <Paper className="form form--wrapper" >
 
    <div className="col-sm-6">
        <div class="col-md-12 centered"></div>
         

      <form className="form" onSubmit={handleSubmit}>
      <InputLabel><h4>Change Password</h4></InputLabel>

        <FormControl fullWidth margin="dense">
          <InputLabel
            htmlFor="password-current"
            error={Boolean(touched.currentPass && errors.currentPass)}
          >
            {'Current Password'}
          </InputLabel>     
          <Input
            id="password-current"
            name="currentPass"
            type="password"
            value={values.currentPass}
            onChange={handleChange}
            onBlur={handleBlur}
               
           
          />
          <FormHelperText
             error={Boolean(touched.currentPass && errors.currentPass)}
          >
             {touched.currentPass && errors.currentPass
              ? errors.currentPass
              : ''} 
             
          </FormHelperText>
        </FormControl>
    
        <FormControl
          fullWidth
          margin="dense"
          error={Boolean(touched.newPass && errors.newPass)}
        >
          <InputLabel
            htmlFor="password-new"
            error={Boolean(touched.newPass && errors.newPass)}
          >
            {'New Password'}
          </InputLabel>
          <Input
            id="password-new"
            name="newPass"
            type="password"
            value={values.newPass}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.newPass && errors.newPass)}
          />
          <FormHelperText
            error={Boolean(touched.newPass && errors.newPass)}
          >
            {touched.newPass && errors.newPass ? errors.newPass : ''}
          </FormHelperText>
        </FormControl>
        <FormControl
          fullWidth
          margin="dense"
          error={Boolean(touched.confirmPass && errors.confirmPass)}
        >
          <InputLabel
            htmlFor="password-confirm"
            error={Boolean(touched.confirmPass && errors.confirmPass)}
          >
            {'Confirm Password'}
          </InputLabel>
          <Input
            id="password-confirm"
            name="confirmPass"
            type="password"
            value={values.confirmPass}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.confirmPass && errors.confirmPass)}
          />
          <FormHelperText
            error={Boolean(touched.confirmPass && errors.confirmPass)}
          >
            {touched.confirmPass && errors.confirmPass
              ? errors.confirmPass
              : ''}
          </FormHelperText>
        </FormControl>
        <Button
          type="submit"
          variant="raised"
          color="primary"
          disabled={Boolean(!isValid || isSubmitting)}
          style={{ margin: '16px' }}
        >
          {'Reset Password'}
        </Button>
      </form>
      {this._renderModal()}
      <p></p>
    
      </div>
    </Paper>

    </Row>


    <div>
<Modal show={this.state.show} onHide={this._handleClose}>

<Modal.Header> Current Password is not correct! </Modal.Header>
<Modal.Footer>
<button className="btn btn-danger " type='submit'onClick={this._handleClose}>Close</button>

 
</Modal.Footer>
</Modal>

</div>
    </center>


 
   
  )
}}
/>

        </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUserData: (userCred) => {
      dispatch({ type: "ADD_USER", userCred: userCred });
    }
    
  };
};
const mapStateToProps = (state) => {
    return {
      userCred: state.eventpnl.userCred,
        reservations: state.eventpnl.reservations,
        formdata: state.eventpnl.formdata,
        total: state.eventpnl.total,
          id: state.auth.userId,
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(FormPasswordReset);;
