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
import { Link } from 'react-router-dom';
import {InputTextarea} from 'primereact/inputtextarea';
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';
import moment from 'moment';
import {MultiSelect} from 'primereact/multiselect';
import {InputText} from "primereact/inputtext";
import {Checkbox} from 'primereact/checkbox';
import {InputSwitch} from 'primereact/inputswitch';
import {FileUpload} from 'primereact/fileupload';

import {Growl} from 'primereact/growl';
const editorArray = [{'value':"editor",'name':""}];
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
            editor: true,
            uploader1: true,
            editor1: false,
            uploader2: false,
            uploader3: false,
            editor2: false,
            editor3: false,
            embed: false,
            embed1: false,
            embed2: true,
            embed3: false,
            quote: false,
            quote1: false,
            quote2: false,
            quote3: true,
            showMenu: false,
            showMenuSection: false,
            date:new Date(),
            authorInput:false,
            authorSelect:true,
            comment:true,
            editorArray:editorArray
        }
        
        // this.editorBtn = this.editorBtn.bind(this);
        // this.uploaderBtn = this.uploaderBtn.bind(this);
        // // this.uploaderBtn2 = this.uploaderBtn2.bind(this);
        // // this.uploaderBtn3 = this.uploaderBtn3.bind(this);
        // // this.editorBtn2 = this.editorBtn2.bind(this);
        // // this.editorBtn3 = this.editorBtn3.bind(this);
        // // this.uploaderBtn1 = this.uploaderBtn1.bind(this);
        // // this.editorBtn1 = this.editorBtn1.bind(this);
        // this.embedBtn = this.embedBtn.bind(this);
        // // this.embedBtn1 = this.embedBtn1.bind(this);
        // // this.embedBtn2 = this.embedBtn2.bind(this);
        // // this.embedBtn3 = this.embedBtn3.bind(this);
        // this.quoteBtn = this.quoteBtn.bind(this);
        // this.quoteBtn1 = this.quoteBtn1.bind(this);
        // this.quoteBtn2 = this.quoteBtn2.bind(this);
        // this.quoteBtn3 = this.quoteBtn3.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.showMenuSection = this.showMenuSection.bind(this);
        this.closeMenuSection = this.closeMenuSection.bind(this);
        this.onBasicUploadAuto = this.onBasicUploadAuto.bind(this);
    }
    showMenu(event) {
        event.preventDefault();
        
        this.setState({ showMenu: true }, () => {
          document.addEventListener('click', this.closeMenu);
        });
      }
      
      closeMenu(event) {
        
        if (!this.dropdownMenu.contains(event.target)) {
          
          this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
          });  
          
        }
      }

      showMenuSection(event) {
        event.preventDefault();
        
        this.setState({ showMenuSection: true }, () => {
          document.addEventListener('click', this.closeMenuSection);
        });
      }
      
      closeMenuSection(event) {
        
        if (!this.dropdownMenusec.contains(event.target)) {
          
          this.setState({ showMenuSection: false }, () => {
            document.removeEventListener('click', this.closeMenuSection);
          });  
          
        }
      }
    selectAuthor = (event) => {
        console.log(event.value)
        if(event.value.name === 'Other'){
            this.setState({
                authorInput:true,
                authorSelect:false
            })
        }else{
            this.setState({
                authorInput:false,
                authorSelect:true
            })
        }
    }
    onBasicUploadAuto(event) {
        this.growl.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode'});
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
        this.props.history.push('/content-list');
    }
    uploaderBtn = () => {	
        editorArray.push({
            'value':'uploader','name':""
        })
        this.setState({
            editorArray:editorArray,
            quote:!this.state.quote
        })
    }
    editorBtn = () => {		
        editorArray.push({
            'value':'editor','name':""
        })
        this.setState({
            editorArray:editorArray,
            quote:!this.state.quote
        })
        console.log(this.state.editorArray)
    }
    embedBtn = () => {		
        editorArray.push({
            'value':'embed','name':""
        })  
        this.setState({
            editorArray:editorArray,
            quote:!this.state.quote
        })
    }
    quoteBtn = () => {	
        editorArray.push({
            'value':'quote','name':""
        })	
        this.setState({
            editorArray:editorArray,
            quote:!this.state.quote
        })  
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
    handleEditorChange(e,index){
        console.log(e)
        this.state.editorArray.map((editor, sidx) => {
            if(sidx === index){
                editor.name = e.htmlValue;
            }
            
          });
        this.setState({ editorArray: this.state.editorArray });
    }
    handleEmbadeChange(e,index){
        console.log(e.target.value)
        this.state.editorArray.map((editor, sidx) => {
            if(sidx === index){
                editor.name = e.target.value;
            }
            
          });
        this.setState({ editorArray: this.state.editorArray });
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
    remove = (index) =>{
        editorArray.splice(index,1);
        this.setState({
            editorArray:editorArray,
            quote:!this.state.quote
        }) 
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
        const allContent = [
            {name: 'All Articles'},
            {name: 'All Sounds'},
        ];

        const allSection = [
            {name: 'News'},
            {name: 'KPIs Market'},
            {name: 'Birds'},
            {name: 'Pigs'},
            {name: 'Ruminants'},
            {name: 'Aqua'},
            {name: 'Grains'},
            {name: 'IMPORTS STATS'},
            {name: 'ENZYMES '},
            {name: 'MINERALS '},
            {name: 'EUBIOTICS '},
            {name: 'METIONINA '},
            {name: 'COMPETITION'},
            {name: 'PODCASTS'},

        ];     
        
        const authorSection = [
            {name: 'Other'},
            {name: 'Team'},
            {name: 'GuilhermeFray'},
        ];  

        const { uploader } = this.state;       
        const { editor } = this.state;
        const { uploader2 } = this.state;       
        const { editor2 } = this.state;
        const { uploader1 } = this.state;  
        const { uploader3 } = this.state;    
        const { editor1 } = this.state;
        const { editor3 } = this.state;
        const { embed } = this.state;
        const { embed1 } = this.state;
        const { embed2 } = this.state;
        const { embed3 } = this.state;
        const { quote } = this.state;
        const { quote1 } = this.state;
        const { quote2 } = this.state;
        const { quote3 } = this.state;
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
                                    <span className="createprofile_go_back">Back to Content List</span>
                                </div>
                                <span className="offering_detail_title">Add Content</span>
                            </div>
                            
                                             
                            <div className="row">
                                <div className="col-9 col-md-9">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="mt-2">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Title of your article" name="applicationName" onChange={(e) => this.handleChange(e)} />
                                                    {errors && isSubmited && <span className="error-message">{errors.applicationName}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.editorArray.map((editorVal, index) => (
                                    <div className="editprofile_content " key={index}>
                                        <div className="form_content_editprofile edit_profile_form_fields_wrapper">
                                        <div className="btn_box_main">
                                            <div>
                                                <p className="ever_element pull-left" ><i className="fa fa-plus-circle"></i> Add An element</p>
                                                 
                                            </div>
                                            <div className="box_for_tabs">
                                                <p className="tabs_icons" onClick={() => this.editorBtn()}><i className="fa fa-pencil"></i> Editor</p>
                                                <p className="tabs_icons" onClick={this.uploaderBtn}><i className="fa fa-image"></i> Image</p>
                                                <p className="tabs_icons" onClick={this.embedBtn}><i className="fa fa-code"></i> Embed</p>
                                                <p className="tabs_icons" onClick={this.quoteBtn}><i className="fa fa-quote-right"></i> Quotations</p>
                                            </div>
                                             
                                        </div>
                                        <button className="pull-right btn-dark" onClick={() => this.remove(index)}><i className="fa fa-trash"></i></button>
                                            <div> 
                                                <div className="row">                          
                                                    <div className="col-12">
                                                    { 'editor' === editorVal.value && (
                                                        <Editor className="editor_cls" style={{height:'320px'}} value={editorVal.name} onTextChange={(e)=>this.handleEditorChange(e,index)}/>
                                                    )}
                                                    </div>
                                                    <div className="col-12">
                                                        { 'uploader' === editorVal.value && (
                                                        
                                                        <div className="image_uploader_main">
                                                            <i className="fa fa-camera upload_icon"></i>
                                                            <ImagesUploader
                                                            url="http://13.90.215.196:3000/api/file_upload"
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
                                                        <div className="mt-2">
                                                            { 'embed' === editorVal.value && (
                                                            
                                                            <div className="image_uploader_main">
                                                                <i className="fa fa-code upload_icon"></i>
                                                                <p>Paste the embedded code below</p>
                                                                <InputTextarea  onChange={(e)=>this.handleEmbadeChange(e,index)} rows={4} className="text_area_article"></InputTextarea>
                                                                
                                                            </div>
                                                            )}
                                                        </div>
                                                    </div>     
                                                    <div className="col-12">
                                                        <div className="mt-2">
                                                            { 'quote' === editorVal.value && (
                                                            
                                                            <div className="image_uploader_main">
                                                                <i className="fa fa-quote-right upload_icon"></i>
                                                                <p>Quotations</p>
                                                                <InputTextarea rows={4}  onChange={(e)=>this.handleEmbadeChange(e,index)} className="text_area_article"></InputTextarea>
                                                                
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>                                      
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    ))}   <br />                         
                                    <div className="row">
                                        <div class="col-12">
                                            <button onClick={()=> this.handleSubmit()} className="btn btn-primary login_button" >Submit</button>
                                        </div>
                                    </div>  
                                </div>
                                <div className="col-3 col-md-3">
                                    <div className="editprofile_content ">
                                        <div className="form_content_editprofile edit_profile_form_fields_wrapper">
                                            <div className="row">
                                                <div className="col-12 form-group">
                                                    <h3 className="heading-sidebar">Information</h3>
                                                </div>
                                            </div>          
                                            <div className="row">
                                                <div className="col-12 form-group">
                                                    <label>Type:</label>
                                                    <Dropdown className="all_sec_dropdown form-drop-control" optionLabel="name" value={this.state.allContent} options={allContent} onChange={(e) => {this.setState({allContent: e.value})}} placeholder="All Content"/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 form-group">
                                                    <label>Appear at:</label>
                                                    <MultiSelect className="all_sec_dropdown all_section_tab form-drop-control" optionLabel="name" value={this.state.allSection} options={allSection} onChange={(e) => {this.setState({allSection: e.value})}} style={{minWidth:'100%'}} filter={true} filterPlaceholder="Search" placeholder="Choose" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 form-group">
                                                    <label>Date:</label>
                                                    <Calendar className="all_sec_dropdown  form-drop-control" value={this.state.date} onChange={(e) => this.setState({date: e.value})} showIcon={true} showTime={true} showSeconds={true}/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 form-group">
                                                    <label>Author:</label>
                                                    {this.state.authorSelect && 
                                                        <Dropdown className="all_sec_dropdown all_section_tab form-drop-control" optionLabel="name" value={this.state.authorSection} options={authorSection} onChange={(e) => this.selectAuthor(e)} placeholder="Author"/>
                                                    }

                                                    {this.state.authorInput && 
                                                        <div className="p-inputgroup">
                                                            <InputText className="all_sec_dropdown form-control" placeholder="Type Author Name" name="authorName" onChange={(e) => this.selectAuthor(e)}/>
                                                            <Button icon="pi pi-times" className="p-button-danger" onClick={() => this.setState({
                                                                authorInput:false,
                                                                authorSelect:true})}/>
                                                        </div>
                                                    }
                                                </div>
                                            </div> 
                                            <div className="row">
                                                <div className="col-12 form-group">
                                                    <label>Your List item:</label><br />
                                                    <label><small>Highlight</small></label><br />
                                                    <Checkbox checked={this.state.checked} onChange={e => this.setState({checked: e.checked})} />
                                                    <label htmlFor="heighlight" className="p-checkbox-label"> Put at the top of the list</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 form-group">
                                                    <label tooltip="This element display depends on the template and / or the platform used" tooltipoptions={{position: 'top'}}>Resume:</label>
                                                    <InputTextarea rows={5} cols={30} value={this.state.resume} onChange={(e) => this.setState({resume: e.target.value})} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 form-group">
                                                    <label>Comments:</label><br />
                                                    <InputSwitch checked={this.state.comment} onChange={(e) => this.setState({comment: e.value})} />
                                                </div>
                                            </div>
                                            
                                            <div className="row">
                                                <div className="col-12 form-group">
                                                    <label> PDF attached:</label><br />
                                                    
                                                    <FileUpload mode="basic" name="demo[]" uurl="./upload.php" accept="*" maxFileSize={1000000} onUpload={this.onBasicUploadAuto} auto={true} chooseLabel="Search For" />

                                                    <Growl ref={(el) => { this.growl = el; }}></Growl>
                                                </div>
                                            </div>
                                            
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
