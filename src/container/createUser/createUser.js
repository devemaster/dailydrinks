import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './createUser.css';
import LayoutWrapper from '../../component/LayoutWrapper/';
import { submitCreateUser, doCreateUserRes, getAllCountry, getAllState, getAllCity, doAllCountryRes, doAllCityRes, doAllStateRes } from '../../action/createUserActions';
import { checkUserName, doCheckUserRes } from '../../action/checkUserActions';
import { fetchAllApplication, getAllApplicationRes } from '../../action/applicationActions';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
import BackIcon from '../../assets/images/icon-left.svg';
import validate from './formValidation';
import Select from 'react-select';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import Modal from "react-responsive-modal";
import { getItem } from '../../utils/localStore';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

let userRole = getItem('userRoleId');
let isUserAvailable = false;
class CreateUserComponent extends React.PureComponent {

    constructor(props) {
        super(props);
        isUserAvailable = false;
        this.state = {
            isLoader: true,
            isSubmited: false,
            isSubmitedUser: false,
            fullname: '',
            email: '',
            password: '',
            company: '',
            address1: '',
            address2: '',
            country: '',
            state: '',
            city: '',
            zipcode: '',
            countryList: [],
            stateList: [],
            cityList: [],
            selectedCountry: null,
            selectedState: null,
            selectedCity: null,
            applicationList: [],
            applicationId: '',
            applicationName: '',
            userName: '',
            selectedUserList: [],
            openErrorModal: false,
            showPasshword: false, 
            openDeleteAppModal:false,
            isDisabled:false
        }
        this.handleKeypress = this.handleKeypress.bind(this)
    }
    handleKeypress = (e) =>{
        const characterCode = e.key
        if (characterCode === 'Backspace') return
    
        const characterNumber = Number(characterCode)
        if (characterNumber >= 0 && characterNumber <= 9) {
            if (e.currentTarget.value && e.currentTarget.value.length) {
              return
            } else if (characterNumber === 0) {
              e.preventDefault()
            }
            } else {
              e.preventDefault()
            }
        }
        
    componentDidMount() {
        let userAppGroup = getItem('adminAppId');
        if (userAppGroup !== null) {
            this.setState({
                isLoader: false,
                applicationId: getItem('adminAppId'),
                applicationName: getItem('adminAppName'),
            });
        } else {
            this.setState({
                isLoader: false,
            });
        }
        this.props.getAllCountry();
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
        if(nextProps.doAllCountryRes){
            if(nextProps.doAllCountryRes.data.countryList ){
                if(nextProps.doAllCountryRes.data.countryList.success === true){
                    this.setState({
                        countryList: nextProps.doAllCountryRes.data.countryList.countriesList
                    });
                }
            }
        }
        if(nextProps.doAllStateRes){
            if(nextProps.doAllStateRes.data.stateList ){
                if(nextProps.doAllStateRes.data.stateList.success === true){
                    this.setState({
                        stateList: nextProps.doAllStateRes.data.stateList.stateList
                    });
                }
            }
        }
        if(nextProps.doAllCityRes){
            if(nextProps.doAllCityRes.data.cityList ){
                if(nextProps.doAllCityRes.data.cityList.success === true){
                    this.setState({
                        cityList: nextProps.doAllCityRes.data.cityList.citylist
                    });
                }
            }
        }
        if(nextProps.createUserRes){
            if(nextProps.createUserRes.data.createUser ){
                if(nextProps.createUserRes.data.createUser.success === true){
                    this.setState({
                        isLoader: false
                    });
                    this.props.history.push('/users');
                } else {
                    setTimeout(() => { this.setState({
                        isLoader: false
                    }); }, 3000);
                }
            }
        }
        if(nextProps.checkUserRes){
            if(nextProps.checkUserRes.data.checkUser ){
                if(nextProps.checkUserRes.data.checkUser.success === true && isUserAvailable) {
                    isUserAvailable = false;
                    console.log("hello")
                    this.notify();
                    this.setState({
                        isLoader: false
                    });
                    if (this.state.selectedUserList.length > 0) {
                        let isTrue = 0;
                        if (userRole === '1') {
                            for (let items of this.state.selectedUserList) {
                                if (items.application_id === this.state.applicationId) {
                                    isTrue = 1;
                                }
                            }
                        } else {
                            for (let items of this.state.selectedUserList) {
                                if (items.user_name === this.state.userName) {
                                    isTrue = 1;
                                }
                            }
                        }
                        if (isTrue === 0) {
                            let localArr = this.state.selectedUserList;
                            let appName = '';
                            if (userRole === '1') {
                                for (let item of this.state.applicationList) {
                                    if (Number(this.state.applicationId) === item.application_id) {
                                        appName = item.application_name;
                                    }
                                }
                            } else {
                                appName = this.state.applicationName
                            }
                            localArr.push({
                                application_id: this.state.applicationId,
                                application_name: appName,
                                user_name: this.state.userName,
                            });
                            this.setState({
                                selectedUserList: localArr,
                            }, () => {
                                if (userRole === '1') {
                                    this.setState({
                                        applicationId: '',
                                        userName: '',
                                        isSubmitedUser: false
                                    })
                                } else {
                                    this.setState({
                                        userName: '',
                                        isSubmitedUser: false
                                    })
                                }
                            });
                        } else {
                            this.setState({
                                openErrorModal: true
                            });
                        }
                    } else {
                        let localArr = this.state.selectedUserList;
                        let appName = '';
                        if (userRole === '1') {
                            for (let item of this.state.applicationList) {
                                if (Number(this.state.applicationId) === item.application_id) {
                                    appName = item.application_name;
                                }
                            }
                        } else {
                            appName = this.state.applicationName
                        }
                        
                        localArr.push({
                            application_id: this.state.applicationId,
                            application_name: appName,
                            user_name: this.state.userName,
                        });
                        this.setState({
                            selectedUserList: localArr,
                        }, () => {
                            if (userRole === '1') {
                                this.setState({
                                    applicationId: '',
                                    userName: '',
                                    isSubmitedUser: false
                                })
                            } else {
                                this.setState({
                                    userName: '',
                                    isSubmitedUser: false
                                })
                            }
                        });
                    }
                }
                if(nextProps.checkUserRes.data.checkUser.success === false && isUserAvailable) {
                    isUserAvailable = false;
                    this.setState({
                        isLoader: false
                    });
                    Swal.fire({
                        title: nextProps.checkUserRes.data.checkUser.message,
                        type: 'info',
                        confirmButtonText: 'OK',
                        allowOutsideClick: false,
                        timer: 3000
                    });
                }
            } else {
                console.log("hello")
                toast.success("User can now access this app", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                setTimeout(() => { this.setState({
                    isLoader: false
                }); }, 3000);
            }
        }
    }

    closeErrorModal = () => {
        this.setState({
            openErrorModal: false
        });
    }

    handleBack = () => {
        this.props.history.push('/users');
    }

    handleSubmit() {
        this.setState({
          isSubmited: true,
        }, () => { });
        validate(this.state);
        const errors = validate(this.state);
        let selectedUsr = this.state.selectedUserList;
        for (var i = 0; i < selectedUsr.length; i++) {
            var o = selectedUsr[i];
            delete o.application_name;
          }
        if (Object.keys(errors).length === 0) {
            let payloadReq = {
                fullname: this.state.fullname,
                email: this.state.email,
                password: this.state.password,
                company: this.state.company,
                address1: this.state.address1,
                address2: this.state.address2,
                country: this.state.country,
                state: this.state.state,
                city: this.state.city,
                zipcode: this.state.zipcode,
                create_user: selectedUsr
            }
            this.props.handleFormSubmit(payloadReq);
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    countryChange = (item) => {
        this.setState({
            selectedCountry: item,
            country: item.value
        });
        this.props.getAllState(item.original.id)
    }

    stateChange = (item) => {
        this.setState({
            selectedState: item,
            state: item.value
        });
        this.props.getAllCity(item.original.state_id)

    }

    cityChange = (item) => {
        this.setState({
            selectedCity: item,
            city: item.value
        });
    }

    createApproved(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    validateUser(values) {
        const errors = {};
        if (values.applicationId === '') {
            errors.applicationId = 'Please select application';
        }
        if (values.userName === '') {
            errors.userName = 'Please enter username';
        }
        return errors;
    }

    addApproved = () => {
        this.setState({
            isSubmitedUser: true,
        }, () => { });
        this.validateUser(this.state);
        const errors = this.validateUser(this.state);
          
        if (Object.keys(errors).length === 0) {
            let requestData = {
                UserName: this.state.userName
            }
            isUserAvailable = true;
            this.props.checkUserName(requestData)
            this.setState({
                isLoader: true
            });
            
        }
    }
    cancelDeleteApp = () => {
        this.setState({
          openDeleteAppModal: false,
        });
      }
      openDeleteApp = (rowData) => {
        this.setState({
            remData: rowData,
            openDeleteAppModal: true,
        });
    }


    removeApproved = () => {
        if(this.state.selectedUserList.length === 1){
            this.setState({ 
                selectedUserList: [],
                openDeleteAppModal:false
            },()=>{
                this.notifydelete()
             })
        } else {
            var index = this.state.selectedUserList.indexOf(this.state.remData)
            let removeData = this.state.selectedUserList.slice(0, index).concat(this.state.selectedUserList.slice(index + 1, this.state.selectedUserList.length));
            
            this.setState({ 
                selectedUserList: removeData,
                openDeleteAppModal:false
            },()=>{ 
                this.notifydelete()
            })
        }
    }

    actionTemplate = (rowData) => {
        return (
            <div style={{textAlign: 'center'}}>
                <button className="btn btn-delete-create-user" onClick={() => this.openDeleteApp(rowData)} >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        )
    }

    showHidePass = () => {
        this.setState({
            showPasshword: !this.state.showPasshword
        },()=>{ })
    }
    notify = () => {    
        toast.success("User can now access this app", {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    };
    notifydelete = () => {  
        //   console.log("&&&&&&&&")
    toast.error("User couldn't access this app", {
        position: toast.POSITION.BOTTOM_RIGHT,
    });
    };
    render() {
        const Header = (<div className="offer_head">Create User</div>);
        
        const spinner = <span><img src={loaderImg} alt="" /></span>;
        const errors = validate(this.state);
        const errorsUser = this.validateUser(this.state);
        const { isSubmited, countryList, stateList, cityList, isSubmitedUser } = this.state;

        // let countryListOptionsItems = [];
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
        const stateListOptions = [];
        if (stateList && stateList.length > 0) {
            stateList.map((item) => {
                stateListOptions.push({ value: item.state_name, label: item.state_name, original: item });
                return (
                <option value={item.state_name} id={item.state_id} key={item.state_id}>
                    {item.state_name}              
                </option>
                );
            });
        }
        const cityListOptions = [];
        if (cityList && cityList.length > 0) {
            cityList.map((item) => {
                cityListOptions.push({ value: item.city_name, label: item.city_name, original: item });
                return (
                <option value={item.city_name} id={item.city_id} key={item.city_id}>
                    {item.city_name}              
                </option>
                );
            });
        }
        return (
            <LayoutWrapper title="Create User" header={Header} >
                <Loader show={this.state.isLoader} message={spinner}>
                    <div className="edit_profile_content_wrapper">
                        <div className="createprofile_heading">
                            <div className="createprofile_back_icon_text"  onClick={this.handleBack}>
                                <img src={BackIcon} alt="" className="createprofile_back_icon" />
                                <span className="createprofile_go_back">Back to Users</span>
                            </div>
                            <span className="offering_detail_title">Create User</span>
                        </div>
                        <div className="editprofile_content">
                            <div className="form_content_editprofile edit_profile_form_fields_wrapper">
                                <div >
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="mt-2">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Enter full name" name="fullname" onChange={(e) => this.handleChange(e)} />
                                                    {errors && isSubmited && <span className="error-message">{errors.fullname}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mt-2">
                                                <div className="form-group">
                                                    <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={(e) => this.handleChange(e)} />
                                                    {errors && isSubmited && <span className="error-message">{errors.email}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="mt-2">
                                                <div className="form-group">
                                                    <input type={this.state.showPasshword ? "text" : "password"} className="form-control" placeholder="Enter password" name="password" onChange={(e) => this.handleChange(e)} />
                                                    {
                                                        this.state.showPasshword &&
                                                        <p onClick={this.showHidePass}>
                                                            <i className="fa fa-eye eye_icon" aria-hidden="true"></i>
                                                        </p>
                                                    }
                                                    {
                                                        !this.state.showPasshword &&
                                                        <span onClick={this.showHidePass}>
                                                            <i className="fa fa-eye-slash eye_icon" aria-hidden="true"></i>
                                                        </span>
                                                    }
                                                    {errors && isSubmited && <span className="error-message">{errors.password}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mt-2">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Enter company name" name="company" onChange={(e) => this.handleChange(e)} />
                                                    {errors && isSubmited && <span className="error-message">{errors.company}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="mt-2">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Enter address 1" name="address1" onChange={(e) => this.handleChange(e)} />
                                                    {errors && isSubmited && <span className="error-message">{errors.address1}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mt-2">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Enter address 2 (Optional)" name="address2" onChange={(e) => this.handleChange(e)} />
                                                    {errors && isSubmited && <span className="error-message">{errors.address2}</span>}
                                                </div>
                                            
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="mt-2">
                                                <div className="form-group">
                                                    <input type="number" min='1' step='1' onKeyDown={this.handleKeypress} className="form-control" placeholder="Enter ZipCode" name="zipcode" onChange={(e) => this.handleChange(e)} />
                                                    {errors && isSubmited && <span className="error-message">{errors.zipcode}</span>}
                                                   
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
                                                        name="country"
                                                        placeholder="Select Country"
                                                    />
                                                    {errors && isSubmited && <span className="error-message">{errors.country}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="mt-2">
                                                <div className="form-group">
                                                    <Select
                                                        value={this.state.selectedState}
                                                        onChange={this.stateChange}
                                                        options={stateListOptions}
                                                        name="state"
                                                        placeholder="Select State"
                                                    />
                                                    {errors && isSubmited && <span className="error-message">{errors.state}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mt-2">
                                                <div className="form-group">
                                                    <Select
                                                        value={this.state.selectedCity}
                                                        onChange={this.cityChange}
                                                        options={cityListOptions}
                                                        name="city"
                                                        placeholder="Select City"
                                                    />
                                                    {errors && isSubmited && <span className="error-message">{errors.city}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-6 col-sm-12">
                                        <div className="row">
                                            <div className="col-5 col-md-5 col-sm-12">
                                                
                                                {
                                                    userRole === '1' ?
                                                    <div className="form-group">
                                                        <select className="form-control" name="applicationId" onChange={(e) => this.createApproved(e)} value={this.state.applicationId}>
                                                            <option value=''>Select Application</option>
                                                            {
                                                                (this.state.applicationList) && this.state.applicationList.map((opp, j) =>
                                                                    <option key={j} value={opp.application_id} disabled={opp.disabled}>{opp.application_name}</option>
                                                                )
                                                            }
                                                        </select>
                                                        {errorsUser && isSubmitedUser && <span className="error-message">{errorsUser.applicationId}</span>}
                                                    </div>
                                                    :
                                                    <div className="form-group">
                                                        <select className="form-control" name="applicationId" value={this.state.applicationId} readOnly>
                                                            <option value={this.state.applicationId} disabled={true}>{this.state.applicationName}</option>
                                                        </select>
                                                        {errorsUser && isSubmitedUser && <span className="error-message">{errorsUser.applicationId}</span>}
                                                    </div>
                                                }
                                            </div>
                                            <div className="col-5 col-md-5 col-sm-12">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" name="userName" placeholder="Enter user name" onChange={(e) => this.createApproved(e)} value={this.state.userName} />
                                                    {errorsUser && isSubmitedUser && <span className="error-message">{errorsUser.userName}</span>}
                                                </div>
                                            </div>
                                            <div className="col-2 col-md-2 col-sm-12">
                                                <div className="form-group">
                                                    {
                                                        <button
                                                        onClick={() => {
                                                            this.addApproved();
                                                              }} 
                                                        className="btn addmore-btn mt0">ADD</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        this.state.selectedUserList.length > 0 &&
                                        <div className="row mt-5">
                                            <div className="col-md-12">
                                                <DataTable value={this.state.selectedUserList} paginator={true} rows={10}  responsive scrollable  emptyMessage="No data found">
                                                    <Column className="tableCols" field="application_name" header="Application Name" sortable style={{width: '280px'}}/>
                                                    <Column className="tableCols" field="user_name" header="User Name" sortable style={{width: '120px'}}/>
                                                    <Column className="tableCols" field="action" header="Action" body={this.actionTemplate}                                                      
                                                    style={{width: '130px'}} />
                                                </DataTable>
                                               
                                            </div>
                                        </div>
                                    }
                                    
                                    <Modal open={this.state.openErrorModal} onClose={this.closeErrorModal} center>
                                        <div className="error-message-user-modal">
                                            <div className="row" >
                                                {
                                                    userRole === '1' ?
                                                    <div className="error-message-user-header"> This application already selected please choose other application </div>
                                                    :
                                                    <div className="error-message-user-header"> This user already added please enter other user </div>

                                                }
                                            </div>
                                            <div className="row" style={{width: 500}}>
                                                
                                            </div>
                                        </div>
                                    </Modal>
                                    <Modal open={this.state.openDeleteAppModal} onClose={this.cancelDeleteApp} center>
                                    <div className="delete-user-modal">
                                    <div className="row" >
                                        <div className="delete-user-header"> Are you sure you want to delete </div>
                                    </div>
                                    <div className="row" style={{width: 500}}>
                                    </div>
                                    <div className="row text_center" style={{marginTop: 30}}>
                                        <div className="col-6 col-md-6 col-sm-6" style={{textAlign: 'right'}}>
                                        <button
                                            className="btn delete-user-yes-btn"
                                            onClick={() => this.removeApproved() }
                                            disabled={this.state.isDisabled}
                                        >
                                            Yes
                                        </button>
                                        </div>
                                        <div className="col-6 col-md-6 col-sm-6">
                                        <button
                                            className="btn delete-user-no-btn"
                                            onClick={() => this.cancelDeleteApp() }
                                        >
                                            No
                                        </button>
                                        </div>
                                    </div>
                                    </div>
                                </Modal>
                                    <div>
                                        <button onClick={()=> this.handleSubmit()} className="btn btn-primary login_button" >Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    <ToastContainer />
                    </div>
                    <ToastContainer />
                </Loader>
            </LayoutWrapper>
        )
    }
}

CreateUserComponent.propTypes = {
    handleFormSubmit: PropTypes.func,
    createUserRes: PropTypes.any,
    doAllCountryRes: PropTypes.any,
    doAllCityRes: PropTypes.any,
    doAllStateRes: PropTypes.any,
    allApplicationRes: PropTypes.any,
    checkUserRes: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
    createUserRes: doCreateUserRes,
    doAllCountryRes: doAllCountryRes,
    doAllCityRes: doAllCityRes,
    doAllStateRes: doAllStateRes,
    allApplicationRes: getAllApplicationRes,
    checkUserRes: doCheckUserRes,
});

function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(submitCreateUser(data)),
        getAllCountry: () => dispatch(getAllCountry()),
        getAllState: (data) => dispatch(getAllState(data)),
        getAllCity: (data) => dispatch(getAllCity(data)),
		fetchAllApplication: () => dispatch(fetchAllApplication()),
        checkUserName: (data) => dispatch(checkUserName(data)),
    };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CreateUserComponent);
