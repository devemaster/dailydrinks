
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import './categoryList.scss';
import LayoutWrapper from '../../component/LayoutWrapper/';
import { fetchcategoryList, getcategoryListRes } from '../../action/categoryListActions';
import { deleteCategoryListRecord, doDeleteAppRes } from '../../action/deleteCategoryListActions';
// import Swal from 'sweetalert2';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
// import { getItem } from '../../utils/localStore';
import Modal from "react-responsive-modal";
import { getItem } from '../../utils/localStore';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import { Link } from 'react-router-dom';


let isDelete = false;

class CategoryListComponent extends React.PureComponent {
  onSelectionChange = (e) => {   
    this.setState({
      categorysList: e.value,
    })
  }
  constructor() { 
    super();    
    isDelete = false;
		this.state = {
    
      // columns: [
      //   { CategoryName: 'News',},
      //   { CategoryName: 'MARKET KPIs'},
      //   { CategoryName: 'IMPORTS STATS'},
      //   { CategoryName: 'COMPETITION',},
      //   { CategoryName: 'PODCASTS', },
      // ],
			isLoader: false,
      globalFilter: '',
      categoryList: [],
      renderUI: false,
      openDeleteAppModal: false,
      isDisabled: false,
    }
    this.actionTemplate = this.actionTemplate.bind(this);
    this.viewTemplate = this.viewTemplate.bind(this);
	}

  componentDidMount() {
    let appData = JSON.parse(getItem('adminAppData'));
    if(appData !== null) {
      appData.cat_id = appData.cat_id;
      appData.category_name = appData.category_name;
      appData.icon = appData.icon;
      delete appData.cat_id;
      delete appData.category_name;
      delete appData.icon;
      let itemArr = [];
      itemArr.push(appData);
      this.setState({
        categoryList: itemArr
      });
    } else {
      this.setState({
        isLoader:true
      });
      this.props.fetchcategoryList();
    }
  }

  componentWillReceiveProps(props) {
    console.log("props check", props)
    if (props.categoryListRes) {
			if (props.categoryListRes.data && props.categoryListRes.data.categoryList) {
				if (props.categoryListRes.data.categoryList.success===true) {
          this.setState({
            categoryList: props.categoryListRes.data.categoryList.data,
            isLoader: false,
          });
				}else{
          this.setState({
            categoryList: [],
            isLoader: false,
          });
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
            isLoader:false
          });
          this.props.fetchcategoryList();
				}
			}
    }
  }


  createApp(){
    this.props.history.push('/novus-bi-create')
  }

  deleteApp = () => {
    this.setState({
      isDisabled: true,
      isLoader:true
    });
    isDelete = true;
    let payload = {
      id: this.state.cat_id
    }
    this.props.deleteCategoryListRecord(payload);
  }

  openDeleteApp = (rowData) => {
    this.setState({
      cat_id: rowData.cat_id,
      openDeleteAppModal: true,
    });
  }

  cancelDeleteApp = () => {
    this.setState({
      openDeleteAppModal: false,
    });
  }
  actionTemplate(rowData, column) {
    return (
      <div style={{textAlign: 'center'}}  className="btn-group">
        <button className="btn btn-success" data-toggle="tooltip" data-placement="top" title="Edit Category" onClick={()=> this.goUpdateApplication(rowData)}>
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </button>
        <button className="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Delete Category" onClick={()=> this.openDeleteApp(rowData)}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>  
        <button className="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Add Sub Category" onClick={()=> this.goAddSubCategory(rowData)}>
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>        
        
      </div>
    );
  }
  actionIconTemplate = (data) => {
    // console.log(data)
    return (
      <div>
        {/* <img src={data.icon} alt='icon' style={{width: 50, height: 50}} /> */}
        <img src={data.icon} alt='icon' className="image_icons" />
      </div>
    );
  }
  viewTemplate(rowData, column) {
    return (
      <div style={{textAlign: 'center'}}>
        <button className="btn btn-info" data-toggle="tooltip" data-placement="top" title="View Sub Category" onClick={()=> this.getSubCategory(rowData)}>
          <i className="fa fa-eye" aria-hidden="true"></i>
        </button>  
      </div>
    );
  }
  getSubCategory = (rowData) => {
    console.log(rowData.cat_id)
    this.props.history.push({
      pathname: '/subcategory-list',
      state: {appData: rowData.cat_id}
    })
  }
  goUpdateApplication = (rowData) => {
    this.props.history.push({
      pathname: '/update-category',
      state: {appData: rowData}
    })
  }
  goAddSubCategory = (rowData) => {
    this.props.history.push({
      pathname: '/create-category',
      state: {appData: rowData}
    })
  }

  render() {
    const { categoryList } = this.state;
    // console.log(categoryList);
    let userRole = getItem('userRoleId');
    const Header = (<div className="offer_head">Category List</div>);
    const spinner = <span><img src={loaderImg} alt="" /></span>;
    var tableHeader = <div style={{'textAlign':'left'}}>
                        <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
                        <input type="text" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Search" size="50"/>
                    </div>;
    return (
      <div className="active_drop_menus">
      <Loader show={this.state.isLoader} message={spinner}>
        <LayoutWrapper className="category_hed_page" title="Category List" header={Header}>
          <div className="application-list_content header_dropopen">
            <div className="customer_inner_content">
              <div  className="row pl-pr-15px xs-pl-pr-0px">
                <div className="col-md-12 customertabpanel">
                  <div className="administration_tab">
                    <div  className="row pl-pr-15px xs-pl-pr-0px">
                      <div className="col-sm-12 col-md-6">
                        <div className="heading_title">Category List</div>
                      </div>
                      {
                        userRole == '1' &&
                        <div className="col-sm-12 col-md-6" style={{ textAlign: 'right' }}>
                          <button className="btn btn-placeOrder" onClick={() => this.createApp()}>Add</button>
                        </div>
                      }
                    </div>
                    <div className="row pl-pr-15px xs-pl-pr-0px">
                      <div className="col-12 tableheight advisor-tab-tableheight" style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 15 }}>
                        {/* <DataTable value={categoryList} header={tableHeader} globalFilter={this.state.globalFilter} paginator={true} rows={10}  responsive scrollable  emptyMessage="No data found" sortMode="multiple" editable={false} selection={this.state.categorysList} onSelectionChange={this.onSelectionChange} className="novus_datatable"> */}
                        <DataTable value={categoryList} sortMode="multiple" editable={false} selection={this.state.categorysList} onSelectionChange={this.onSelectionChange} paginator={true} rows={10} rowsPerPageOptions={[5,10,20]} responsive={true}>

                          <Column className="tableCols" field="icon" body={this.actionIconTemplate}   header="Icon"/>
                          <Column field="category_name" header="Category Name"/>
                          <Column field="View" header="View"  body={this.viewTemplate}  />
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

CategoryListComponent.propTypes = {
	categoryListRes: PropTypes.any,
	doDeleteAppRes: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  categoryListRes: getcategoryListRes,
	doDeleteAppRes: doDeleteAppRes,
});

function mapDispatchToProps(dispatch) {
  return {
		fetchcategoryList: () => dispatch(fetchcategoryList()),
		deleteCategoryListRecord: (data) => dispatch(deleteCategoryListRecord(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CategoryListComponent);