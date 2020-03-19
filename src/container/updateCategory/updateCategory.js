import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { reduxForm } from 'redux-form';
import './updateCategory.css';
import LayoutWrapper from '../../component/LayoutWrapper/';
import { getAllCountry, doAllCountryRes } from '../../action/createUserActions';
import { getAllUsers, doUserAllRes } from '../../action/userActions';
import { submitUpdateCategory, doUpdateAppRes } from '../../action/updateCategoryActions';
import { uploadAppIcon, doUploadAppIconRes } from '../../action/uploadAppIconActions';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
import BackIcon from '../../assets/images/icon-left.svg';
import validate from './formValidation';
import Select from 'react-select';
class UpdateCategoryComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLoader: true,
            isSubmited: false,
            category_name: '',
            icon: '',
            countries: '',
            countryList: [],
            usersList: [],
            selectedCountry: null,
            file: null,
            appData: null
        }
    }
    componentDidMount() {
        // Get country list //
        this.props.getAllCountry();
        const appDetails = this.props.location.state.appData;
        this.setState({
            appData: appDetails, 
        }, () => {
            this.setState({
                category_name: this.state.appData.category_name,
                icon: this.state.appData.icon,
                // countries: this.state.appData.selected_countries
            })
        });
        this.setState({
            isLoader: false,
        });
    }
    componentWillReceiveProps(nextProps) {
        console.log("Props cat", nextProps)
        // if(nextProps.doAllCountryRes){
        //     if(nextProps.doAllCountryRes.data.countryList ){
        //         if(nextProps.doAllCountryRes.data.countryList.success === true){
        //             this.setState({
        //                 countryList: nextProps.doAllCountryRes.data.countryList.countriesList
        //             }, () => {
        //                 // if (this.state.countries !== '') {
        //                 //     let selectedcn = [];
        //                 //     let countryD = this.state.countries.split(',');
        //                 //     for (let item of this.state.countryList) {
        //                 //         for (let cn of countryD) {
        //                 //             if (cn === item.country_name) {
        //                 //                 selectedcn.push({
        //                 //                     value: item.country_name,
        //                 //                     label: item.country_name,
        //                 //                     original: item
        //                 //                 })
        //                 //             }
        //                 //         }
        //                 //     }
        //                 //     this.setState({
        //                 //         selectedCountry: selectedcn,
        //                 //     });
        //                 // }
        //             });
        //         }
        //     }
        // }
        if(nextProps.doUploadAppIconRes){
            if (nextProps.doUploadAppIconRes.data && nextProps.doUploadAppIconRes.data.uploadAppIcon) {
				if (nextProps.doUploadAppIconRes.data.uploadAppIcon.success===true) {
                    this.setState({
                        icon: nextProps.doUploadAppIconRes.data.uploadAppIcon.imageurl
                    });
				}
			}
        }
        if(nextProps.updateAppRes){
            if(nextProps.updateAppRes && nextProps.updateAppRes.data){            
                if(nextProps.updateAppRes.data && nextProps.updateAppRes.data.updateCategory ){
                    if(nextProps.updateAppRes.data.updateCategory && nextProps.updateAppRes.data.updateCategory.success === true){
                        this.setState({
                            isLoader: false
                        });
                        this.props.history.push('/category-list');
                    } 
                }
            }
        }
        
    }
    handleBack = () => {
        this.props.history.push('/category-list');
    }

    handleSubmit = () => {
        this.setState({
          isSubmited: true,
        }, () => { });
        validate(this.state);
        const errors = validate(this.state);
        if (Object.keys(errors).length === 0) {
            let payloadReq = {
                parent_id: 0,
                category_name: this.state.category_name,
                icon: this.state.icon,
            }
            this.props.handleFormSubmit(payloadReq);
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleFileChange = (e) => {
        this.setState({
            file: e.target.files
        });
        this.props.uploadImage(e.target.files);
    }
    // countryChange = (item) => {
    //     this.setState({
    //         selectedCountry: item,
    //         country: item.value
    //     });
    // }
    render() {
        const Header = (<div className="offer_head">Update Category</div>);
        
        const spinner = <span><img src={loaderImg} alt="" /></span>;
        const errors = validate(this.state);
        const { isSubmited, countryList } = this.state;

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
        return (
                <LayoutWrapper title="Create Category" header={Header} >
                    <Loader show={this.state.isLoader} message={spinner}>
                        <div className="edit_profile_content_wrapper">
                            <div className="createprofile_heading">
                                <div className="createprofile_back_icon_text"  onClick={this.handleBack}>
                                    <img src={BackIcon} alt="" className="createprofile_back_icon" />
                                    <span className="createprofile_go_back">Back to Category</span>
                                </div>
                                <span className="offering_detail_title">Update Category</span>
                            </div>
                            <div className="editprofile_content">
                                <div className="form_content_editprofile edit_profile_form_fields_wrapper">
                                    <div >
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="mt-2">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" placeholder="Enter Content name" name="category_name" onChange={(e) => this.handleChange(e)} value={this.state.category_name} />
                                                        {errors && isSubmited && <span className="error-message">{errors.category_name}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="row">
                                                    <div className="col-8">
                                                        <div className="mt-2">
                                                            <div className="form-group">
                                                                <input type="file" className="form-control" name="icon" accept="image/*" onChange={(e) => this.handleFileChange(e)} />
                                                                {errors && isSubmited && <span className="error-message">{errors.icon}</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <img src={this.state.icon} style={{width: 60, height: 60}} alt=""/>
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

UpdateCategoryComponent.propTypes = {
    handleFormSubmit: PropTypes.func,
    updateAppRes: PropTypes.any,
    doAllCountryRes: PropTypes.any,
    allUsersRes: PropTypes.any,
    doUploadAppIconRes: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
    updateAppRes: doUpdateAppRes,
    doAllCountryRes: doAllCountryRes,
    allUsersRes: doUserAllRes,
    doUploadAppIconRes: doUploadAppIconRes
});

function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(submitUpdateCategory(data)),
        getAllCountry: () => dispatch(getAllCountry()),
        getAllUsers: () => dispatch(getAllUsers()),
        uploadImage: (file) => dispatch(uploadAppIcon(file)),
    };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UpdateCategoryComponent);
