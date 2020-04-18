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
import { fetchallcategoryList, getallcategoryListRes } from '../../action/allCategoryListActions';
import { fetchRegionList, getRegionListRes } from '../../action/regionListActions';
import { uploadAppIcon, doUploadAppIconRes } from '../../action/uploadAppIconActions';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
import BackIcon from '../../assets/images/icon-left.svg';
import validate from './formValidation';
import {Editor} from "primereact/editor";
import {Button} from "primereact/button";
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import {InputTextarea} from 'primereact/inputtextarea';
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';

import {MultiSelect} from 'primereact/multiselect';
import {InputText} from "primereact/inputtext";
import {Checkbox} from 'primereact/checkbox';
import {InputSwitch} from 'primereact/inputswitch';
import {FileUpload} from 'primereact/fileupload';

import Swal from 'sweetalert2';

const editorArray = [{'type':"editor",'name':""}];
let isDone = false;
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
            categoryList:[],
            selectedCountry: null,
            selectedUser: null,
            file: null,
            uploader: false,
            editor: true,
            embed: false,
            quote: false,
            showMenu: false,
            showMenuSection: false,
            date:new Date(),
            authorInput:false,
            authorSelect:true,
            comment:true,
            editorArray:editorArray,
            mainTitle:'',
            pdf:'',
            pdfName:'Search for',
            pdfError:'',
            uploadName:'Upload Here',
            uploadUrl:'',
            UploaderError: '',
            authorShow:false,
            categories:[],
            soundShow:false,
            articleShow:true,
            type:'All Articles',
            backCat:[],
            thumbname:'Choose Thumbnail',
            thumbnail:'',
            thumbnailError:''
        }
        
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
        console.log(event)
        if(event.name === 'Other'){
            this.setState({
                authorInput:true,
                authorSelect:false
            })
        }else{
            this.setState({
                authorInput:false,
                authorSelect:true,
                author:event.name,
                authorVal:event
            })
        }
    }
    onBasicUploadAuto(event) {
        this.setState({
            isLoader:false
        })
        let response = JSON.parse(event.xhr.response)
        if(response.success === true){
            this.setState({
                pdfName:response.path,
                pdf:response.imageurl,
                pdfError: ''
            })
        }else{
            this.setState({
                pdfError:response.message
            })
        }
        // this.growl.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode'});
    }

    onBasicUploadThumb = (event) => {
        this.setState({
            isLoader:false
        })
        let response = JSON.parse(event.xhr.response)
        if(response.success === true){
            this.setState({
                thumbname:response.path,
                thumbnail:response.imageurl,
                thumbnailError: ''
            })
        }else{
            this.setState({
                thumbnailError:response.message
            })
        }
        // this.growl.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode'});
    }
    

    componentDidMount() {
        if(this.props.location.state){
            const appDetails = this.props.location.state.appData;
            console.log(appDetails);
            this.setState({
                appData: appDetails,
            }, () => {
                this.setState({
                    cat_id: this.state.appData.contant_id,
                    mainTitle:this.state.appData.title,
                    editorArray:JSON.parse(this.state.appData.contant),
                    type:this.state.appData.type,
                    categories:this.state.appData.categories.split(','),
                    date:this.state.appData.date,
                    author:this.state.appData.author,
                    heighlight:this.state.appData.higlight,
                    resume:this.state.appData.resume,
                    comment:parseInt(this.state.appData.comment),
                    authorShow:true
                    // countries: this.state.appData.selected_countries
                })
                
            });
        }

        this.props.fetchRegionList();
        this.props.getAllCountry();
        this.props.fetchallcategoryList();
        this.setState({
            isLoader: false,
        });
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if(nextProps.allCategoryListRes){
            if(nextProps.allCategoryListRes.data.allCategoryList ){
                if(nextProps.allCategoryListRes.data.allCategoryList.success === true){
                    this.setState({
                        categoryList: nextProps.allCategoryListRes.data.allCategoryList.data,
                        backCat: nextProps.allCategoryListRes.data.allCategoryList.data,
                    },()=>{
                        let cat =[];
                        for(let item of this.state.categoryList){
                            for(let subitem of this.state.categories){
                                if(parseInt(item.id) === parseInt(subitem)){
                                    
                                    console.log(parseInt(item.id),parseInt(subitem))
                                    cat.push(item);
                                    this.setState({
                                        category:cat
                                    })
                                }
                            }
                        }       
                        console.log(this.state.category)
                        const e = {value:{name:'All Articles'}};
                        this.typeSelect(e)
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
        if (nextProps.RegionListRes) {
			if (nextProps.RegionListRes.data && nextProps.RegionListRes.data.regionList) {
				if (nextProps.RegionListRes.data.regionList.success===true) {
                    this.setState({
                        regionList: nextProps.RegionListRes.data.regionList.RegionList,
                        isLoader: false,
                    });
				}else{
                    this.setState({
                        RegionList: [],
                        isLoader: false,
                    });
                }
			}
        }
        if(nextProps.ArticleAppRes){
            if(nextProps.ArticleAppRes.data.novusBiArticle ){
                if(nextProps.ArticleAppRes.data.novusBiArticle.success === true && isDone === true){
                    isDone = false;
                    console.log("success")
                    this.setState({
                        isLoader: false
                    });
                    this.props.history.push('/content-list');
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
    editorBtn = (i, item) => {
        editorArray.splice(i+1, 0, {
            'type':item,'name':""
        });
        editorArray.join();
        this.setState({
            editorArray:editorArray,
            quote:!this.state.quote
        })
        console.log(this.state.editorArray)
    }
    handleSubmit = () => {
        console.log(this.state.region)
        const categories = [];
        const catName = [];
        const counts = [];
        if(this.state.category){
            for(let item of this.state.category){
                categories.push(item.id)
                catName.push(item.name)
            }
            const vals = categories.join(',');
            const valsName = catName.join(',');
            let countryIds = '';
            if(this.state.region && this.state.region.length > 0){
                for(let item of this.state.region){
                    counts.push(item.region_id)
                }
                countryIds = counts.toString()
           
            
            this.setState({
            isSubmited: true,
            }, () => { });
            validate(this.state);
            // const errors = validate(this.state);
            console.log(this.state)
            // if (Object.keys(errors).length === 0) {
                isDone = true;
                let payloadReq = {
                    title: this.state.mainTitle,
                    thumbnail:this.state.thumbnail,
                    content: this.state.editorArray,
                    type:this.state.type.name,
                    category:vals,
                    categories_name:valsName,
                    date:this.state.date,
                    author:this.state.author,
                    heighlight:this.state.heighlight,
                    resume:this.state.resume,
                    comment:this.state.comment,
                    pdf:this.state.pdf,
                    region:countryIds
                }
            this.props.handleFormSubmit(payloadReq);
        }else{
            Swal.fire({
                title: 'Please choos a Region.',
                type: 'error',
                confirmButtonText: 'OK',
                allowOutsideClick: false,
                timer: 3000
              });
        }
        }else{
            Swal.fire({
                title: 'Please choos a category (Appear at).',
                type: 'error',
                confirmButtonText: 'OK',
                allowOutsideClick: false,
                timer: 3000
              });
        }
        
        
        // }
    }
    handleEditorChange = (e,index) =>{
        console.log(e)
        const vals = this.state.editorArray;
        for(let i =0; vals.length > i;i++){
            if(i === index){
                
                vals[i].name = e.htmlValue
                
            }
        }
        this.setState({ editorArray: vals });
    }
    handleEmbadeChange = (e,index) => {
        console.log(e.target.value)
        const vals = this.state.editorArray;
        for(let i =0; vals.length > i;i++){
            if(i === index){
                
                vals[i].name = e.target.value
                
            }
        }
        this.setState({ editorArray: vals });
    }
    fileUploadProcess= () =>{
        console.log("hello");
        this.setState({
            isLoader:true
        })
    }
    contentUploadImage = (event,index) =>{
        this.setState({
            isLoader:false
        })
        console.log("done")
        let response = JSON.parse(event.xhr.response)
        if(response.success === true){    
            const vals = this.state.editorArray;
            for(let i =0; vals.length > i;i++){
                if(i === index){
                    
                    vals[i].name = response.imageurl
                    
                }
            }   
            this.setState({ 
                editorArray: vals,
                uploadName:response.path,
                quote:!this.state.quote });
        }else{
            
        }
        return event;
        // this.growl.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode'});
    }
    contentUploadAudio = (e) => {
        this.setState({
            isLoader:false
        })
        let response = JSON.parse(e.xhr.response)
        console.log(response)
        if(response.success === true){ 
                editorArray[0].name = response.imageurl;    
                this.setState({ 
                editorArray: editorArray,                
                uploadName:response.path,
                quote:!this.state.quote },()=>{
                    console.log(this.state.editorArray)
                });
        }else{
            
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
    titleChange = (e) => {
        console.log(e.target.value)
        this.setState({
            mainTitle:e.target.value
        })
    }
    userChange = (item) => {
        this.setState({
            selectedUser: item
        });

    }
    typeSelect = (e) =>{
        console.log(e.value.name)
        this.setState({type: e.value})
       let cats = [];
       this.setState({
        categoryList:this.state.backCat
       },()=>{
        if(e.value.name ===  'All Sounds'){
            editorArray[0].type = "audio";
            for(let item of this.state.categoryList){
                if(item.name === 'Podcast'){
                  cats.push(item);
                }
              }
              console.log(editorArray)
            this.setState({
                soundShow:true,
                articleShow:false,
                categoryList:cats,
                editorArray: editorArray
            })
        }else{
            editorArray[0].type = "editor";
            for(let item of this.state.categoryList){
                if(item.name !== 'Podcast'){
                    cats.push(item);
                }
            }
            this.setState({
                soundShow:false,
                articleShow:true,
                categoryList:cats,
                editorArray: editorArray
            })
        }
       })
        
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
    actionTemplateEditor = (editorVal,index) => {
        if(editorVal.type === 'editor'){
            return  (
                <div className="col-12">
            
                    <Editor className="editor_cls" style={{height:'320px'}} value={editorVal.name} onTextChange={(e)=>this.handleEditorChange(e,index)}/>
                
                </div>
            )
        }else if(editorVal.type === 'uploader'){
            return (
                <div className="col-12">
                    <div className="image_uploader_main">
                        {
                            editorVal.name === '' &&
                            <i className="fa fa-camera upload_icon"></i>
                        }
                        {
                            editorVal.name !== '' &&
                            <img src={editorVal.name} alt="upload" style={{"maxWidth":"200px"}} />
                        }
                        <br /><br />
                        <FileUpload mode="basic" onProgress={this.fileUploadProcess} name="uploader" url="http://3.132.68.85:3000/api/file_upload" accept="image/*" maxFileSize={1000000} onUpload={(e) => this.contentUploadImage(e,index)} auto={true} chooseLabel={this.state.uploadName} />
                        
                    </div>
                    
                </div> 
            )
        }else if(editorVal.type === 'embed'){
            return (
                <div className="col-12">
                    <div className="mt-2">
                        <div className="image_uploader_main">
                            <i className="fa fa-code upload_icon"></i>
                            <p>Paste the embedded code below</p>
                            <InputTextarea  onChange={(e)=>this.handleEmbadeChange(e,index)} rows={4} className="text_area_article"></InputTextarea>
                            
                        </div>                                                            
                    </div>
                </div> 
            )
        }else if(editorVal.type === 'quote'){
            return (
                <div className="col-12">
                    <div className="mt-2">
                        <div className="image_uploader_main">
                            <i className="fa fa-quote-right upload_icon"></i>
                            <p>Quotations</p>
                            <InputTextarea rows={4}  onChange={(e)=>this.handleEmbadeChange(e,index)} className="text_area_article"></InputTextarea>
                            
                            </div>
                    </div>
                </div>   
            )
        }                   
    }

    
    render() {
        const allContent = [
            {name: 'All Articles'},
            {name: 'All Sounds'},
        ];

            
        
        const authorSection = [
            {name: 'Other'},
            {name: 'Team'},
            {name: 'GuilhermeFray'},
        ];  
        // const header = this.renderHeader();

        const Header = (<div className="offer_head">Create User</div>);
        
        const spinner = <span><img src={loaderImg} alt="" /></span>;
        // const errors = validate(this.state);
        const { countryList, usersList } = this.state;

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
                                        <div className="col-7">
                                            <div className="mt-2">
                                                <div className="form-group">
                                                    
                                                    <InputText className="form-control" value={this.state.mainTitle} placeholder="Title of your article" name="mainTitle" onChange={(e) => this.titleChange(e)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-5">
                                                <div className="row">
                                                    <div className="col-8">
                                                        <div className="mt-2">
                                                            <div className="form-group">
                                                            <FileUpload  onProgress={this.fileUploadProcess} mode="basic" name="thumbnail" url="http://3.132.68.85:3000/api/file_upload" accept="image/*" maxFileSize={1000000} onUpload={this.onBasicUploadThumb} auto={true} chooseLabel={this.state.thumbname} />
                                                            {this.state.thumbnailError !== '' && <span className="error-message err-msg">Something went wrong</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <img src={this.state.thumbnail} alt="thumbnail" style={{width: 60, height: 60}} />
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                    
                                    {this.state.articleShow && this.state.editorArray.map((editorVal, index) => (
                                    <div className="editprofile_content " key={index}>
                                        <div className="form_content_editprofile edit_profile_form_fields_wrapper">
                                        
                                            <div> 
                                                <div className="row">   
                                                   {this.actionTemplateEditor(editorVal,index)}               
                                                </div>
                                                <div className="btn_box_main"> 
                                                    <div>
                                                        <p className="ever_element pull-left" ><i className="fa fa-plus-circle"></i> Add An element</p>
                                                        
                                                    </div>
                                                    <div className="box_for_tabs">
                                                        <p className="tabs_icons" onClick={() => this.editorBtn(index, 'editor')}><i className="fa fa-pencil"></i> Editor</p>
                                                        <p className="tabs_icons" onClick={() => this.editorBtn(index,'uploader')}><i className="fa fa-image"></i> Image</p>
                                                        <p className="tabs_icons" onClick={() => this.editorBtn(index,'embed')}><i className="fa fa-code"></i> Embed</p>
                                                        <p className="tabs_icons" onClick={() => this.editorBtn(index, 'quote')}><i className="fa fa-quote-right"></i> Quotations</p>
                                                    </div>
                                                    
                                                </div>
                                                {
                                                    index !== 0 && <button className="pull-right btn-dark" onClick={() => this.remove(index)}><i className="fa fa-trash"></i></button>
                                                }
                                                
                                            </div>
                                        </div>
                                    </div>
                                    ))} 
                                     
                                    {this.state.soundShow && this.state.editorArray.map((editorVal, index) => (
                                        <div className="editprofile_content" key={index}>
                                            <div className="form_content_editprofile edit_profile_form_fields_wrapper">
                                                <div> 
                                                    <div className="row"> 
                                                    { 'audio' === editorVal.type && (
                                                        <div className="col-12">
                                                            <div className="image_uploader_main">
                                                            {
                                                                editorVal.name === '' &&
                                                                <i className="fa fa-music upload_icon"></i>
                                                            }
                                                            {
                                                                editorVal.name !== '' &&
                                                                <audio controls>
                                                                    <source src={editorVal.name} type="audio/mpeg" />
                                                                    Your browser does not support the audio element.
                                                                </audio>
                                                            }
                                                            <br /><br />
                                                                <FileUpload mode="basic" onProgress={this.fileUploadProcess} name="uploader" url="http://3.132.68.85:3000/api/file_upload" accept="*" maxFileSize={100000000} onUpload={(e) => this.contentUploadAudio(e)} auto={true} chooseLabel={this.state.uploadName} />
                                                                
                                                            </div>
                                                            
                                                        </div>  
                                                    )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                   ))} <br />                         
                                    <div className="row">
                                        <div className="col-12">
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
                                                    <Dropdown className="all_sec_dropdown form-drop-control" optionLabel="name" value={this.state.type} options={allContent} onChange={(e) => this.typeSelect(e)} placeholder='All Article'/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 form-group">
                                                    <label>Appear at:</label>
                                                    <MultiSelect className="all_sec_dropdown all_section_tab form-drop-control" optionLabel="name" optionValue="id" value={this.state.category} options={this.state.categoryList} onChange={(e) => {this.setState({category: e.value})}} style={{minWidth:'100%'}} filter={true} filterPlaceholder="Search" placeholder="Choose" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 form-group">
                                                    <label>Region :</label>
                                                    <MultiSelect className="all_sec_dropdown all_section_tab form-drop-control" optionLabel="region_name" optionValue="id" value={this.state.region} options={this.state.regionList} onChange={(e) => {this.setState({region: e.value})}} style={{minWidth:'100%'}} filter={true} filterPlaceholder="Search" placeholder="Choose" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 form-group">
                                                    <label>Date:</label>
                                                    <Calendar touchUI={true} className="all_sec_dropdown  form-drop-control" value={this.state.date} onChange={(e) => this.setState({date: e.value})} showIcon={true} showTime={true} showSeconds={true}/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 form-group">
                                                    <label>Author:</label>
                                                    {
                                                        this.state.authorShow &&
                                                        <h3>{this.state.author}</h3>
                                                    }
                                                    {this.state.authorSelect && !this.state.authorShow  &&
                                                        <Dropdown className="all_sec_dropdown all_section_tab form-drop-control" optionLabel="name" value={this.state.authorVal} options={authorSection} onChange={(e) => this.selectAuthor(e.value)} placeholder="Author"/>
                                                    }

                                                    {this.state.authorInput && 
                                                        <div className="p-inputgroup">
                                                            <InputText className="all_sec_dropdown form-control" placeholder="Type Author Name" name="authorName" onChange={(e) => {this.setState({author: e.target.value})}} />
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
                                                    <Checkbox checked={this.state.heighlight} onChange={e => this.setState({heighlight: e.checked})} />
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
                                            
                                           { this.state.articleShow &&
                                            <div className="row">
                                                <div className="col-12 form-group">
                                                    <label> PDF attached:</label><br />
                                                    
                                                    <FileUpload  onProgress={this.fileUploadProcess} mode="basic" name="pdf" url="http://3.132.68.85:3000/api/file_upload" accept="*" maxFileSize={1000000} onUpload={this.onBasicUploadAuto} auto={true} chooseLabel={this.state.pdfName} />
                                                    {
                                                        this.state.pdfError !== '' &&
                                                        <span style={{'color':'red'}}>{this.state.pdfError}</span>
                                                    }
                                                    
                                                    
                                                </div>
                                            </div>
                                            }
                                            
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
	RegionListRes: PropTypes.any,
    handleFormSubmit: PropTypes.func,
    ArticleAppRes: PropTypes.any,
    doAllCountryRes: PropTypes.any,
    allUsersRes: PropTypes.any,
    doUploadAppIconRes: PropTypes.any,
    allCategoryListRes:PropTypes.any
};

const mapStateToProps = createStructuredSelector({
    RegionListRes: getRegionListRes,
    ArticleAppRes: donovusBiArticleRes,
    doAllCountryRes: doAllCountryRes,
    allUsersRes: doUserAllRes,
    doUploadAppIconRes: doUploadAppIconRes,
    allCategoryListRes:getallcategoryListRes
});

function mapDispatchToProps(dispatch) {
    return {
        fetchallcategoryList: () => dispatch(fetchallcategoryList()),
        handleFormSubmit: (data) => dispatch(submitnovusBiArticle(data)),
        getAllCountry: () => dispatch(getAllCountry()),
        getAllUsers: () => dispatch(getAllUsers()),
        uploadImage: (file) => dispatch(uploadAppIcon(file)),
		fetchRegionList: () => dispatch(fetchRegionList()),
    };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(NovusBiArticleComponent);
