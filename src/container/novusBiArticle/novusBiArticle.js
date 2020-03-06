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
            // text1 : '<div>Type Here !!!</div><div><br></div>',
            // text2 : ''
        }
        
        this.editorBtn = this.editorBtn.bind(this);
        this.uploaderBtn = this.uploaderBtn.bind(this);
        this.uploaderBtn2 = this.uploaderBtn2.bind(this);
        this.uploaderBtn3 = this.uploaderBtn3.bind(this);
        this.editorBtn2 = this.editorBtn2.bind(this);
        this.editorBtn3 = this.editorBtn3.bind(this);
        this.uploaderBtn1 = this.uploaderBtn1.bind(this);
        this.editorBtn1 = this.editorBtn1.bind(this);
        this.embedBtn = this.embedBtn.bind(this);
        this.embedBtn1 = this.embedBtn1.bind(this);
        this.embedBtn2 = this.embedBtn2.bind(this);
        this.embedBtn3 = this.embedBtn3.bind(this);
        this.quoteBtn = this.quoteBtn.bind(this);
        this.quoteBtn1 = this.quoteBtn1.bind(this);
        this.quoteBtn2 = this.quoteBtn2.bind(this);
        this.quoteBtn3 = this.quoteBtn3.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.showMenuSection = this.showMenuSection.bind(this);
        this.closeMenuSection = this.closeMenuSection.bind(this);
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
    uploaderBtn() {		
        this.setState({
            uploader: true,
            editor: false,
            quote: false,
            embed: false,
        });    
    }
    editorBtn() {		
        this.setState({
            editor: true,
            uploader: false,
            embed: false,
            quote: false,
        });    
    }

    uploaderBtn2() {		
        this.setState({
            uploader2: true,
            editor2: false,
            embed2: false,
            quote2: false,
        });    
    }
    uploaderBtn3() {		
        this.setState({
            uploader3: true,
            editor3: false,
            embed3: false,
            quote3: false,
        });    
    }
    editorBtn2() {		
        this.setState({
            editor2: true,
            uploader2: false,
            embed2: false,
            quote: false,
        });    
    }
    editorBtn3() {		
        this.setState({
            editor3: true,
            uploader3: false,
            embed3: false,
            quote3: false,
        });    
    }

    uploaderBtn1() {		
        this.setState({
            uploader1: true,
            editor1: false,
            embed1: false,
            quote1: false,
        });    
    }
    editorBtn1() {		
        this.setState({
            editor1: true,
            uploader1: false,
            embed1: false,
            quote1: false,
        });    
    }
    embedBtn() {		
        this.setState({
            embed: true,
            uploader: false,
            editor: false,
            quote: false,
        });    
    }
    embedBtn1() {		
        this.setState({
            embed1: true,
            uploader1: false,
            editor1: false,
            quote1: false,
        });    
    }
    embedBtn2() {		
        this.setState({
            embed2: true,
            uploader2: false,
            editor2: false,
            quote2: false,
        });    
    }
    embedBtn3() {		
        this.setState({
            embed3: true,
            uploader3: false,
            editor3: false,
            quote3: false,
        });    
    }
    quoteBtn() {		
        this.setState({
            quote: true,
            uploader: false,
            editor: false,
            embed: false,
        });    
    }
    quoteBtn1() {		
        this.setState({
            quote1: true,
            uploader1: false,
            editor1: false,
            embed1: false,
        });    
    }
    quoteBtn2() {		
        this.setState({
            quote2: true,
            uploader2: false,
            editor2: false,
            embed2: false,
        });    
    }
    quoteBtn3() {		
        this.setState({
            quote3: true,
            uploader3: false,
            editor3: false,
            embed3: false,
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

                        <div className="all_content_bx">
                            <Dropdown className="all_sec_dropdown" optionLabel="name" value={this.state.allContent} options={allContent} onChange={(e) => {this.setState({allContent: e.value})}} placeholder="All Content"/>

                            <Dropdown className="all_sec_dropdown all_section_tab" optionLabel="name" value={this.state.allSection} options={allSection} onChange={(e) => {this.setState({allSection: e.value})}} placeholder="All Section"/>
                        </div>                  

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
                            
                            <div className="editprofile_content ">
                                <div className="form_content_editprofile edit_profile_form_fields_wrapper">
                                <div className="btn_box_main">
                                    <div>
                                        <p className="ever_element"><i className="fa fa-plus-circle"></i> Add An element</p>
                                    </div>
                                    <div className="box_for_tabs">
                                        <p className="tabs_icons" onClick={this.editorBtn}><i className="fa fa-pencil"></i> Editor</p>
                                        <p className="tabs_icons" onClick={this.uploaderBtn}><i className="fa fa-image"></i> Image</p>
                                        <p className="tabs_icons" onClick={this.embedBtn}><i className="fa fa-code"></i> Embed</p>
                                        <p className="tabs_icons" onClick={this.quoteBtn}><i className="fa fa-quote-right"></i> Quotations</p>
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
                                            <div className="mt-2">
                                                { embed && (
                                                
                                                <div className="image_uploader_main">
                                                    <i className="fa fa-code upload_icon"></i>
                                                    <p>Paste the embedded code below</p>
                                                    <InputTextarea value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} rows={4} className="text_area_article"></InputTextarea>
                                                    
                                                </div>
                                                )}
                                                </div>
                                                </div>     
                                                <div className="col-12">
                                                <div className="mt-2">
                                                    { quote && (
                                                    
                                                    <div className="image_uploader_main">
                                                        <i className="fa fa-quote-right upload_icon"></i>
                                                        <p>Quotations</p>
                                                        <InputTextarea rows={4} className="text_area_article"></InputTextarea>
                                                        
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
                                        <p className="tabs_icons" onClick={this.editorBtn1}><i className="fa fa-pencil"></i> Editor</p>
                                        <p className="tabs_icons" onClick={this.uploaderBtn1}><i className="fa fa-image"></i> Image</p>
                                        <p className="tabs_icons" onClick={this.embedBtn1}><i className="fa fa-code"></i> Embed</p>
                                        <p className="tabs_icons" onClick={this.quoteBtn1}><i className="fa fa-quote-right"></i> Quotations</p>
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
                                                { embed1 && (
                                                
                                                <div className="image_uploader_main">
                                                    <i className="fa fa-code upload_icon"></i>
                                                    <p>Paste the embedded code below</p>
                                                    <InputTextarea value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} rows={4} className="text_area_article"></InputTextarea>
                                                    
                                                </div>
                                                )}
                                                </div>
                                                </div> 
                                                <div className="col-12">
                                                <div className="mt-2">
                                                    { quote1 && (
                                                    
                                                    <div className="image_uploader_main">
                                                        <i className="fa fa-quote-right upload_icon"></i>
                                                        <p>Quotations</p>
                                                        <InputTextarea rows={4} className="text_area_article"></InputTextarea>
                                                        
                                                    </div>
                                                )}
                                                </div>
                                                </div>                                      
                                        </div>
                                    </div>
                                </div>
                            </div>  

                            <div className="editprofile_content last_row">
                                <div className="form_content_editprofile edit_profile_form_fields_wrapper">
                                <div className="btn_box_main">
                                    <div>
                                        <p className="ever_element"><i className="fa fa-plus-circle"></i> Add An element</p>
                                    </div>
                                    <div className="box_for_tabs">
                                        <p className="tabs_icons" onClick={this.editorBtn2}><i className="fa fa-pencil"></i> Editor</p>
                                        <p className="tabs_icons" onClick={this.uploaderBtn2}><i className="fa fa-image"></i> Image</p>
                                        <p className="tabs_icons" onClick={this.embedBtn2}><i className="fa fa-code"></i> Embed</p>
                                        <p className="tabs_icons" onClick={this.quoteBtn2}><i className="fa fa-quote-right"></i> Quotations</p>
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
                                                { embed2 && (
                                                
                                                <div className="image_uploader_main">
                                                    <i className="fa fa-code upload_icon"></i>
                                                    <p>Paste the embedded code below</p>
                                                    <InputTextarea value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} rows={4} className="text_area_article"></InputTextarea>
                                                    
                                                </div>
                                                )}
                                                </div>
                                                </div> 
                                                <div className="col-12">
                                                <div className="mt-2">
                                                    { quote2 && (
                                                    
                                                    <div className="image_uploader_main">
                                                        <i className="fa fa-quote-right upload_icon"></i>
                                                        <p>Quotations</p>
                                                        <InputTextarea rows={4} className="text_area_article"></InputTextarea>
                                                        
                                                    </div>
                                                )}
                                                </div>
                                                </div> 
                                                                                             
                                        </div>
                                    </div>
                                </div>
                            </div> 

                            <div className="editprofile_content last_row">
                                <div className="form_content_editprofile edit_profile_form_fields_wrapper">
                                <div className="btn_box_main">
                                    <div>
                                        <p className="ever_element"><i className="fa fa-plus-circle"></i> Add An element</p>
                                    </div>
                                    <div className="box_for_tabs">
                                        <p className="tabs_icons" onClick={this.editorBtn3}><i className="fa fa-pencil"></i> Editor</p>
                                        <p className="tabs_icons" onClick={this.uploaderBtn3}><i className="fa fa-image"></i> Image</p>
                                        <p className="tabs_icons" onClick={this.embedBtn3}><i className="fa fa-code"></i> Embed</p>
                                        <p className="tabs_icons" onClick={this.quoteBtn3}><i className="fa fa-quote-right"></i> Quotations</p>
                                    </div>  
                                </div>
                                    <div>
                                        <div className="row">                              
                                            <div className="col-12">
                                            <div className="mt-2">
                                            { editor3 && (
                                            <Editor className="editor_cls" style={{height:'320px'}} value={this.state.text1} onTextChange={(e)=>this.setState({text1:e.htmlValue})}/>
                                            )}
                                            </div>
                                            </div>
                                            <div className="col-12">
                                            <div className="mt-2">
                                                { uploader3 && (
                                                
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
                                                { embed3 && (
                                                
                                                <div className="image_uploader_main">
                                                    <i className="fa fa-code upload_icon"></i>
                                                    <p>Paste the embedded code below</p>
                                                    <InputTextarea value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} rows={4} className="text_area_article"></InputTextarea>
                                                    
                                                </div>
                                                )}
                                                </div>
                                                </div> 

                                            <div className="col-12">
                                                <div className="mt-2">
                                                    { quote3 && (
                                                    
                                                    <div className="image_uploader_main">
                                                        <i className="fa fa-quote-right upload_icon"></i>
                                                        <p>Quotations</p>
                                                        <InputTextarea rows={4} className="text_area_article"></InputTextarea>
                                                        
                                                    </div>
                                                )}
                                                </div>
                                                </div> 
                                                                                             
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            <div>
                                <button onClick={()=> this.handleSubmit()} className="btn btn-primary login_button" >Submit</button>
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
