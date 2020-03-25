import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { reduxForm } from 'redux-form';
import './updateSubCategory.css';
import LayoutWrapper from '../../component/LayoutWrapper/';
import { getAllCountry, doAllCountryRes } from '../../action/createUserActions';
import { getAllUsers, doUserAllRes } from '../../action/userActions';
import { submitUpdateSubCategory, doUpdateSubAppRes } from '../../action/updateSubCategoryActions';
import { uploadAppIcon, doUploadAppIconRes } from '../../action/uploadAppIconActions';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
import BackIcon from '../../assets/images/icon-left.svg';
import validate from './formValidation';
import Select from 'react-select';
class UpdateSubCategoryComponent extends React.PureComponent {
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
        console.log(this.props.location.state.appData)
        this.setState({
            appData: this.props.location.state.appData,
        }, () => {
            this.setState({
                category_name: this.state.appData.subcategory_name,
                icon: this.state.appData.icon,
                cat_id:this.state.appData.cat_id,
                subcat_id:this.state.appData.subcat_id
            })
        });
        this.setState({
            isLoader: false,
        });
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if(nextProps.doUploadAppIconRes){
            if (nextProps.doUploadAppIconRes.data && nextProps.doUploadAppIconRes.data.uploadAppIcon) {
				if (nextProps.doUploadAppIconRes.data.uploadAppIcon.success===true) {
                    this.setState({
                        icon: nextProps.doUploadAppIconRes.data.uploadAppIcon.imageurl,
                        iconName:nextProps.doUploadAppIconRes.data.uploadAppIcon.path
                    });
				}
			}
        }
        if(nextProps.updateAppRes){       
            if(nextProps.updateAppRes.data && nextProps.updateAppRes.data.updateSubCategory ){
                if(nextProps.updateAppRes.data.updateSubCategory && nextProps.updateAppRes.data.updateSubCategory.success === true){
                    this.setState({
                        isLoader: false
                    });
                    this.props.history.push({
                        pathname: '/subcategory-list',
                        state: {appData: this.state.cat_id}
                      })
                } else {
                    setTimeout(() => { this.setState({
                        isLoader: false
                    }); }, 3000);
                }
            }
        }
    }
    handleBack = () => {
        this.props.history.push({
            pathname: '/subcategory-list',
            state: {appData: this.state.cat_id}
          });
    }

    handleSubmit = () => {
        this.setState({
          isSubmited: true,
          isLoader:true
        }, () => { });
        validate(this.state);
        const errors = validate(this.state);
        if (Object.keys(errors).length === 0) {
            let payloadReq = {
                subcat_id: this.state.subcat_id,
                subcategory_name: this.state.category_name,
                icon: this.state.icon
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
    countryChange = (item) => {
        this.setState({
            selectedCountry: item,
            country: item.value
        });
    }
    render() {
        const Header = (<div className="offer_head">Update SubCategory</div>);
        
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
                <LayoutWrapper title="Create Sub Category" header={Header} >
                    <Loader show={this.state.isLoader} message={spinner}>
                        <div className="edit_profile_content_wrapper">
                            <div className="createprofile_heading">
                                <div className="createprofile_back_icon_text"  onClick={this.handleBack}>
                                    <img src={BackIcon} alt="" className="createprofile_back_icon" />
                                    <span className="createprofile_go_back">Back to Sub Category</span>
                                </div>
                                <span className="offering_detail_title">Update Sub Category</span>
                            </div>
                            <div className="editprofile_content">
                                <div className="form_content_editprofile edit_profile_form_fields_wrapper">
                                    <div >
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="mt-2">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" placeholder="Enter SubCategory name" name="category_name" onChange={(e) => this.handleChange(e)} value={this.state.category_name} />
                                                        {errors && isSubmited && <span className="error-message">{errors.applicationName}</span>}
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
                                                        <span>{this.state.iconName}</span>
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

UpdateSubCategoryComponent.propTypes = {
    handleFormSubmit: PropTypes.func,
    updateAppRes: PropTypes.any,
    doAllCountryRes: PropTypes.any,
    allUsersRes: PropTypes.any,
    doUploadAppIconRes: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
    updateAppRes: doUpdateSubAppRes,
    doAllCountryRes: doAllCountryRes,
    allUsersRes: doUserAllRes,
    doUploadAppIconRes: doUploadAppIconRes
});

function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(submitUpdateSubCategory(data)),
        getAllCountry: () => dispatch(getAllCountry()),
        getAllUsers: () => dispatch(getAllUsers()),
        uploadImage: (file) => dispatch(uploadAppIcon(file)),
    };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UpdateSubCategoryComponent);
