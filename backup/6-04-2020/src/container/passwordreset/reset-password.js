
import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './passwordReset.css';
import { reset_password, doResetpasswordRes } from '../../action/resetPasswordActions';
import ResetPasswordForm from './resetpasswordForm/resetpasswordForm';
import logoImg from '../../assets/images/novusone-logo.png';

class ResetPasswordComponent extends React.PureComponent {

    constructor() {
        super();
        this.state = {
            value:'',
            resetpasswordtoken:''
        }
    }

    componentDidMount() {
        let pathArray = this.props.location.pathname.split('/');
        this.setState({
            resetpasswordtoken : pathArray[2],
        })
    }

    componentWillReceiveProps(nextProps) { }

    handleSubmit(data){
        let sendRequest = data;
        sendRequest.reset_password_token = this.state.resetpasswordtoken;
        this.props.handleFormSubmit(sendRequest);
    }

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
                                Reset Password
                            </div>
                            <div className="form_content_resetpassword">
                                <ResetPasswordForm handleFormSubmit={(data) => { this.handleSubmit(data) }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


ResetPasswordComponent.propTypes = {
    handleFormSubmit: PropTypes.func,
    resetpasswordRes: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
    resetpasswordRes: doResetpasswordRes
});

function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(reset_password(data))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ResetPasswordComponent);
