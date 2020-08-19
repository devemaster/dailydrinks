import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { doResetpasswordRes } from '../../../action/resetPasswordActions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const fields = ['encrypted_password'];


// form field dynamic set
const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <input className="form-control" {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
    </div>
)


// validations
const validate = values => {
    const errors = {}

    if (!values.encrypted_password) {
        errors.encrypted_password = 'Required'
    }
    // if (values.encrypted_password) {
    //     if (values.encrypted_password.search(/^\S+$/)) {
    //         errors.encrypted_password = 'Your password must not contain any space.'
    //     }
    //     if (values.encrypted_password.length < 10) {
    //         errors.encrypted_password = 'Your password must be at least 10 characters'
    //     }
    //     if (values.encrypted_password.search(/[a-z]/i) < 0) {
    //         errors.encrypted_password = 'Your password must contain at least one letter.'
    //     }
    //     if (values.encrypted_password.search(/[0-9]/) < 0) {
    //         errors.encrypted_password = 'Your password must contain at least one digit.'
    //     }
    //     if (values.encrypted_password.search(/[!@#$%^&*]/) < 0) {
    //         errors.encrypted_password = 'Your password must contain at least one special character.'
    //     }
    // }
    return errors
}

class ResetPasswordForm extends React.PureComponent {

    // constructor function
    constructor() {
        super();
        this.state = {
            changeTextPass: false,
        }
    }

    // componentWillUnmount() {
    //     this.props.reset();
    // }

    
    // on component receive new props
    componentWillReceiveProps(nextProps) {
        if(nextProps){
            if(nextProps.doResetpasswordRes.user.form.ReduxResetPasswordForm.submitSucceeded === true){
                this.props.reset();
            }
        }
    }

    // change password
    changePasswordButton = () => {
        this.setState({
            changeTextPass: !this.state.changeTextPass,
        });
    }
    render() {
        // get data from state
        const { handleSubmit, handleFormSubmit, pristine, submitting } = this.props
        return (
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="small-12 columns error_message form_field_wrapper password_feild_wrapper" style={{ marginTop: 50, marginBottom: 50 }}>
                    <Field
                        name="encrypted_password"
                        component={renderField}
                        label="New Password"
                        autoComplete="off"
                        type={this.state.changeTextPass ? "text" : "password"}
                    />
                    {
                        (this.state.changeTextPass) &&
                        <div className="showhidepasswordbtnReset" onClick={()=> this.changePasswordButton()}><i className="fa fa-eye"></i></div>
                    }
                    {
                        (!this.state.changeTextPass) &&
                        <div className="showhidepasswordbtnReset" onClick={()=> this.changePasswordButton()}><i className="fa fa-eye-slash"></i></div>
                    }
                </div>
                <div>
                    <button type="submit" className="btn btn-primary login_button" disabled={pristine || submitting}>Submit</button>
                </div>
            </form>
        )
    }
}
// setup props data
ResetPasswordForm.propTypes = {
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    handleFormSubmit: PropTypes.func,
    doResetpasswordRes: PropTypes.any
};


// setup response function
const mapStateToProps = createStructuredSelector({
    doResetpasswordRes: doResetpasswordRes
});
 
// dispatch function 
function mapDispatchToProps(dispatch,ownProps) {
    return {
        
    };
}


// form setup
const ReduxResetPasswordForm = reduxForm({
    form: 'ReduxResetPasswordForm',
    validate,
    fields,
    destroyOnUnmount: false,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    touchOnBlur: false,
})(ResetPasswordForm)

export default connect(mapStateToProps, mapDispatchToProps)(ReduxResetPasswordForm);
