import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './novusBiArticle.css';
import LayoutWrapper from '../../component/LayoutWrapper/';
import { getAllCountry, doAllCountryRes } from '../../action/novusBiArticleActions';
import { getAllUsers, doUserAllRes } from '../../action/userActions';
import { submitnovusBiArticle, donovusBiArticleRes } from '../../action/novusBiArticleActions';
import { uploadAppIcon, doUploadAppIconRes } from '../../action/uploadAppIconActions';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
import BackIcon from '../../assets/images/icon-left.svg';
import validate from './formValidation';
import Select from 'react-select';
import {Editor} from "primereact/editor";
import {Button} from "primereact/button";
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

class NovusBiArticleComponent extends React.PureComponent {
    _isMounted = false;
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
            file: null,
            uploader: false,
            Videouploader: false,
            editor: true,
            uploader1: true,
            Videouploader1: false,
            editor1: false,
            uploader2: false,
            Videouploader2: true,
            editor2: false,
            // text1 : '<div>Type Here !!!</div><div><br></div>',
            // text2 : ''
        }
        this.editorBtn = this.editorBtn.bind(this);
        this.uploaderBtn = this.uploaderBtn.bind(this);
        this.VideouploaderBtn = this.VideouploaderBtn.bind(this);
        this.uploaderBtn2 = this.uploaderBtn2.bind(this);
        this.VideouploaderBtn2 = this.VideouploaderBtn2.bind(this);
        this.editorBtn2 = this.editorBtn2.bind(this);
        this.uploaderBtn1 = this.uploaderBtn1.bind(this);
        this.VideouploaderBtn1 = this.VideouploaderBtn1.bind(this);
        this.editorBtn1 = this.editorBtn1.bind(this);
    }
    componentDidMount() {
        this.props.getAllCountry();
        // this.props.getAllUsers();
        this.setState({
            isLoader: false,
        });
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.doAllCountryRes){
            if(nextProps.doAllCountryRes.data.countryList ){
                if(nextProps.doAllCountryRes.data.countryList.success === true){
                    this.setState({
                        countryList: nextProps.doAllCountryRes.data.countryList.countriesList
                    });
                }
            }
        }
        if(nextProps.allUsersRes){
            if (nextProps.allUsersRes.data && nextProps.allUsersRes.data.allUser) {
				if (nextProps.allUsersRes.data.allUser.success===true) {
                    this.setState({
                        usersList: nextProps.allUsersRes.data.allUser.data
                    });
				}
			}
        }
        if(nextProps.doUploadAppIconRes){
            if (nextProps.doUploadAppIconRes.data && nextProps.doUploadAppIconRes.data.uploadAppIcon) {
				if (nextProps.doUploadAppIconRes.data.uploadAppIcon.success===true) {
                    this.setState({
                        icon: nextProps.doUploadAppIconRes.data.uploadAppIcon.imageurl
                    });
				}
			}
        }
        if(nextProps.ArticleAppRes){
            if(nextProps.ArticleAppRes.data.ArticleApplication ){
                if(nextProps.ArticleAppRes.data.ArticleApplication.success === true){
                    this.setState({
                        isLoader: false
                    });
                    this.props.history.push('/applications');
                } else {
                    setTimeout(() => { this.setState({
                        isLoader: false
                    }); }, 3000);
                }
            }
        }
    }
    handleBack = () => {
        this.props.history.push('/novus-bi');
    }
    uploaderBtn() {		
        this.setState({
            uploader: true,
            editor: false,
            Videouploader: false,
        });    
    }
    VideouploaderBtn() {		
        this.setState({
            uploader: false,
            editor: false,
            Videouploader: true,
        });    
    }
    editorBtn() {		
        this.setState({
            editor: true,
            uploader: false,
            Videouploader: false,
        });    
    }

    uploaderBtn2() {		
        this.setState({
            uploader2: true,
            editor2: false,
            Videouploader2: false,
        });    
    }
    VideouploaderBtn2() {		
        this.setState({
            uploader2: false,
            editor2: false,
            Videouploader2: true,
        });    
    }
    editorBtn2() {		
        this.setState({
            editor2: true,
            uploader2: false,
            Videouploader2: false,
        });    
    }

    uploaderBtn1() {		
        this.setState({
            uploader1: true,
            editor1: false,
            Videouploader1: false,
        });    
    }
    VideouploaderBtn1() {		
        this.setState({
            uploader1: false,
            editor1: false,
            Videouploader1: true,
        });    
    }
    editorBtn1() {		
        this.setState({
            editor1: true,
            uploader1: false,
            Videouploader1: false,
        });    
    }

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
            selectedCountry: item
        });
    }
    userChange = (item) => {
        this.setState({
            selectedUser: item
        });

    }
    renderHeader() {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
            </span>
        );
    }
    render() {
        const { uploader } = this.state;
        const { Videouploader } = this.state;        
        const { editor } = this.state;
        const { uploader2 } = this.state;
        const { Videouploader2 } = this.state;        
        const { editor2 } = this.state;
        const { uploader1 } = this.state;
        const { Videouploader1 } = this.state;        
        const { editor1 } = this.state;
        const header = this.renderHeader();

        const Header = (<div className="offer_head">Create User</div>);
        
        const spinner = <span><img src={loaderImg} alt="" /></span>;
        const errors = validate(this.state);
        const { isSubmited, countryList, usersList } = this.state;

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
                        <div className="edit_profile_content_wrapper main_content_bx">
                            <div className="createprofile_heading">
                                <div className="createprofile_back_icon_text"  onClick={this.handleBack}>
                                    <img src={BackIcon} alt="" className="createprofile_back_icon" />
                                    <span className="createprofile_go_back">Back to Novus Bi</span>
                                </div>
                                <span className="offering_detail_title">Novus Bi Article</span>
                            </div>
                            
                            <div className="editprofile_content ">
                                <div className="form_content_editprofile edit_profile_form_fields_wrapper">
                                <div className="btn_box_main">
                                    <div>
                                        <p className="ever_element"><i className="fa fa-plus-circle"></i> Add An element</p>
                                    </div>
                                    <div className="box_for_tabs">
                                        <p className="tabs_icons" onClick={this.editorBtn}><i className="fa fa-pencil"></i> Editor</p>
                                        <p className="tabs_icons" onClick={this.uploaderBtn}><i className="fa fa-image"></i> Image</p>
                                        <p className="tabs_icons" onClick={this.VideouploaderBtn}><i className="fa fa-video"></i> Video</p>
                                    </div>  
                                </div>
                                    <div>
                                        <div className="row">                                                                                       
                                            <div className="col-12">
                                            { editor && (
                                            <Editor className="editor_cls" style={{height:'320px'}} value={this.state.text1} onTextChange={(e)=>this.setState({text1:e.htmlValue})}/>
                                            )}
                                            </div>
                                            <div className="col-12">
                                                { uploader && (
                                                
                                                <div className="image_uploader_main">
                                                    <i className="fa fa-camera upload_icon"></i>
                                                    <ImagesUploader
                                                    url="http://localhost:3000/notmultiple"
                                                    optimisticPreviews
                                                    multiple={false}
                                                    onLoadEnd={(err) => {
                                                        if (err) {
                                                            console.error(err);
                                                        }
                                                    }} />
                                                </div>
                                                )}
                                                </div> 
                                                <div className="col-12">
                                                        { Videouploader && (
                                                
                                                        <div className="image_uploader_main">
                                                            <i className="fa fa-video upload_icon"></i>
                                                            <ImagesUploader
                                                            url="http://localhost:3000/notmultiple"
                                                            optimisticPreviews
                                                            multiple={false}
                                                            onLoadEnd={(err) => {
                                                                if (err) {
                                                                    console.error(err);
                                                                }
                                                            }} />
                                                        </div>
                                                        )}
                                                </div>                                             
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="editprofile_content">
                                <div className="form_content_editprofile edit_profile_form_fields_wrapper">
                                <div className="btn_box_main">
                                    <div>
                                        <p className="ever_element"><i className="fa fa-plus-circle"></i> Add An element</p>
                                    </div>
                                    <div className="box_for_tabs">
                                        <p className="tabs_icons" onClick={this.editorBtn1}><i className="fa fa-pencil"></i> Editor</p>
                                        <p className="tabs_icons" onClick={this.uploaderBtn1}><i className="fa fa-image"></i> Image</p>
                                        <p className="tabs_icons" onClick={this.VideouploaderBtn1}><i className="fa fa-video"></i> Video</p>
                                    </div>  
                                </div>
                                    <div>
                                        <div className="row">                                                                                       
                                            <div className="col-12">
                                            <div className="mt-2">
                                            { editor1 && (
                                            <Editor className="editor_cls" style={{height:'320px'}} value={this.state.text1} onTextChange={(e)=>this.setState({text1:e.htmlValue})}/>
                                            )}
                                            </div>
                                            </div>
                                            <div className="col-12">
                                            <div className="mt-2">
                                                { uploader1 && (
                                                
                                                <div className="image_uploader_main">
                                                    <i className="fa fa-camera upload_icon"></i>
                                                    <ImagesUploader
                                                    url="http://localhost:3000/notmultiple"
                                                    optimisticPreviews
                                                    multiple={false}
                                                    onLoadEnd={(err) => {
                                                        if (err) {
                                                            console.error(err);
                                                        }
                                                    }} />
                                                </div>
                                                )}
                                                </div>
                                                </div> 
                                                <div className="col-12">
                                                    <div className="mt-2">
                                                        { Videouploader1 && (
                                                        
                                                        <div className="image_uploader_main">
                                                            <i className="fa fa-video upload_icon"></i>
                                                            <ImagesUploader
                                                            url="http://localhost:3000/notmultiple"
                                                            optimisticPreviews
                                                            multiple={false}
                                                            onLoadEnd={(err) => {
                                                                if (err) {
                                                                    console.error(err);
                                                                }
                                                            }} />
                                                        </div>
                                                        )}
                                                    </div>
                                                </div>                                             
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="editprofile_content">
                                <div className="form_content_editprofile edit_profile_form_fields_wrapper">
                                <div className="btn_box_main">
                                    <div>
                                        <p className="ever_element"><i className="fa fa-plus-circle"></i> Add An element</p>
                                    </div>
                                    <div className="box_for_tabs">
                                        <p className="tabs_icons" onClick={this.editorBtn2}><i className="fa fa-pencil"></i> Editor</p>
                                        <p className="tabs_icons" onClick={this.uploaderBtn2}><i className="fa fa-image"></i> Image</p>
                                        <p className="tabs_icons" onClick={this.VideouploaderBtn2}><i className="fa fa-video"></i> Video</p>
                                    </div>  
                                </div>
                                    <div>
                                        <div className="row">                                                                                       
                                            <div className="col-12">
                                            <div className="mt-2">
                                            { editor2 && (
                                            <Editor className="editor_cls" style={{height:'320px'}} value={this.state.text1} onTextChange={(e)=>this.setState({text1:e.htmlValue})}/>
                                            )}
                                            </div>
                                            </div>
                                            <div className="col-12">
                                            <div className="mt-2">
                                                { uploader2 && (
                                                
                                                <div className="image_uploader_main">
                                                    <i className="fa fa-camera upload_icon"></i>
                                                    <ImagesUploader
                                                    url="http://localhost:3000/notmultiple"
                                                    optimisticPreviews
                                                    multiple={false}
                                                    onLoadEnd={(err) => {
                                                        if (err) {
                                                            console.error(err);
                                                        }
                                                    }} />
                                                </div>
                                                )}
                                                </div>
                                                </div> 
                                                <div className="col-12">
                                                    <div className="mt-2">
                                                        { Videouploader2 && (
                                                        
                                                        <div className="image_uploader_main">
                                                            <i className="fa fa-video upload_icon"></i>
                                                            <ImagesUploader
                                                            url="http://localhost:3000/notmultiple"
                                                            optimisticPreviews
                                                            multiple={false}
                                                            onLoadEnd={(err) => {
                                                                if (err) {
                                                                    console.error(err);
                                                                }
                                                            }} />
                                                        </div>
                                                        )}
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

NovusBiArticleComponent.propTypes = {
    handleFormSubmit: PropTypes.func,
    ArticleAppRes: PropTypes.any,
    doAllCountryRes: PropTypes.any,
    allUsersRes: PropTypes.any,
    doUploadAppIconRes: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
    ArticleAppRes: donovusBiArticleRes,
    doAllCountryRes: doAllCountryRes,
    allUsersRes: doUserAllRes,
    doUploadAppIconRes: doUploadAppIconRes
});

function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(submitnovusBiArticle(data)),
        getAllCountry: () => dispatch(getAllCountry()),
        getAllUsers: () => dispatch(getAllUsers()),
        uploadImage: (file) => dispatch(uploadAppIcon(file)),
    };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(NovusBiArticleComponent);
