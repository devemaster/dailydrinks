import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'

const fields = ['email'];
const lower = value => value && value.toLowerCase();


// field render for forgot form
const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <div>
            <input className="form-control" {...input} placeholder={label} type={type} />
            {touched && error && <span>{error}</span>}
        </div>
    </div>
)


// validation
function validate(values) {
    const errors = {}
    if (!values.email) {
        errors.email = 'Required'
    }
    return errors
}

class ForgotpasswordForm extends React.PureComponent {

    constructor() {
        super();
        this.state = {
        }
    }

    // component unmount
    componentWillUnmount() {
        this.props.reset();
    }

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
                <div>
                    <button type="submit" className="btn btn-primary login_button" disabled={pristine || submitting}>Submit</button>
                </div>
            </form>
        )
    }

}

// setup props data
ForgotpasswordForm.propTypes = {
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    handleFormSubmit: PropTypes.func,
};


// property used apend to component
export default reduxForm({
    form: 'ReduxForgotpasswordForm',
    fields,
    validate,
    destroyOnUnmount: false,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    touchOnBlur: false,
})(ForgotpasswordForm)