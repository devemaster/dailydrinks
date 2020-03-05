import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import './forgetPassword.scss';

import PropTypes from 'prop-types';
import logoImg from '../../assets/images/novusone-logo.png';
import ForgotpasswordForm from './forgetpasswordForm/forgetPasswordForm';
import { submitForgotpassword, doForgotpasswordRes } from '../../action/forgotPasswordActions';
// import { ToastContainer } from 'react-toastify';

class ForgetPasswordComponent extends React.PureComponent {

    constructor() {
        super();
        this.state = {
        }
    }


    handleSubmit(data) {
        let sendRequest = {
            "email" : data.email
        }
        this.props.handleFormSubmit(sendRequest);
    };

    render() {
        return (
            <div className="forgetpassword_content login_content">
                <div className="login_content_inner">
                    <div className="login_content_inner_head">
                        <div className="company_logo">
                            <img src={logoImg} alt="" />
                        </div>
                    </div>
                    <div className="login_content_inner_body">
                        <div className="login_content_inner_body_inner">
                            {/* <div className="user_icon"><i className="fa fa-user-o"></i></div> */}
                            <div className="forgetpassword_heading login_heading">
                                Forgot Password
                            </div>
                            <div className="form_content_forgetpassword">
                                <p style={{ textAlign: 'center', fontSize: '15px', color: '#fff' }}>Submit your email and we'll send you a link to reset it.</p>
                                <ForgotpasswordForm handleFormSubmit={(data) => { this.handleSubmit(data) }} />
                            </div>
                            <div className="row mt-35px">
                                <div className="col col-12 login_forgot">
                                    <Link to={"/"} className="text-decoration-none">
                                        <span>Login?</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <ToastContainer /> */}
            </div>
        )
    }
}


ForgetPasswordComponent.propTypes = {
    handleFormSubmit: PropTypes.func,
    forgotpasswordRes: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
    forgotpasswordRes: doForgotpasswordRes
});

function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(submitForgotpassword(data))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ForgetPasswordComponent);
