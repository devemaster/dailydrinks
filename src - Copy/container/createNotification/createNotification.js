import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './createNotification.css';
import LayoutWrapper from '../../component/LayoutWrapper/';
// import { getAllUsers, doUserAllRes } from '../../action/userActions';
import { getAllSearchUsers, doUserAllSearchRes } from '../../action/userSearchActions';
import { submitCreateNotification, doCreateNotificationRes } from '../../action/createNotificationActions';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
import validate from './formValidation';
import Select from 'react-select';
import { fetchAllApplication, getAllApplicationRes } from '../../action/applicationActions';
import { getItem } from '../../utils/localStore';
let isSend = false;
class CreateNotificationComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        isSend = false;
        this.state = {
            isLoader: true,
            isSubmited: false,
            title: '',
            body: '',
            usersList: [],
            selectedUser: null,
            file: null,
            isSearchLoading: false,
            applicationList: [],
            groupValue: '',
            showUserList: false,
            appName: '',
        }
    }
    componentDidMount() {
        let userAppGroup = getItem('adminAppId');
        if (userAppGroup !== null) {
            this.setState({
                isLoader: false,
                groupValue: getItem('adminAppId'),
                appName: getItem('adminAppName'),
            });
        } else {
            this.setState({
                isLoader: false,
            });
        }
        
        this.props.fetchAllApplication();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.allApplicationRes) {
			if (nextProps.allApplicationRes.data && nextProps.allApplicationRes.data.applicationList) {
				if (nextProps.allApplicationRes.data.applicationList.success===true) {
                    this.setState({
                        applicationList: nextProps.allApplicationRes.data.applicationList.data
                    });
                }
            }
        }
        if(nextProps.doUserAllSearchRes){
            if (nextProps.doUserAllSearchRes.data && nextProps.doUserAllSearchRes.data.userSearch) {
				if (nextProps.doUserAllSearchRes.data.userSearch.success===true) {
                    this.setState({
                        usersList: nextProps.doUserAllSearchRes.data.userSearch.data,
                        isSearchLoading: false,
                    });
                    setTimeout(() => { this.setState({
                        isSearchLoading: false
                    }); }, 3000);
				}
			}
        }
        if(nextProps.createNotificationRes){
            if(nextProps.createNotificationRes.data.createNotification ){
                if(nextProps.createNotificationRes.data.createNotification.success === true && isSend){
                    isSend = false;
                    this.setState({
                        isLoader: false,
                        title: '',
                        body: '',
                        selectedUser: null,
                        isSubmited: false,
                    });
                } else {
                    setTimeout(() => { this.setState({
                        isLoader: false
                    }); }, 3000);
                }
            }
        }
    }

    handleBack = () => {
        this.props.history.push('/applications');
    }

    handleSubmit = () => {
        this.setState({
          isSubmited: true,
        }, () => { });
        validate(this.state);
        const errors = validate(this.state);
        if (Object.keys(errors).length === 0) {
            let selectedUsr = [];
            if (this.state.selectedUser !== null) {
                for (let item of this.state.selectedUser) {
                    selectedUsr.push(item.original.user_id)
                }
            }
            let payloadReq = {
                application_id: this.state.groupValue !== 'user' ? this.state.groupValue : '',
                selected_user: this.state.selectedUser !== null ? selectedUsr.join() : '',
                title: this.state.title,
                type_message: this.state.body,
            }
            isSend = true;
            this.props.handleFormSubmit(payloadReq);
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleInputChange = (value) => {
        if (value !== '') {
            this.setState({
                isSearchLoading: true
            });

        }
        this.props.getAllSearchUsers(value);
    }
    
    userChange = (item) => {
        this.setState({
            selectedUser: item
        });
    }
    changeGroup = (value) => {
        this.setState({
            groupValue: value.target.value
        }, () => {
            if (this.state.groupValue === 'user') {
                this.setState({
                    showUserList: true
                })
            } else {
                this.setState({
                    showUserList: false
                })
            }

        })
    }
    render() {
        const Header = (<div className="offer_head">Create Notification</div>);
        
        const spinner = <span><img src={loaderImg} alt="" /></span>;
        const errors = validate(this.state);
        const { isSubmited, usersList } = this.state;

        // let countryListOptionsItems = [];
        const userListOptions = [];
        if (usersList && usersList.length > 0) {
            usersList.map((item) => {
                userListOptions.push({ value: item.fullname, label: item.fullname, original: item });
                return (
                <option value={item.fullname} id={item.user_id} key={item.user_id}>
                    {item.fullname}              
                </option>
                );
            });
        }
        let userRole = getItem('userRoleId');
        console.log(this.state.groupValue);
        return (
                <LayoutWrapper title="Create Notification" header={Header} >
                    <Loader show={this.state.isLoader} message={spinner}>
                        <div className="edit_profile_content_wrapper">
                            <div className="createprofile_heading">
                                {/* <div className="createprofile_back_icon_text"  onClick={this.handleBack}>
                                    <img src={BackIcon} alt="" className="createprofile_back_icon" />
                                    <span className="createprofile_go_back">Back to Application</span>
                                </div> */}
                                <span className="offering_detail_title">Create Notification</span>
                            </div>
                            <div className="editprofile_content">
                                <div className="form_content_editprofile edit_profile_form_fields_wrapper">
                                    {/* <CreateUserForm handleFormSubmit={(data) => { this.handleSubmit(data) }} /> */}
                                    <div >
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="mt-2">
                                                    {
                                                        userRole == '1' ?
                                                        <div className="form-group select-loader">
                                                            <label>Select Group</label>
                                                            <select className="form-control" name="groupValue" onChange={(e) => this.changeGroup(e)} value={this.state.groupValue}>
                                                                <option value=''>Select Group</option>
                                                                <option value="user">Individual User</option>
                                                                {
                                                                    (this.state.applicationList) && this.state.applicationList.map((op, i) => {
                                                                        return (
                                                                            <option key={i} value={op.application_id}>{op.application_name}</option>
                                                                        );
                                                                        
                                                                    })
                                                                }
                                                            </select>
                                                            {errors && isSubmited && <span className="error-message">{errors.groupValue}</span>}
                                                        </div>
                                                        :
                                                        <div className="form-group select-loader">
                                                            <label>Selected Group</label>
                                                            <select className="form-control" name="groupValue" value={this.state.groupValue} readOnly>
                                                                <option value={this.state.groupValue} disabled={true}>{this.state.appName}</option>
                                                            </select>
                                                            {errors && isSubmited && <span className="error-message">{errors.groupValue}</span>}
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            {
                                                (this.state.showUserList) && 
                                                <div className="col-6">
                                                    <div className="mt-2">
                                                        <div className="form-group select-loader">
                                                            <label>Select Users</label>
                                                            <Select
                                                                value={this.state.selectedUser}
                                                                onChange={this.userChange}
                                                                options={userListOptions}
                                                                name="selectedUser"
                                                                placeholder="Select Users"
                                                                isMulti={true}
                                                                onInputChange={this.handleInputChange}
                                                            />
                                                            {
                                                                (this.state.isSearchLoading) &&
                                                                <img className="loading-img" src={loaderImg} alt="" />
                                                            }
                                                            {errors && isSubmited && <span className="error-message">{errors.selectedUser}</span>}
                                                        </div>
                                                    </div>
                                                </div>

                                            }
                                            <div className="col-6">
                                                <div className="mt-2">
                                                    <div className="form-group">
                                                        <label>Title</label>
                                                        <input type="text" className="form-control" placeholder="Enter notification title" name="title" onChange={(e) => this.handleChange(e)} value={this.state.title} />
                                                        {errors && isSubmited && <span className="error-message">{errors.title}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="mt-2">
                                                    <div className="form-group">
                                                        <label>Message</label>
                                                        <input type="text" className="form-control" placeholder="Enter notification message" name="body" onChange={(e) => this.handleChange(e)} value={this.state.body} />
                                                        {errors && isSubmited && <span className="error-message">{errors.body}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={()=> this.handleSubmit()} className="btn btn-primary login_button" >Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Loader>
                </LayoutWrapper>
        )
    }
}

CreateNotificationComponent.propTypes = {
    handleFormSubmit: PropTypes.func,
    createNotificationRes: PropTypes.any,
    doUserAllSearchRes: PropTypes.any,
    allApplicationRes: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
    createNotificationRes: doCreateNotificationRes,
    doUserAllSearchRes: doUserAllSearchRes,
	allApplicationRes: getAllApplicationRes,
});

function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(submitCreateNotification(data)),
        getAllSearchUsers: (data) => dispatch(getAllSearchUsers(data)),
		fetchAllApplication: () => dispatch(fetchAllApplication()),
    };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CreateNotificationComponent);
