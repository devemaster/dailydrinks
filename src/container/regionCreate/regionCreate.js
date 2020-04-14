import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './regionCreate.css';
import LayoutWrapper from '../../component/LayoutWrapper/';
import {getAllCountry, doAllCountryRes, } from '../../action/createUserActions';

import { getAllUsers, doUserAllRes } from '../../action/userActions';
import { submitCreateRegion, doCreateRegionRes } from '../../action/createRegionActions';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
import BackIcon from '../../assets/images/icon-left.svg';
import validate from './formValidation';
import {MultiSelect} from 'primereact/multiselect';
import Swal from 'sweetalert2'
class RegionCreateComponent extends React.PureComponent {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isLoader: true,
            isSubmited: false,
            region_name: '',
            country: '',
            icon: '',
            countryList: [],
            usersList: [],
            selectedCountry: null,
            selectedUser: null,
            categoryTitle:'Create Region',
        }
    }
    componentDidMount() {
        // this.props.getAllUsers();
        
        this.props.getAllCountry();
        
        this.setState({
            isLoader: false,
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoader: false
        });
        console.log("Check nextProps", nextProps)
        if(nextProps.allUsersRes){
            if (nextProps.allUsersRes.data && nextProps.allUsersRes.data.allUser) {
				if (nextProps.allUsersRes.data.allUser.success===true) {
                    this.setState({
                        usersList: nextProps.allUsersRes.data.allUser.data
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
        if(nextProps.createRegionRes){
            if(nextProps.createRegionRes.data.createRegion ){
                if(nextProps.createRegionRes.data.createRegion.success === true){
                    this.setState({
                        isLoader: false
                    });
                    this.props.history.push('/region-list');
                } else {
                    setTimeout(() => { this.setState({
                        isLoader: false
                    }); }, 3000);
                }
            }
        }
    }
    handleBack = () => {
        this.props.history.push('/region-list');
    }

    handleSubmit = () => {
        console.log(this.state.countrys)
    if(this.state.countrys && this.state.countrys.length > 0){ 
        const counts = [];
    
    for(let item of this.state.countrys){
        counts.push(item.id)
    }
    let countryIds = counts.toString()
    
        console.log("hello")
        this.setState({
          isSubmited: true,
        //   isLoader:true
        }, () => { });
        validate(this.state);
        const errors = validate(this.state);
        if (Object.keys(errors).length === 0) {
            let payloadReq = {
                region_name		: this.state.region_name,
                country	: countryIds
            }
            this.props.handleFormSubmit(payloadReq);
        }
    }
    else{
        Swal.fire({
            title: 'Please select at least 1 country',
            type: 'error',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            timer: 3000
          })
    }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    userChange = (item) => {
        this.setState({
            selectedUser: item
        });

        
    }
    countryChange = (e) => {
        console.log(e.value)
    }
    render() {
        const Header = (<div className="offer_head">Create User</div>);
        
        const spinner = <span><img src={loaderImg} alt="" /></span>;
        const errors = validate(this.state);
        const { isSubmited, countryList, usersList } = this.state;

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
        return (
                <LayoutWrapper title="Create Category" header={Header} >
                    <Loader show={this.state.isLoader} message={spinner}>
                        <div className="edit_profile_content_wrapper">
                            <div className="createprofile_heading"> 
                                <div className="createprofile_back_icon_text"  onClick={this.handleBack}>
                                    <img src={BackIcon} alt="" className="createprofile_back_icon" />
                                    <span className="createprofile_go_back">Back to Region</span>
                                </div>
                                <span className="offering_detail_title">{this.state.categoryTitle}</span>
                            </div>
                            <div className="editprofile_content">
                                <div className="form_content_editprofile edit_profile_form_fields_wrapper">
                                    {/* <CreateUserForm handleFormSubmit={(data) => { this.handleSubmit(data) }} /> */}
                                    <div >
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="mt-2">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" placeholder="Enter name" name="region_name" onChange={(e) => this.handleChange(e)} />
                                                        {errors && isSubmited && <span className="error-message">{errors.region_name}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="mt-2">
                                                    <div className="form-group">
                                                    <MultiSelect className="all_sec_dropdown all_section_tab form-drop-control" optionLabel="country_name" optionValue="id" value={this.state.countrys}  options={countryList} onChange={(e) => {this.setState({countrys: e.value})}} style={{minWidth:'100%'}} filter={true} filterPlaceholder="Search" placeholder="Choose Country" />
                                                    {errors && isSubmited && <span className="error-message err-msg">{errors.country}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="col-6">
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
                                            </div> */}
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

RegionCreateComponent.propTypes = {
    handleFormSubmit: PropTypes.func,
    createRegionRes: PropTypes.any,
    doAllCountryRes: PropTypes.any,
    allUsersRes: PropTypes.any,
    doUploadAppIconRes: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
    createRegionRes: doCreateRegionRes,
    allUsersRes: doUserAllRes,
    doAllCountryRes: doAllCountryRes,
});

function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(submitCreateRegion(data)),
        getAllCountry: () => dispatch(getAllCountry()),
        getAllUsers: () => dispatch(getAllUsers()),
    };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RegionCreateComponent);
