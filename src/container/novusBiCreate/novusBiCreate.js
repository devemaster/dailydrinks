import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './novusBiCreate.css';
import LayoutWrapper from '../../component/LayoutWrapper/';
import { getAllUsers, doUserAllRes } from '../../action/userActions';
import { submitCreateCategory, doCreateCategoryRes } from '../../action/createCategoryActions';
import { uploadAppIcon, doUploadAppIconRes } from '../../action/uploadAppIconActions';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
import BackIcon from '../../assets/images/icon-left.svg';
import validate from './formValidation';
import {FileUpload} from 'primereact/fileupload';
class NovusBiCreateComponent extends React.PureComponent {
    _isMounted = false;

    // constructor function
    constructor(props) {
        super(props);
        this.state = {
            isLoader: true,
            isSubmited: false,
            category_name: '',
            cat_id: 0,
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
        console.log(this.props.location)
        
        if(this.props.location.state){
            const appDetails = this.props.location.state.appData;
            this.setState({
                appData: appDetails,
            }, () => {
                this.setState({
                    cat_id: this.state.appData.cat_id,
                    categoryTitle:'Create Sub Category'
                    // countries: this.state.appData.selected_countries
                })
            });
        }
        
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

        // user list response
        if(nextProps.allUsersRes){
            if (nextProps.allUsersRes.data && nextProps.allUsersRes.data.allUser) {
				if (nextProps.allUsersRes.data.allUser.success===true) {
                    this.setState({
                        usersList: nextProps.allUsersRes.data.allUser.data
                    });
				}
			}
        }

        // image upload response
        if(nextProps.doUploadAppIconRes){
            if (nextProps.doUploadAppIconRes.data && nextProps.doUploadAppIconRes.data.uploadAppIcon) {
				if (nextProps.doUploadAppIconRes.data.uploadAppIcon.success===true) {
                    this.setState({
                        icon: nextProps.doUploadAppIconRes.data.uploadAppIcon.imageurl
                    });
				}
			}
        }

        // create category response
        if(nextProps.createAppRes){
            if(nextProps.createAppRes.data.createCategory ){
                if(nextProps.createAppRes.data.createCategory.success === true){
                    this.setState({
                        isLoader: false
                    });
                    
                    // after success got to category list page 
                    this.props.history.push('/category-list');
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
        this.props.history.push('/category-list');
    }

    // form submit function
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
                parent_id: this.state.cat_id,
                category_name: this.state.category_name,
                icon: this.state.icon
            }

            // category create action call
            this.props.handleFormSubmit(payloadReq);
        }
    }

    // file uplaod on progress loader show
    fileUploadProcess= () =>{
        console.log("hello");
        this.setState({
            isLoader:true
        })
    }

    // image uplaod 
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

    // input on change
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // select file on change
    handleFileChange = (e) => {
        this.setState({
            file: e.target.files
        });

        // image upload action call
        this.props.uploadImage(e.target.files);
    }
    
    // on user select change
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

        // validations error
        const errors = validate(this.state);

        // get data from state
        const { isSubmited,usersList } = this.state;

        // let countryListOptionsItems = [];
        const userListOptions = [];
        // set user list on select option
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
                                                        <input type="text" className="form-control" placeholder="Enter name" name="category_name" onChange={(e) => this.handleChange(e)} />
                                                        {errors && isSubmited && <span className="error-message">{errors.category_name}</span>}
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
NovusBiCreateComponent.propTypes = {
    handleFormSubmit: PropTypes.func,
    createAppRes: PropTypes.any,
    allUsersRes: PropTypes.any,
    doUploadAppIconRes: PropTypes.any
};

// setup response function
const mapStateToProps = createStructuredSelector({
    createAppRes: doCreateCategoryRes,
    allUsersRes: doUserAllRes,
    doUploadAppIconRes: doUploadAppIconRes
});

// dispatch function
function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(submitCreateCategory(data)),
        getAllUsers: () => dispatch(getAllUsers()),
        uploadImage: (file) => dispatch(uploadAppIcon(file)),
    };
}


// connect component to redux store
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(NovusBiCreateComponent);
