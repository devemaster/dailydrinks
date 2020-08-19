import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Select from 'react-select';
import './createAdmin.css';
import LayoutWrapper from '../../component/LayoutWrapper/';
import { create_admin, doCreateAdminRes } from '../../action/createAdminActions';
import { getAllCountry, getAllState, getAllCity, doAllCountryRes, doAllCityRes, doAllStateRes } from '../../action/createUserActions';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
import BackIcon from '../../assets/images/icon-left.svg';
import validate from './formValidation';

class CreateAdminComponent extends React.PureComponent {

    // constructor function
    constructor(props) {
        super(props);
        this.state = {
            isLoader: true,
            isSubmited: false,
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
            showPasshword: false,
            applicationData: {}
        }
    }

    
    // on component load function call
    componentDidMount() {
        let appData = this.props.location.state.applicationData;
        this.setState({
            applicationData: appData
        });

        // get contry list action call
        this.props.getAllCountry();
        this.setState({
            isLoader: false,
        });
    }

    
    // on component receive new props
    componentWillReceiveProps(nextProps) {

        // get country list response
        if(nextProps.doAllCountryRes){
            if(nextProps.doAllCountryRes.data.countryList ){
                if(nextProps.doAllCountryRes.data.countryList.success === true){
                    this.setState({
                        countryList: nextProps.doAllCountryRes.data.countryList.countriesList
                    });
                }
            }
        }

        // state list response
        if(nextProps.doAllStateRes){
            if(nextProps.doAllStateRes.data.stateList ){
                if(nextProps.doAllStateRes.data.stateList.success === true){
                    this.setState({
                        stateList: nextProps.doAllStateRes.data.stateList.stateList
                    });
                }
            }
        }

        // city list response
        if(nextProps.doAllCityRes){
            if(nextProps.doAllCityRes.data.cityList ){
                if(nextProps.doAllCityRes.data.cityList.success === true){
                    this.setState({
                        cityList: nextProps.doAllCityRes.data.cityList.citylist
                    });
                }
            }
        }

        // create admin response
        if(nextProps.createAdminRes){
            if(nextProps.createAdminRes.data.createAdmin ){
                if(nextProps.createAdminRes.data.createAdmin.success === true){
                    this.setState({
                        isLoader: false
                    });

                    // if created successfully route to admin list page
                    this.props.history.push('/adminDetails',{
                        applicationData: this.state.applicationData
                      })
                } else {
                    setTimeout(() => { this.setState({
                        isLoader: false
                    }); }, 3000);
                }
            }
        }
    }

    // back to previous page
    handleBack = () => {
        this.props.history.goBack();
    }

    // form submit function 
    handleSubmit() {
        this.setState({
          isSubmited: true,
        }, () => { });
        validate(this.state);
        const errors = validate(this.state);
        
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
                access_application_id: this.state.applicationData.application_id
            }

            // call admin create action
            this.props.handleFormSubmit(payloadReq);
            this.setState({
                isLoader: true,
            });
        }
    }

    // input on change function
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // country change function
    countryChange = (item) => {
        this.setState({
            selectedCountry: item,
            country: item.value
        });
        this.props.getAllState(item.original.id)
    }

    // state change function
    stateChange = (item) => {
        this.setState({
            selectedState: item,
            state: item.value
        });
        this.props.getAllCity(item.original.state_id)
    }

    // city change function
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

    // show hide password in input password field
    showHidePass = () => {
        this.setState({
            showPasshword: !this.state.showPasshword
        },()=>{ })
    }

    render() {
        // set page header title
        const Header = (<div className="offer_head">Create Admin</div>);

        // loader spinner
        const spinner = <span><img src={loaderImg} alt="" /></span>;

        //validation errors
        const errors = validate(this.state);

        // get data from state
        const { isSubmited, countryList, stateList, cityList } = this.state;


        // conutryl list select option setup
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


        // state list select option setup
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

        // city list select option setup
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
                                <span className="createprofile_go_back">Back to Admin</span>
                            </div>
                            <span className="offering_detail_title">Create Admin</span>
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
                                                    <input type="number" className="form-control" placeholder="Enter ZipCode" name="zipcode" onChange={(e) => this.handleChange(e)} />
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
CreateAdminComponent.propTypes = {
    handleFormSubmit: PropTypes.func,
    createAdminRes: PropTypes.any,
    doAllCountryRes: PropTypes.any,
    doAllCityRes: PropTypes.any,
    doAllStateRes: PropTypes.any,
};

// setup response function
const mapStateToProps = createStructuredSelector({
    createAdminRes: doCreateAdminRes,
    doAllCountryRes: doAllCountryRes,
    doAllCityRes: doAllCityRes,
    doAllStateRes: doAllStateRes,
});

// dispatch function
function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(create_admin(data)),
        getAllCountry: () => dispatch(getAllCountry()),
        getAllState: (data) => dispatch(getAllState(data)),
        getAllCity: (data) => dispatch(getAllCity(data)),
    };
}

// connect component to redux store
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CreateAdminComponent);
