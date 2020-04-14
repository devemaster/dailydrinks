import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { reduxForm } from 'redux-form';
import './updateBanner.css';
import LayoutWrapper from '../../component/LayoutWrapper/';
import { getAllCountry, doAllCountryRes } from '../../action/createUserActions';
import { getAllUsers, doUserAllRes } from '../../action/userActions';
import { submitUpdateBanner, doUpdateBannerRes } from '../../action/updateBannerActions';
import { uploadAppIcon, doUploadAppIconRes } from '../../action/uploadAppIconActions';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
import BackIcon from '../../assets/images/icon-left.svg';
import validate from './formValidation';
import {FileUpload} from 'primereact/fileupload';


let isDone = false;
class UpdateBannerComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLoader: true,
            isSubmited: false,
            title: '',
            description: '',
            icon: '',
            countries: '',
            countryList: [],
            usersList: [],
            selectedCountry: null,
            file: null,
            appData: null,
            iconName:'Choos Icon'
        }
    }
    componentDidMount() {
        // Get country list //
        this.props.getAllCountry();
        const appDetails = this.props.location.state.appData;
        this.setState({
            appData: appDetails, 
        }, () => {
             let iconNameArr =    this.state.appData.banner_image.split('/');
             console.log(iconNameArr)
            this.setState({
                banner_id:this.state.appData.banner_id,
                title: this.state.appData.title,
                description: this.state.appData.description,
                icon: this.state.appData.banner_image,
                iconName:iconNameArr[3]
                // countries: this.state.appData.selected_countries
            })
        });
        this.setState({
            isLoader: false,
        });
    }
    componentWillReceiveProps(nextProps) {
        console.log("Props cat", nextProps)
        this.setState({
            isLoader:false
        })
        if(nextProps.doUploadAppIconRes){
            if (nextProps.doUploadAppIconRes.data && nextProps.doUploadAppIconRes.data.uploadAppIcon) {
				if (nextProps.doUploadAppIconRes.data.uploadAppIcon.success===true) {
                    this.setState({
                        icon: nextProps.doUploadAppIconRes.data.uploadAppIcon.imageurl
                    });
				}
			}
        }
        if(nextProps.doUpdateBannerRes){
            if(nextProps.doUpdateBannerRes && nextProps.doUpdateBannerRes.data){            
                if(nextProps.doUpdateBannerRes.data && nextProps.doUpdateBannerRes.data.updateBanner ){
                    if(nextProps.doUpdateBannerRes.data.updateBanner && nextProps.doUpdateBannerRes.data.updateBanner.success === true && 
                        isDone === true){
                            isDone= false;
                        this.setState({
                            isLoader: false
                        });
                        this.props.history.push('/Banner-list');
                    } 
                }
            }
        }
        
    }
    handleBack = () => {
        this.props.history.push('/Banner-list');
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
                banner_id: this.state.banner_id,
                title: this.state.title,
                description: this.state.description,
                banner_image: this.state.icon,
            }
            isDone = true;
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
            isLoader:true
        })
        this.setState({
            file: e.target.files
        });
        this.props.uploadImage(e.target.files);
    }
    fileUploadProcess= () =>{
        console.log("hello");
        this.setState({
            isLoader:true
        })
    }
    onBasicUploadAuto = (event) => {
        this.setState({
            isLoader:false
        })
        let response = JSON.parse(event.xhr.response)
        if(response.success === true){
            this.setState({
                iconName:response.path,
                icon:response.imageurl,
                iconError: ''
            })
        }else{
            this.setState({
                iconError:response.message
            })
        }
        // this.growl.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode'});
    }
    // countryChange = (item) => {
    //     this.setState({
    //         selectedCountry: item,
    //         country: item.value
    //     });
    // }
    render() {
        const Header = (<div className="offer_head">Update Banner</div>);
        
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
                <LayoutWrapper title="Create Banner" header={Header} >
                    <Loader show={this.state.isLoader} message={spinner}>
                        <div className="edit_profile_content_wrapper">
                            <div className="createprofile_heading">
                                <div className="createprofile_back_icon_text"  onClick={this.handleBack}>
                                    <img src={BackIcon} alt="" className="createprofile_back_icon" />
                                    <span className="createprofile_go_back">Back to Banner</span>
                                </div>
                                <span className="offering_detail_title">Update Banner</span>
                            </div>
                            <div className="editprofile_content">
                                <div className="form_content_editprofile edit_profile_form_fields_wrapper">
                                    <div >
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="mt-2">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" placeholder="Enter Title" name="title" onChange={(e) => this.handleChange(e)} value={this.state.title} />
                                                        {errors && isSubmited && <span className="error-message">{errors.title}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="row">
                                                    <div className="col-8">
                                                        <div className="mt-2">
                                                            <div className="form-group">
                                                                <FileUpload  onProgress={this.fileUploadProcess} mode="basic" name="icon" url="http://3.132.68.85:3000/api/file_upload" accept="image/*" maxFileSize={1000000} onUpload={this.onBasicUploadAuto} auto={true} chooseLabel={this.state.iconName} />
                                                                
                                                                {errors && isSubmited && <span className="error-message">{errors.icon}</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <img src={this.state.icon} style={{width: 60, height: 60}} alt=""/>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="col-12">
                                                <div className="mt-2">
                                                    <div className="form-group">
                                                        <textarea  className="form-control" placeholder="Enter Description" name="description" onChange={(e) => this.handleChange(e)} value={this.state.description}/>
                                                        {errors && isSubmited && <span className="error-message">{errors.description}</span>}
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

UpdateBannerComponent.propTypes = {
    handleFormSubmit: PropTypes.func,
    doUpdateBannerRes: PropTypes.any,
    doAllCountryRes: PropTypes.any,
    allUsersRes: PropTypes.any,
    doUploadAppIconRes: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
    doUpdateBannerRes: doUpdateBannerRes,
    doAllCountryRes: doAllCountryRes,
    allUsersRes: doUserAllRes,
    doUploadAppIconRes: doUploadAppIconRes
});

function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(submitUpdateBanner(data)),
        getAllCountry: () => dispatch(getAllCountry()),
        getAllUsers: () => dispatch(getAllUsers()),
        uploadImage: (file) => dispatch(uploadAppIcon(file)),
    };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UpdateBannerComponent);
