import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { doLoginRes } from '../../../action/loginActions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const fields = ['email', 'encrypted_password'];
const lower = value => value && value.toLowerCase();

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <div>
            <input className="form-control" {...input} placeholder={label} type={type} />
            {touched && error && <span>{error}</span>}
        </div>
    </div>
)

const validate = values => {
    const errors = {}
    if (!values.email) {
        errors.email = 'Required'
    }
    if (!values.encrypted_password) {
        errors.encrypted_password = 'Required'
    }
    return errors
}


class LoginForm extends React.PureComponent {

    constructor() {
        super();
        this.state = {
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    // componentWillReceiveProps(nextProps) {
    //     if(nextProps){
    //         console.log(nextProps);
    //         if(nextProps.doLoginRes.user.form.ReduxLoginForm.submitSucceeded === true){
    //             this.props.reset();
    //         }
    //     }
    // }

    render() {
        const { handleSubmit, handleFormSubmit, pristine, submitting } = this.props
        return (
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="small-12 columns error_message form_field_wrapper email_feild_wrapper">
                    <Field
                        name="email"
                        component={renderField}
                        label="Enter Email"
                        autoComplete="off"
                        type="email"
                        normalize={lower}
                    />
                </div>
                <div className="small-12 columns error_message form_field_wrapper password_feild_wrapper">
                    <Field
                        name="encrypted_password"
                        component={renderField}
                        label="Enter Password"
                        autoComplete="off"
                        type="password"
                    />
                </div>
                <div className="forget_password">
                    <Link to="/forgetpassword">
                        <span>Forgot Password?</span>
                    </Link>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary login_button" disabled={pristine || submitting}>Submit</button>
                </div>
            </form>
        )
    }
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    handleFormSubmit: PropTypes.func,
    doLoginRes: PropTypes.any
};
const mapStateToProps = createStructuredSelector({
    doLoginRes: doLoginRes
});
  
function mapDispatchToProps(dispatch,ownProps) {
    return {
        
    };
}
const ReduxLoginForm = reduxForm({
    form: 'ReduxLoginForm',
    fields,
    validate,
    destroyOnUnmount: false,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    touchOnBlur: false,
})(LoginForm)

export default connect(mapStateToProps, mapDispatchToProps)(ReduxLoginForm);
