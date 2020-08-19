import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './login.scss';
import LoginForm from './Form/form';
import logoImg from '../../assets/images/novusone-logo.png';
import { submit_login, doLoginRes } from '../../action/loginActions';
// import { setItem, getItem } from '../../utils/localStore';
import Loader from 'react-loader-advanced';
import loaderImg from '../../assets/images/loader-example.gif';

class LoginComponent extends React.PureComponent {
// constructor function
    constructor() {
        super();
        this.state = {
            isLoader: false,
            client_ip: null,
            remainingDay: '',
        }
    }

    // on component receive new props
    componentWillReceiveProps(nextProps) {

        // login response
        if (nextProps.loginRes.user.user) {
            if (nextProps.loginRes.user.user && nextProps.loginRes.user.user.data) {
                if (nextProps.loginRes.user.user.success === true) {
                    window.location.href="/users";
                }
            } else {
                setTimeout(this.setState({
                    isLoader: false,
                }), 3000);
            }
        }
    }

    // form submit 
    handleSubmit(data) {
        let sendRequest = data;
        this.setState({
            isLoader: true,
        })

        // login action call
        this.props.handleFormSubmit(sendRequest);
    };

    render() {
		const spinner = <span><img src={loaderImg} alt="" /></span>;
        return (
            <Loader show={this.state.isLoader} message={spinner}>
                <div className="login_content">
                    <div className="login_content_inner">
                        <div className="login_content_inner_head">
                            <div className="company_logo">
                                <img src={logoImg} alt=""  />
                            </div>
                        </div>
                        <div className="login_content_inner_body">
                            <div className="login_content_inner_body_inner">
                                {/* <div className="user_icon"><i className="fa fa-user-o"></i></div> */}
                                <div className="login_heading">
                                    Novus Login
                                </div>
                                <div className="form_content_login">
                                    <LoginForm handleFormSubmit={(data) => { this.handleSubmit(data) }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Loader>
        )
    }
}

// setup props data
LoginComponent.propTypes = {
    handleFormSubmit: PropTypes.func,
    loginRes: PropTypes.any
};

// setup response function
const mapStateToProps = createStructuredSelector({
    loginRes: doLoginRes
});

// dispatch function
function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(submit_login(data))
    };
}

// connect component to redux store
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LoginComponent);
