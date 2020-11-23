import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { doHomeRes } from '../../../action/homeAction';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './form.scss';

const fields = ['email', 'price', 'note'];



// form field dynamic created
const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <div>
            <input className="form-control" {...input} placeholder={label} type={type}  />
            {touched && error && <span>{error}</span>}
        </div>
    </div>
)

// validation
const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.email = 'Please enter name'
    }
    if (!values.price) {
        errors.price = 'Please enter price'
    }
    return errors
}


class HomeForm extends React.PureComponent {

    constructor(props) {
        super(props);
        console.log(props)
        this.state ={
            name:'',
            email:'',
            note:'',
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        this.setState({
            name:nextProps.formData.name,
            email:nextProps.formData.email,
            note:nextProps.formData.note,
        })
    }

    // exit component clear data
    componentWillUnmount() {
        this.props.reset();
    }
    render() {
        const { handleSubmit, handleFormSubmit, pristine, submitting, formData } = this.props
        return (
            <form onSubmit={handleSubmit(handleFormSubmit)} className="form-content">
                <h3>Enter order detail here</h3>
                <div className="small-12 columns error_message form_field_wrapper email_feild_wrapper">
                    <Field
                        name="name"
                        component={renderField}
                        label="Enter Name"
                        autoComplete="off"
                        type="text"
                        value={this.state.name}
                    />
                </div>
                <div className="small-12 columns error_message form_field_wrapper password_feild_wrapper">
                    <Field
                        name="price"
                        component={renderField}
                        label="Enter price"
                        autoComplete="off"
                        type="number"
                        value={formData.price}
                    />
                </div>
                <div className="small-12 columns error_message form_field_wrapper password_feild_wrapper">
                    <Field
                        name="note"
                        component={renderField}
                        label="Enter note"
                        autoComplete="off"
                        type="note"
                        value={formData.note}
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
HomeForm.propTypes = {
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    handleFormSubmit: PropTypes.func,
    doHomeRes: PropTypes.any
};

// setup response function
const mapStateToProps = createStructuredSelector({
    doHomeRes: doHomeRes
});
  
// dispatch function
function mapDispatchToProps(dispatch,ownProps) {
    return {
        
    };
}


const ReduxHomeForm = reduxForm({
    form: 'ReduxHomeForm',
    fields,
    validate,
    destroyOnUnmount: false,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    touchOnBlur: false,
})(HomeForm)

// connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(ReduxHomeForm);
