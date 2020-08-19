import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './bannerCreate.css';
import LayoutWrapper from '../../component/LayoutWrapper/';
import { getAllUsers, doUserAllRes } from '../../action/userActions';
import { submitCreateBanner, doCreateBannerRes } from '../../action/createBannerActions';
import { uploadAppIcon, doUploadAppIconRes } from '../../action/uploadAppIconActions';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
import BackIcon from '../../assets/images/icon-left.svg';
import validate from './formValidation';
import {FileUpload} from 'primereact/fileupload';
class BannerCreateComponent extends React.PureComponent {
    _isMounted = false;

    // constructor function
    constructor(props) {
        super(props);
        this.state = {
            isLoader: true,
            isSubmited: false,
            title: '',
            description: '',
            icon: '',
            countryList: [],
            usersList: [],
            selectedCountry: null,
            selectedUser: null,
            file: null,
            categoryTitle:'Create Category',
            iconName:'Choose Icon'
        }
    }

    // on component load function call
    componentDidMount() {
        // this.props.getAllUsers();
        
        
        this.setState({
            isLoader: false,
        });
    }

    // on component receive new props
    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoader: false
        });
        console.log("Check nextProps", nextProps)

        // get All user list
        if(nextProps.allUsersRes){
            if (nextProps.allUsersRes.data && nextProps.allUsersRes.data.allUser) {
				if (nextProps.allUsersRes.data.allUser.success===true) {
                    this.setState({
                        usersList: nextProps.allUsersRes.data.allUser.data
                    });
				}
			}
        }

        // upload icon response
        if(nextProps.doUploadAppIconRes){
            if (nextProps.doUploadAppIconRes.data && nextProps.doUploadAppIconRes.data.uploadAppIcon) {
				if (nextProps.doUploadAppIconRes.data.uploadAppIcon.success===true) {
                    this.setState({
                        icon: nextProps.doUploadAppIconRes.data.uploadAppIcon.imageurl
                    });
				}
			}
        }

        // banner create response
        if(nextProps.createBannerRes){
            if(nextProps.createBannerRes.data.createBanner ){
                if(nextProps.createBannerRes.data.createBanner.success === true){
                    this.setState({
                        isLoader: false
                    });

                    // on success route to banner list
                    this.props.history.push('/banner-list');
                } else {
                    setTimeout(() => { this.setState({
                        isLoader: false
                    }); }, 3000);
                }
            }
        }
    }

    // back to banner list page
    handleBack = () => {
        this.props.history.push('/banner-list');
    }


    // banner create form submit function
    handleSubmit = () => {
        console.log("hello")
        this.setState({
          isSubmited: true,
        //   isLoader:true
        }, () => { });
        validate(this.state);
        const errors = validate(this.state);
        if (Object.keys(errors).length === 0) {
            let payloadReq = {
                title		: this.state.title,
                description	: this.state.description,
                banner_image: this.state.icon
            }

            // submit action function
            this.props.handleFormSubmit(payloadReq);
        }
    }

    // during upload process show loader
    fileUploadProcess= () =>{
        console.log("hello");
        this.setState({
            isLoader:true
        })
    }

    // upload function
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

    // input on change function
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // on file change function
    // handleFileChange = (e) => {
    //     this.setState({
    //         file: e.target.files
    //     });
    //     // upload image action call
    //     this.props.uploadImage(e.target.files);
    // }
    
    // userChange = (item) => {
    //     this.setState({
    //         selectedUser: item
    //     });

    // }
    render() {

        // page header title
        const Header = (<div className="offer_head">Create User</div>);
        
        // loader spinner
        const spinner = <span><img src={loaderImg} alt="" /></span>;

        // validation errors
        const errors = validate(this.state);


        // state data get
        const { isSubmited, usersList } = this.state;

        // let countryListOptionsItems = [];
        const userListOptions = [];

        // userlist select option setup
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
                                    <span className="createprofile_go_back">Back to Category</span>
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
                                                        <input type="text" className="form-control" placeholder="Enter name" name="title" onChange={(e) => this.handleChange(e)} />
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
                                                            {errors && isSubmited && <span className="error-message err-msg">{errors.icon}</span>}
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
                                                        <textarea  className="form-control" placeholder="Enter Description" name="description" onChange={(e) => this.handleChange(e)} />
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
BannerCreateComponent.propTypes = {
    handleFormSubmit: PropTypes.func,
    createBannerRes: PropTypes.any,
    allUsersRes: PropTypes.any,
    doUploadAppIconRes: PropTypes.any
};

// setup response function
const mapStateToProps = createStructuredSelector({
    createBannerRes: doCreateBannerRes,
    allUsersRes: doUserAllRes,
    doUploadAppIconRes: doUploadAppIconRes
});

// dispatch function
function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(submitCreateBanner(data)),
        getAllUsers: () => dispatch(getAllUsers()),
        uploadImage: (file) => dispatch(uploadAppIcon(file)),
    };
}

// connect component to redux store
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BannerCreateComponent);
