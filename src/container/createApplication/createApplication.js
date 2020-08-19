import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './createApplication.css';
import LayoutWrapper from '../../component/LayoutWrapper/';
import { getAllCountry, doAllCountryRes } from '../../action/createUserActions';
import { getAllUsers, doUserAllRes } from '../../action/userActions';
import { submitCreateApplication, doCreateApplicationRes } from '../../action/createApplicationActions';
import { uploadAppIcon, doUploadAppIconRes } from '../../action/uploadAppIconActions';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
import BackIcon from '../../assets/images/icon-left.svg';
import validate from './formValidation';
import Select from 'react-select';
class CreateApplicationComponent extends React.PureComponent {
    _isMounted = false;

    // constructor function
    constructor(props) {
        super(props);
        this.state = {
            isLoader: true,
            isSubmited: false,
            applicationName: '',
            icon: '',
            countryList: [],
            usersList: [],
            selectedCountry: null,
            selectedUser: null,
            file: null
        }
    }

    // on component load function call
    componentDidMount() {

        // get country list action call
        this.props.getAllCountry();
        // this.props.getAllUsers();
        this.setState({
            isLoader: false,
        });


    }

    
    // on component receive new props   
    componentWillReceiveProps(nextProps) {

        // countrylist response
        if(nextProps.doAllCountryRes){
            if(nextProps.doAllCountryRes.data.countryList ){
                if(nextProps.doAllCountryRes.data.countryList.success === true){
                    this.setState({
                        countryList: nextProps.doAllCountryRes.data.countryList.countriesList
                    });
                }
            }
        }

        // userlist respnse
        if(nextProps.allUsersRes){
            if (nextProps.allUsersRes.data && nextProps.allUsersRes.data.allUser) {
				if (nextProps.allUsersRes.data.allUser.success===true) {
                    this.setState({
                        usersList: nextProps.allUsersRes.data.allUser.data
                    });
				}
			}
        }

        // upload image response
        if(nextProps.doUploadAppIconRes){
            if (nextProps.doUploadAppIconRes.data && nextProps.doUploadAppIconRes.data.uploadAppIcon) {
				if (nextProps.doUploadAppIconRes.data.uploadAppIcon.success===true) {
                    this.setState({
                        icon: nextProps.doUploadAppIconRes.data.uploadAppIcon.imageurl
                    });
				}
			}
        }

        // create application response
        if(nextProps.createAppRes){
            if(nextProps.createAppRes.data.createApplication ){
                if(nextProps.createAppRes.data.createApplication.success === true){
                    this.setState({
                        isLoader: false
                    });

                    // app created succssfullty route to application list page
                    this.props.history.push('/applications');
                } else {
                    setTimeout(() => { this.setState({
                        isLoader: false
                    }); }, 3000);
                }
            }
        }
    }

    // back to application list page
    handleBack = () => {
        this.props.history.push('/applications');
    }


    // submit function application create form
    handleSubmit = () => {
        this.setState({
          isSubmited: true,
        }, () => { });
        validate(this.state);
        const errors = validate(this.state);
        if (Object.keys(errors).length === 0) {
            let selectedCon = [];
            for (let item of this.state.selectedCountry) {
                selectedCon.push(item.value)
            }
            let payloadReq = {
                applicationName: this.state.applicationName,
                icon: this.state.icon,
                selectedCountries: selectedCon.join(),
                selectedUser: '',
            }

            // application create action call
            this.props.handleFormSubmit(payloadReq);
        }
    }

    // input on change
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });


    }


    // file upload on change function
    handleFileChange = (e) => {
        this.setState({
            file: e.target.files
        });

        // upload image action call
        this.props.uploadImage(e.target.files);
    }

    // on country change 
    countryChange = (item) => {
        this.setState({
            selectedCountry: item
        });
    }

    // on user change
    userChange = (item) => {
        this.setState({
            selectedUser: item
        });

    }
    render() {

        // set page header title
        const Header = (<div className="offer_head">Create User</div>);
        
        // loader spinner
        const spinner = <span><img src={loaderImg} alt="" /></span>;

        // validation errors for create form
        const errors = validate(this.state);

        // get data from state
        const { isSubmited, countryList, usersList } = this.state;

        // let countryListOptionsItems = [];


        // countrylist select option setup
        const countryListOptions = [];

        if (countryList && countryList.length > 0) {
            countryList.map((item) => {
                countryListOptions.push({ value: item.country_name, label: item.country_name, original: item });
                return (
                <option value={item.country_name} id={item.id} key={item.id}>
                    {item.country_name}              
                </option>
                );
            });
        }

        // userlist select option setup
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
        return (
                <LayoutWrapper title="Create Application" header={Header} >
                    <Loader show={this.state.isLoader} message={spinner}>
                        <div className="edit_profile_content_wrapper">
                            <div className="createprofile_heading">
                                <div className="createprofile_back_icon_text"  onClick={this.handleBack}>
                                    <img src={BackIcon} alt="" className="createprofile_back_icon" />
                                    <span className="createprofile_go_back">Back to Application</span>
                                </div>
                                <span className="offering_detail_title">Create Application</span>
                            </div>
                            <div className="editprofile_content">
                                <div className="form_content_editprofile edit_profile_form_fields_wrapper">
                                    {/* <CreateUserForm handleFormSubmit={(data) => { this.handleSubmit(data) }} /> */}
                                    <div >
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="mt-2">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" placeholder="Enter application name" name="applicationName" onChange={(e) => this.handleChange(e)} />
                                                        {errors && isSubmited && <span className="error-message">{errors.applicationName}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="mt-2">
                                                    <div className="form-group">
                                                        <input type="file" className="form-control" name="icon" accept="image/*" onChange={(e) => this.handleFileChange(e)} />
                                                        {errors && isSubmited && <span className="error-message">{errors.icon}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="mt-2">
                                                    <div className="form-group">
                                                        <Select
                                                            value={this.state.selectedCountry}
                                                            onChange={this.countryChange}
                                                            options={countryListOptions}
                                                            name="selectedCountries"
                                                            placeholder="Select Countries"
                                                            isMulti={true}
                                                        />
                                                        {errors && isSubmited && <span className="error-message">{errors.selectedCountry}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="col-6">
                                                <div className="mt-2">
                                                    <div className="form-group">
                                                        <Select
                                                            value={this.state.selectedUser}
                                                            onChange={this.userChange}
                                                            options={userListOptions}
                                                            name="selectedUser"
                                                            placeholder="Select users"
                                                            isMulti={true}
                                                        />
                                                        {errors && isSubmited && <span className="error-message">{errors.selectedUser}</span>}
                                                    </div>
                                                </div>
                                            </div> */}
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

// setup props data
CreateApplicationComponent.propTypes = {
    handleFormSubmit: PropTypes.func,
    createAppRes: PropTypes.any,
    doAllCountryRes: PropTypes.any,
    allUsersRes: PropTypes.any,
    doUploadAppIconRes: PropTypes.any
};

// setup response function
const mapStateToProps = createStructuredSelector({
    createAppRes: doCreateApplicationRes,
    doAllCountryRes: doAllCountryRes,
    allUsersRes: doUserAllRes,
    doUploadAppIconRes: doUploadAppIconRes
});


// dispatch function
function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(submitCreateApplication(data)),
        getAllCountry: () => dispatch(getAllCountry()),
        getAllUsers: () => dispatch(getAllUsers()),
        uploadImage: (file) => dispatch(uploadAppIcon(file)),
    };
}

// connect component to redux store
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CreateApplicationComponent);
