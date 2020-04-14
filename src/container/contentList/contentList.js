
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import './contentList.scss';
import LayoutWrapper from '../../component/LayoutWrapper/';
import { fetchcontentList, getcontentListRes } from '../../action/contentListActions';
import { deleteContentListRecord, doDeleteContentRes } from '../../action/deleteContentListActions';
import { statusContentListRecord, doStatusContentRes } from '../../action/statusContentListActions';
import { fetchallcategoryList, getallcategoryListRes } from '../../action/allCategoryListActions';
// import Swal from 'sweetalert2';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
// import { getItem } from '../../utils/localStore';
import Modal from "react-responsive-modal";
import { getItem } from '../../utils/localStore';
import {Dropdown} from 'primereact/dropdown';
import logoImg from '../../assets/images/novusone-logo.png';
import moment from 'moment';


let isDelete = false;
let isUpdate = true;

class ContentListComponent extends React.PureComponent {
  onSelectionChange = (e) => {   
    this.setState({
      wmsList: e.value,
    })
  }
  constructor() { 
    super();
    
    isDelete = false;
		this.state = {
			isLoader: false,
      globalFilter: '',
      contentList: [],
      backupContentList:[],
      categoryList:[],
      backupCat:[],
      renderUI: false,
      openDeleteAppModal: false,
      isDisabled: false,
      dumCat:[],
      showSubCat:false,
      selectCategory:'Select Category',
      typeContent:''

    }
    this.actionTemplate = this.actionTemplate.bind(this);
  }

  componentDidMount() {
    this.props.fetchallcategoryList();
    let appData = JSON.parse(getItem('adminAppData'));
    if(appData !== null) {
      appData.application_id = appData.app_id;
      appData.application_name = appData.app_name;
      appData.icon = appData.app_icon;
      delete appData.app_id;
      delete appData.app_name;
      delete appData.app_icon;
      let itemArr = [];
      itemArr.push(appData);
      this.setState({
        contentList: itemArr
      });
    } else {
      this.props.fetchcontentList();
    }
  }

  componentWillReceiveProps(props) {
    console.log("props check", props)
    if(props.allCategoryListRes){
        if(props.allCategoryListRes.data.allCategoryList ){
            if(props.allCategoryListRes.data.allCategoryList.success === true){
                this.setState({
                  dumCat: props.allCategoryListRes.data.allCategoryList.data
                },()=>{
                  let cats = [];
                  let mats = []
                  for(let c of this.state.dumCat){
                      if(c.parent_id == '0'){
                        cats.push(c)
                      }else{
                        mats.push(c)
                      }
                  }
                  for(let c of cats){
                    let dts = []
                    for(let k of mats){
                      if(c.id == k.parent_id){
                        dts.push(k);
                      }
                    }
                    c.child = dts;
                  }
                  this.setState({
                    categoryList : cats,
                    backupCat: cats
                  })
                  console.log(this.state.categoryList)
                });
            }
        }
    }
    if (props.contentListRes) {
			if (props.contentListRes.data && props.contentListRes.data.contentList) {
				if (props.contentListRes.data.contentList.status===true) {
          this.setState({
            contentList: props.contentListRes.data.contentList.data,
            backupContentList:props.contentListRes.data.contentList.data,
            isLoader: false,
          },()=>{
            console.log(this.state.contentList)
          });
				}
			}
    }
    if (props.doDeleteContentRes) {
			if (props.doDeleteContentRes.data && props.doDeleteContentRes.data.doDeleteContentRes) {
				if (isDelete) {
          isDelete = false;
          this.setState({
            openDeleteAppModal: false,
            isLoader: false,
            isDisabled: false,
          });
          this.props.fetchcontentList();
				}
			}
    }
    if (props.doStatusContentRes) {
			if (props.doStatusContentRes.data && props.doStatusContentRes.data.doStatusContentRes) {
        if(isUpdate){
          isUpdate = false;
          this.setState({
            isLoader: false,
          })
          this.props.fetchcontentList();
        }
				
			}
    }
  }

  actionTemplate(rowData, column) {
    return (
      <div style={{textAlign: 'center'}}>
        <button className="btn btn-edit-customer" onClick={()=> this.goUpdateApplication(rowData)}>
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </button>
        <button className="btn btn-delete-customer" onClick={()=> this.openDeleteApp(rowData)}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button> 
      {
        rowData.status != 'draft' && rowData.status == 'pending' &&
        <button className="btn btn-success-customer" onClick={()=> this.ChangeStatus(rowData.contant_id)}>
          <i className="fa fa-toggle-off" aria-hidden="true"></i>
        </button> 
      }
      {
        rowData.status != 'draft' && rowData.status == 'active'&&
        <button className="btn btn-delete-customer" >
          <i className="fa fa-toggle-on" aria-hidden="true"></i>
        </button> 
      }
        
        
      </div>
    );
  }

  goUpdateApplication = (rowData) => {
    this.props.history.push({
      pathname: '/novus-bi-article-update',
      state: {appData: rowData}
    })
  }


  createApp(){
    this.props.history.push('/novus-bi-article')
  }

  

  deleteApp = () => {
    console.log(this.state.contant_id)
    this.setState({
      isDisabled: true,
      isLoader:true,
    });
    isDelete = true;
    let payload = {
      contant_id: this.state.contant_id
    }
    this.props.deleteContentListRecord(payload);
  }

  ChangeStatus = (e) => {
    isUpdate = true;
    let payload = {
      contant_id: e
    }
    this.setState({
      isLoader:true
    })
    this.props.statusContentListRecord(payload);
  }

  openDeleteApp = (rowData) => {
    this.setState({
      contant_id: rowData.contant_id,
      openDeleteAppModal: true,
    });
  }

  cancelDeleteApp = () => {
    this.setState({
      openDeleteAppModal: false,
    });
  }

  actionIconTemplate = (data) => {
    
    if( data.thumbnail && data.thumbnail != ''){
      return (
        <div>
          {/* <img src={data.icon} alt='icon' style={{width: 50, height: 50}} /> */}
          <img src={data.thumbnail} alt='icon' className="image_icons_content" />
        </div>
      );
    }else{
      return (
        <div>
          {/* <img src={data.icon} alt='icon' style={{width: 50, height: 50}} /> */}
          <img src={logoImg} alt='icon' className="image_icons_content" />
        </div>
      );
    }
    
  }

  actionStatusTemplate = (data) => {
    if(data.status == 'draft'){
      return (
        <div className="status_main_bx">
          <button className="btn pending-status btn_draft" onClick={this.toggleBox}>
           Draft
          </button>         
        </div>
      );
    }else
    if(data.status == 'pending'){
      return (
        <div className="status_main_bx">
          <button className="btn btn-danger" onClick={this.toggleBox}>
            Pending
          </button>         
        </div>
      );
    }else
    if(data.status == 'active'){
      return (
        <div className="status_main_bx">
          <button className="btn btn-success" onClick={this.toggleBox}>
            Active
          </button>         
        </div>
      );
    }
    
  }
  actionTypeTemplate = (data) => {
    // console.log(data)
    let cat =data.categories_name.split(',');
    return (
      <ul className="status_main_bx">
          {cat.map((item,key) => 
            <li key={key} onClick={() => this.selectCatButton(item)}>{item}</li>
          )}    
      </ul>
    );
  }

  catTemplate = (option) =>{
    return (
      <div>
        <div className="p-clearfix optionGroup">
          <span style={{float:'left',fontWeight:'bold', margin:'.5em .25em 0 0'}}>{option.name}</span>
        </div>
        {option.child.map((item)=>
        <div className="p-clearfix optionChild">
          <span style={{float:'left', margin:'.5em .25em 0 0'}}>{item.name}</span>
        </div>
          )
        }
    </div>
    
    )
  }

  adminActionTemplate = (rowData) => {
    let date =moment(rowData.date).format('DD/MM/YYYY HH:mm');
    return (
      <div className="date_field" style={{textAlign: 'center'}}>
        <p onClick={()=> this.goToAdmin(rowData)}>
          {date}
        </p>    
      </div>
    );
  }

  goToAdmin = (data) => {
    // this.props.history.push('/adminDetails',{
    //   applicationData: data
    // })
  }
  selectCatButton = (e)=>{
    const cats = [];
    console.log(e)
    this.setState({
      contentList:this.state.backupContentList
    },()=>{
      if(e == ''){
        this.setState({
          contentList:this.state.backupContentList
        })
      }else{
        for(let item of this.state.contentList){
          let vals = item.categories_name.split(',');
          console.log(vals)
          if(vals.includes(e)){
            cats.push(item);
          }
          this.setState({
            contentList:cats
          })
        }
      }
    })
    
  }
  selectCatChange = (e) =>{
    const cats = [];
    this.setState({showSubCat :false}) 
    console.log(e)
    this.setState({
      selectCategory:e.name
    })
    if(e.id == ''){
      this.setState({
        contentList:this.state.backupContentList
      })
    }else{
      for(let item of this.state.contentList){
        let vals = item.categories.split(',');
        console.log(vals)
        if(vals.includes(e.id)){
          cats.push(item);
        }
        this.setState({
          contentList:cats
        })
      }
    }
    
    this.setState({allSection: e.id})



  }
  toggleBox = () =>{
    this.setState({showSubCat : !this.state.showSubCat}) 
  }
  selectContentType = (e) =>{
    console.log(e)
    const cats = [];
    const cont = [];
    this.setState({
      categoryList:this.state.backupCat,
      contentList:this.state.backupContentList
    },()=>{
      if(e == 'All Sounds'){
        for(let item of this.state.categoryList){
          if(item.name == 'Podcast'){
            cats.push(item);
          }
        }
        for(let item of this.state.contentList){
          if(item.type == 'All Sounds'){
            cont.push(item)
          }
        }
        
        this.setState({
          categoryList:cats,
          contentList:cont,
          selectCategory:'All',
          typeContent:e.name
        })
      }else if(e == 'All Content'){
        for(let item of this.state.categoryList){
          if(item.name != 'Podcast'){
            cats.push(item);
          }
        }
        for(let item of this.state.contentList){
          if(item.type == 'All Articles'){
            cont.push(item)
          }
        }
        
        this.setState({
          categoryList:cats,
          contentList:cont,
          selectCategory:'All',
          typeContent:e.name
        })
      }else{
        for(let item of this.state.categoryList){
          cats.push(item);
          
        }
        for(let item of this.state.contentList){
            cont.push(item)
        }
        
        this.setState({
          categoryList:cats,
          contentList:cont,
          selectCategory:'All',
          typeContent:e.name
        })
      }
    })
    
  }
  render() {
    const allContent = [
      {name: 'All Articles'},
      {name: 'All Content'},
      {name: 'All Sounds'},
  ];
  const { showSubCat } = this.state;

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
    const { contentList } = this.state;
    console.log(contentList);
    let userRole = getItem('userRoleId');
    const Header = (<div className="offer_head">List of Content</div>);
    const spinner = <span><img src={loaderImg} alt="" /></span>;
    var tableHeader = <div style={{'textAlign':'left'}}>
                        <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
                        <input type="text" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Search" size="50"/>
                    </div>;
    return (
      <div className="active_drop_menus">
      <Loader show={this.state.isLoader} message={spinner}>
        <LayoutWrapper title="List of Content" header={Header} click={()=>{this.hideCats()}}>
          <div className="application-list_content">
            <div className="customer_inner_content">
              <div  className="row pl-pr-15px xs-pl-pr-0px">
                <div className="col-md-12 customertabpanel">
                  <div className="administration_tab">
                    <div  className="row pl-pr-15px xs-pl-pr-0px">
                      <div className="col-sm-12 col-md-6">
                        <div className="heading_title">List of Content</div>
                      </div>
                      {
                        userRole == '1' &&
                        <div className="col-sm-12 col-md-6" style={{ textAlign: 'right' }}>
                          <button className="btn btn-placeOrder" onClick={() => this.createApp()}>Add Content</button>
                        </div>
                      }
                    </div>

                    <select  className="type_drop"  onChange={(e) => {this.selectContentType(e.target.value)}} placeholder="Select a Type">
                      {
                        allContent.map((item,key)=>
                        <option value={item.name} key={key}>{item.name}</option>
                        )
                      }
                    </select>
                    <ul className="selectbox">
                      <li>
                        <a onClick={this.toggleBox}>
                          {this.state.selectCategory}
                          <i className="fa fa-caret-down"></i>  
                        </a>                   
                        
                          {showSubCat &&
                            <ul className="subItem" >
                            <li>
                              <a className="optionGroup"  id="" name="All" onClick={(e) => {this.selectCatChange(e.target)}}>All</a>
                            </li>
                            {
                              this.state.categoryList.map((item,key)=>
                              <li key={key}>
                                <a id={item.id} name={item.name} className="optionGroup" onClick={(e) => {this.selectCatChange(e.target)}} >
                                  {item.name}
                                </a>
                                <ul className="subSubItem">
                                {
                                  item.child && item.child.map((sub,skey)=>
                                  <li key={skey}>
                                    <a id={sub.id} name={sub.name} onClick={(f) => {this.selectCatChange(f.target)}}>
                                      {sub.name}
                                    </a>
                                  </li>
                                  )
                                }
                                </ul>
                              </li>
                              
                              )
                            }
                            </ul>
                          }                    
                      </li> 
                    </ul>
                    <div className="row pl-pr-15px xs-pl-pr-0px">
                      <div className="col-12 tableheight advisor-tab-tableheight" style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 15 }}>
                        <DataTable value={contentList} header={tableHeader} globalFilter={this.state.globalFilter} paginator={true} rows={10}  responsive scrollable  emptyMessage="No data found" sortMode="multiple" editable={false} selection={this.state.wmsList} onSelectionChange={this.onSelectionChange} className="novus_datatable">
                        <Column selectionMode="multiple" style={{width:'2em'}}/>
                          <Column className="tableCols" field="icon" header="" body={this.actionIconTemplate}  style={{width: '100px'}}/>
                          <Column className="tableCols" field="title" header="Title" sortable style={{width: '120px'}}/>
                          {
                            userRole == '1' &&
                            <Column className="tableCols" field="admin" header="Date" body={this.adminActionTemplate} style={{width: '120px'}}/>
                          }
                          <Column className="tableCols" field="" header="Type / Sections" style={{width: '120px'}} body={this.actionTypeTemplate} />
                          <Column className="tableCols" field="" header="Status" style={{width: '120px'}} body={this.actionStatusTemplate} />
                          {
                            userRole == '1' &&
                            <Column className="tableCols" field="action" header="Action" body={this.actionTemplate} style={{width: '200px'}}/>
                          }
                        </DataTable>
                      </div>
                      <Modal open={this.state.openDeleteAppModal} onClose={this.cancelDeleteApp} center>
                        <div className="delete-user-modal">
                          <div className="row" >
                            <div className="delete-user-header"> Are you sure you want to delete </div>
                          </div>
                          <div className="row" style={{width: 500}}>
                          </div>
                          <div className="row text_center" style={{marginTop: 30}}>
                            <div className="col-6 col-md-6 col-sm-6" style={{textAlign: 'right'}}>
                              <button
                                className="btn delete-user-yes-btn"
                                onClick={() => this.deleteApp() }
                                disabled={this.state.isDisabled}
                              >
                                Yes
                              </button>
                            </div>
                            <div className="col-6 col-md-6 col-sm-6">
                              <button
                                className="btn delete-user-no-btn"
                                onClick={() => this.cancelDeleteApp() }
                              >
                                No
                              </button>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LayoutWrapper>
      </Loader>
      </div>
    );
  }
}

ContentListComponent.propTypes = {
	contentListRes: PropTypes.any,
	doDeleteContentRes: PropTypes.any,
	doStatusContentRes: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  contentListRes: getcontentListRes,
	doDeleteContentRes: doDeleteContentRes,
	doStatusContentRes: doStatusContentRes,
  allCategoryListRes:getallcategoryListRes
});

function mapDispatchToProps(dispatch) {
  return {
    fetchallcategoryList: () => dispatch(fetchallcategoryList()),
		fetchcontentList: () => dispatch(fetchcontentList()),
		deleteContentListRecord: (data) => dispatch(deleteContentListRecord(data)),
		statusContentListRecord: (data) => dispatch(statusContentListRecord(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ContentListComponent);