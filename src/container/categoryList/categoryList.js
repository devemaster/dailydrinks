
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
import { deleteApplicationRecord, doDeleteAppRes } from '../../action/deleteApplicationActions';
// import Swal from 'sweetalert2';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
// import { getItem } from '../../utils/localStore';
import Modal from "react-responsive-modal";
import { getItem } from '../../utils/localStore';
import {Button} from 'primereact/button';
import {TreeTable} from 'primereact/treetable';
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
    //   LocationUpdatedList:[
    //     {
    //       "key": "0",
    //       "data": { 
    //           "name": "News",
    //       }
    //       },
    //     {
    //         "key": "1",
    //         "data": { 
    //             "name": "MARKET KPIs",
    //         },
    //         "children":[
    //             {
    //                 "key": "1-0",
    //                 "data":{

    //                     "name": "Birds",
    //                 },
    //               "children":[
    //                   {
    //                       "key": "1-0-0",
    //                       "data":{

    //                           "name": "Level 44",
    //                       },
    //                         "children" : [
    //                             {
    //                                 "key": "1-0-0",
    //                                 "data":{

    //                                     "name": "Boardroom",
    //                                 }
    //                             }
    //                         ]

    //                     }
                        
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //       "key": "2",
    //       "data": { 
    //           "name": "IMPORTS STATS",
    //       },
    //       "children":[
    //           {
    //               "key": "2-0",
    //               "data":{

    //                   "name": "Canary Wharf",
    //               },
    //               "children":[
    //                   {
    //                       "key": "2-0-0",
    //                       "data":{

    //                           "name": "Level 44",
    //                       },
    //                       "children" : [
    //                           {
    //                               "key": "2-0-0",
    //                               "data":{

    //                                   "name": "Boardroom",
    //                               }
    //                           }
    //                       ]

    //                   }
                      
    //               ]
    //           }
    //       ]
    //   },
    //   {
    //     "key": "3",
    //     "data": { 
    //         "name": "COMPETITION",
    //     }
    //     },
    //     {
    //       "key": "4",
    //       "data": { 
    //           "name": "PODCASTS",
    //       }
    //       },       

    // ],
      columns: [
        { CategoryName: 'News', View: '98' },
        { CategoryName: 'MARKET KPIs', View: '98' },
        { CategoryName: 'IMPORTS STATS', View: '98' },
        { CategoryName: 'COMPETITION', View: '98' },
        { CategoryName: 'PODCASTS', View: '98' },
      ],
			isLoader: false,
      globalFilter: '',
      categoryListList: [],
      renderUI: false,
      openDeleteAppModal: false,
      isDisabled: false,
		}
	}

  componentDidMount() {
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
        categoryListList: itemArr
      });
    } else {
      this.props.fetchcategoryList();
    }
  }

  componentWillReceiveProps(props) {
    console.log("props check", props)
    if (props.categoryListRes) {
			if (props.categoryListRes.data && props.categoryListRes.data.categoryList) {
				if (props.categoryListRes.data.categoryList.success===true) {
          this.setState({
            categoryListList: props.categoryListRes.data.categoryList.data,
            isLoader: false,
          });
				}
			}
    }
    if (props.doDeleteAppRes) {
			if (props.doDeleteAppRes.data && props.doDeleteAppRes.data.deleteApplication) {
				if (props.doDeleteAppRes.data.deleteApplication.success===true && isDelete) {
          isDelete = false;
          this.setState({
            openDeleteAppModal: false,
            isDisabled: false,
          });
          this.props.fetchAllApplication();
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
    });
    isDelete = true;
    let payload = {
      app_id: this.state.appId
    }
    this.props.deleteApplicationRecord(payload);
  }

  openDeleteApp = (rowData) => {
    this.setState({
      appId: rowData.application_id,
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
      <div style={{textAlign: 'center'}}>
        <button className="btn btn-edit-customer" onClick={()=> this.goUpdateApplication(rowData)}>
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </button>
        <button className="btn btn-delete-customer" onClick={()=> this.openDeleteApp(rowData)}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>      
      </div>
    );
  }
  viewTemplate(rowData, column) {
    return (
      <div style={{textAlign: 'center'}}>
        <Link to={"/subcategory-list"}>
          <i className="fa fa-eye" aria-hidden="true"></i> 
          </Link>  
      </div>
    );
  }
  goUpdateApplication = (rowData) => {
    // this.props.history.push({
    //   pathname: '/novus-bi-create',
    //   state: {appData: rowData}
    // })
  }

  render() {
    const header = (
      <React.Fragment>
        <div className="row custom-width">
          <div className="col-md-6 col-xs-12 col-sm-12">
            <div className="form-group has-search">
              <span className="fa fa-search form-control-feedback search-icon"></span>
              <InputText type="search" onInput={e => this.setState({ globalFilter: e.target.value })} className="form-control" size="40" placeholder="Search" />
            </div>
          </div>
        </div>
      </React.Fragment>
  );
    const { categoryListList } = this.state;
    console.log(categoryListList);
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
                        {/* <DataTable value={categoryListList} header={tableHeader} globalFilter={this.state.globalFilter} paginator={true} rows={10}  responsive scrollable  emptyMessage="No data found" sortMode="multiple" editable={false} selection={this.state.categorysList} onSelectionChange={this.onSelectionChange} className="novus_datatable"> */}
                        <DataTable value={this.state.columns} sortMode="multiple" editable={false} 
                selection={this.state.categorysList} onSelectionChange={this.onSelectionChange} paginator={true} rows={10} rowsPerPageOptions={[5,10,20]} responsive={true}>

                  {/* <Column selectionMode="multiple" style={{width:'2em'}}/> */}
									<Column field="CategoryName" header="Category Name"/>
									<Column field="View" header="View"  body={this.viewTemplate}  />
                  <Column className="tableCols" field="action" header="Type / Sections" body={this.actionTemplate} style={{width: '200px'}}/>
								</DataTable>

                {/* <TreeTable value={this.state.LocationUpdatedList}  scrollable frozenWidth="200px" scrollHeight="250px"   header={header} globalFilter={this.state.globalFilter}  emptyMessage="Locations not found">
                  
                  <Column field="name" header="CategoryName" expander frozen style={{width:'250px', height: '36px'}}></Column>
                  <Column field="View" header="View"  body={this.viewTemplate}  />
                  <Column className="tableCols" field="action" header="Type / Sections" body={this.actionTemplate} style={{width: '200px'}}/>
                    </TreeTable> */}
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
		deleteApplicationRecord: (data) => dispatch(deleteApplicationRecord(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CategoryListComponent);