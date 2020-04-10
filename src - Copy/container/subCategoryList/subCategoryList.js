
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import './subCategoryList.scss';

import BackIcon from '../../assets/images/icon-left.svg';
import LayoutWrapper from '../../component/LayoutWrapper/';
import { fetchsubCategoryList, getsubCategoryListRes } from '../../action/subCategoryListActions';
import { deleteSubCategoryListRecord, doDeleteAppRes } from '../../action/deleteSubCategoryListActions';
// import Swal from 'sweetalert2';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
// import { getItem } from '../../utils/localStore';
import Modal from "react-responsive-modal";
import { getItem } from '../../utils/localStore';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import subImg1 from '../../../src/assets/images/subimg1.PNG';
import { Link } from 'react-router-dom';



let isDelete = false;

class SubCategoryListComponent extends React.PureComponent {
  onSelectionChange = (e) => {   
    this.setState({
      scategoryList: e.value,
    })
  }
  constructor() { 
    super();
    isDelete = false;
		this.state = {
      columns: [
        { CategoryName: 'Birds' },
        { CategoryName: 'Pigs' },
        { CategoryName: 'Ruminants' },
        { CategoryName: 'Aqua' },
        { CategoryName: 'Grains' },
      ],
			isLoader: false,
      globalFilter: '',
      subCategoryList: [],
      renderUI: false,
      openDeleteAppModal: false,
      isDisabled: false,
    }
    this.actionTemplate = this.actionTemplate.bind(this);
	}

  componentDidMount() {
    console.log(this.props.location.state)
    if(this.props.location.state.appData){
      this.setState({
          appData: this.props.location.state.appData,
      }, () => {
         console.log(this.state.appData )
         let payloadReq = {
          cat_id: this.state.appData
        }
        this.setState({
          isLoader:true
        })
        this.props.fetchsubCategoryList(payloadReq);
      });
    }else{
      this.props.history.push({
        pathname: '/category-list'
      })
    }
    
  }

  componentWillReceiveProps(props) {
    console.log("props check", props);
    // this.setState({
    //   isLoader:false
    // })
    if (props.subCategoryListRes) {
			if (props.subCategoryListRes.data && props.subCategoryListRes.data.subCategoryList) {
				if (props.subCategoryListRes.data.subCategoryList.success===true) {
          this.setState({
            subCategoryList: props.subCategoryListRes.data.subCategoryList.data,
            isLoader: false,
          });
				}else{
          this.setState({
            isLoader:false,
            subCategoryList:[]
          })
        }
			}
    }
    if (props.doDeleteAppRes) {
			if (props.doDeleteAppRes.data && props.doDeleteAppRes.data.deleteCategoryList) {
				if (props.doDeleteAppRes.data.deleteCategoryList.success && isDelete) {
          isDelete = false;
          this.setState({
            openDeleteAppModal: false,
            isDisabled: false,
          });
          this.setState({
            isLoader:true
          })
          let payloadReq = {
            cat_id: this.state.appData
          }
          this.props.fetchsubCategoryList(payloadReq);
				}
			}
    }
  }

  actionTemplate(rowData, column) {
    return (
      <div style={{textAlign: 'center'}} className="btn-group">
        <button className="btn btn-primary " data-toggle="tooltip" data-placement="top" title="Edit Sub Category" onClick={()=> this.goUpdateApplication(rowData)}>
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </button>
        <button className="btn btn btn-danger" data-toggle="tooltip" data-placement="top" title="Delete Sub Category" onClick={()=> this.openDeleteApp(rowData)}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>      
      </div>
    );
  }
  goUpdateApplication = (rowData) => {
    this.props.history.push({
      pathname: '/update-subcategory',
      state: {appData: rowData}
    })
  }
  handleBack = () => {
    this.props.history.push('/category-list');
}

  createApp(){
    this.props.history.push('/novus-bi-create')
  }

  

  deleteApp = () => {
    this.setState({
      isDisabled: true,
    });
    isDelete = true;
    let payload = {
      id: this.state.appId
    }
    this.props.deleteSubCategoryListRecord(payload);
  }

  openDeleteApp = (rowData) => {
    this.setState({
      appId: rowData.subcat_id,
      openDeleteAppModal: true,
    });
  }

  cancelDeleteApp = () => {
    this.setState({
      openDeleteAppModal: false,
    });
  }

  actionIconTemplate = (data) => {
    return (
      <div>
        {/* <img src={data.icon} alt='icon' style={{width: 50, height: 50}} /> */}
        <img src={data.icon} alt='icon' className="image_icons" />
      </div>
    );
  }


  goToAdmin = (data) => {
    // this.props.history.push('/adminDetails',{
    //   applicationData: data
    // })
  }

  render() {
    const { subCategoryList } = this.state;
    console.log(subCategoryList);
    let userRole = getItem('userRoleId');
    const Header = (<div className="offer_head">Sub-Category List</div>);
    const spinner = <span><img src={loaderImg} alt="" /></span>;
    var tableHeader = <div style={{'textAlign':'left'}}>
                        <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
                        <input type="text" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Search" size="50"/>
                    </div>;
    return (
      <div className="active_drop_menus">
      <Loader show={this.state.isLoader} message={spinner}>
        <LayoutWrapper title="Sub-Category List" header={Header} >
          <div className="application-list_content">
            <div className="customer_inner_content">
              <div  className="row pl-pr-15px xs-pl-pr-0px">
                <div className="col-md-12 customertabpanel">
                  <div className="administration_tab">
                    <div  className="row pl-pr-15px xs-pl-pr-0px">
                      <div className="col-sm-12 col-md-6">
                        <div className="createprofile_back_icon_text"  onClick={this.handleBack}>
                            <img src={BackIcon} alt="" className="createprofile_back_icon" />
                            <span className="createprofile_go_back">Back to Category</span>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6">
                        <div className="heading_title">Sub Category List</div>
                      </div>
                    </div>
                    
                    <div className="row pl-pr-15px xs-pl-pr-0px">
                      <div className="col-12 tableheight advisor-tab-tableheight" style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 15 }}>
                        {/* <DataTable value={subCategoryList} header={tableHeader} globalFilter={this.state.globalFilter} paginator={true} rows={10}  responsive scrollable  emptyMessage="No data found" sortMode="multiple" editable={false} selection={this.state.scategoryList} onSelectionChange={this.onSelectionChange} className="novus_datatable">
                          <Column selectionMode="multiple" style={{width:'2em'}}/>
                          <Column className="tableCols" field="icon" header="Icon" body={this.actionIconTemplate}  style={{width: '100px'}}/>
                          <Column className="tableCols" field="application_name" header="Sub Category Name" sortable style={{width: '120px'}}/>
                          <Column className="tableCols" field="action" header="Type / Sections" body={this.actionTemplate} style={{width: '200px'}}/>
                        </DataTable> */}
                        <DataTable value={this.state.subCategoryList} header={tableHeader} globalFilter={this.state.globalFilter} paginator={true} rows={10}  responsive scrollable  emptyMessage="No data found" sortMode="multiple" editable={false} selection={this.state.scategoryList} onSelectionChange={this.onSelectionChange} className="novus_datatable">
                            <Column className="tableCols" field="icon" header="" body={this.actionIconTemplate}  style={{width: '100px'}}/>
                            <Column field="subcategory_name" header="Sub Category Name"/>                            
                            <Column className="tableCols" field="action" header="Type / Sections" body={this.actionTemplate} style={{width: '200px'}}/>
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
                                disabled={this.state.isDisabled} >Yes
                              </button>
                            </div>
                            <div className="col-6 col-md-6 col-sm-6">
                              <button
                                className="btn delete-user-no-btn"
                                onClick={() => this.cancelDeleteApp() } > No
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

SubCategoryListComponent.propTypes = {
	subCategoryListRes: PropTypes.any,
	doDeleteAppRes: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  subCategoryListRes: getsubCategoryListRes,
	doDeleteAppRes: doDeleteAppRes,
});

function mapDispatchToProps(dispatch) {
  return {
		fetchsubCategoryList: (data) => dispatch(fetchsubCategoryList(data)),
		deleteSubCategoryListRecord: (data) => dispatch(deleteSubCategoryListRecord(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SubCategoryListComponent);