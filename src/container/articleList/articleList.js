
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import './articleList.scss';
import LayoutWrapper from '../../component/LayoutWrapper/';
import { fetcharticleList, getarticleListRes } from '../../action/articleListActions';
import { deleteApplicationRecord, doDeleteAppRes } from '../../action/deleteApplicationActions';
// import Swal from 'sweetalert2';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
// import { getItem } from '../../utils/localStore';
import Modal from "react-responsive-modal";
import { getItem } from '../../utils/localStore';


let isDelete = false;

class ArticleListComponent extends React.PureComponent {

  // constructor function
  constructor() { 
    super();
    isDelete = false;
		this.state = {
			isLoader: false,
      globalFilter: '',
      articleList: [],
      renderUI: false,
      openDeleteAppModal: false,
      isDisabled: false,
		}
    this.actionTemplate = this.actionTemplate.bind(this);
	}

  // on component load function call
  componentDidMount() {

    // get appData from global function
    let appData = JSON.parse(getItem('adminAppData'));

    // already have app data set it to directly or call action to get that
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
        articleList: itemArr
      });
    } else {

      // article list get action function
      this.props.fetcharticleList();
    }
  }

  // on component receive new props
  componentWillReceiveProps(props) {
    console.log("props check", props)

    // article list response
    if (props.articleListRes) {
			if (props.articleListRes.data && props.articleListRes.data.articleList) {
				if (props.articleListRes.data.articleList.success===true) {
          this.setState({
            articleList: props.articleListRes.data.articleList.data,
            isLoader: false,
          });
				}
			}
    }

    // article delete confirm response
    if (props.doDeleteAppRes) {
			if (props.doDeleteAppRes.data && props.doDeleteAppRes.data.deleteApplication) {
				if (props.doDeleteAppRes.data.deleteApplication.success===true && isDelete) {
          isDelete = false;
          this.setState({
            openDeleteAppModal: false,
            isDisabled: false,
          });

          // on delete success again call update article list action
          this.props.fetchAllApplication();
				}
			}
    }
  }

   // on select get data from data table
   onSelectionChange = (e) => {   
    this.setState({
      wmsList: e.value,
    })
  }


  // table action buttons
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

  goUpdateApplication = (rowData) => {
    // this.props.history.push({
    //   pathname: '/novus-bi-create',
    //   state: {appData: rowData}
    // })
  }


  // create new article page routing
  createApp(){
    this.props.history.push('/novus-bi-create')
  }

  
  // delete article function
  deleteApp = () => {
    this.setState({
      isDisabled: true,
    });
    isDelete = true;
    let payload = {
      app_id: this.state.appId
    }

    // delete article acation call
    this.props.deleteApplicationRecord(payload);
  }

  // delete model open
  openDeleteApp = (rowData) => {
    this.setState({
      appId: rowData.application_id,
      openDeleteAppModal: true,
    });
  }

  // cancel delete
  cancelDeleteApp = () => {
    this.setState({
      openDeleteAppModal: false,
    });
  }

  // show article iamge icon
  actionIconTemplate = (data) => {
    return (
      <div>
        {/* <img src={data.icon} alt='icon' style={{width: 50, height: 50}} /> */}
        <img src='http://localhost:3000/static/media/novusone-logo.6b9fef02.png' alt='icon' className="image_icons" />
      </div>
    );
  }

  // article status template for table 
  actionStatusTemplate = (data) => {
    return (
      <div className="status_main_bx">
        <button className="btn pending-status">
          Draft
        </button> 
       
      </div>
    );
  }

  // article date template for table
  adminActionTemplate = (rowData) => {
    return (
      <div className="date_field" style={{textAlign: 'center'}}>
        <p onClick={()=> this.goToAdmin(rowData)}>
          19/02/2020 11:15  
        </p>    
      </div>
    );
  }

  goToAdmin = (data) => {
    // this.props.history.push('/adminDetails',{
    //   applicationData: data
    // })
  }

  render() {

    // get article list data from state
    const { articleList } = this.state;
    console.log(articleList);

    // get user role from global function
    let userRole = getItem('userRoleId');

    // set page header title
    const Header = (<div className="offer_head">Article List</div>);

    // spinner loader 
    const spinner = <span><img src={loaderImg} alt="" /></span>;

    // table header
    var tableHeader = <div style={{'textAlign':'left'}}>
                        <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
                        <input type="text" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Search" size="50"/>
                    </div>;
    return (
      <Loader show={this.state.isLoader} message={spinner}>
        <LayoutWrapper title="Article List" header={Header} >
          <div className="application-list_content">
            <div className="customer_inner_content">
              <div  className="row pl-pr-15px xs-pl-pr-0px">
                <div className="col-md-12 customertabpanel">
                  <div className="administration_tab">
                    <div  className="row pl-pr-15px xs-pl-pr-0px">
                      <div className="col-sm-12 col-md-6">
                        <div className="heading_title">Article List</div>
                      </div>                      
                    </div>
                    
                    <div className="row pl-pr-15px xs-pl-pr-0px">
                      <div className="col-12 tableheight advisor-tab-tableheight" style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 15 }}>
                        <DataTable value={articleList} header={tableHeader} globalFilter={this.state.globalFilter} paginator={true} rows={10}  responsive scrollable  emptyMessage="No data found" sortMode="multiple" editable={false} selection={this.state.wmsList} onSelectionChange={this.onSelectionChange} className="novus_datatable">
                        <Column selectionMode="multiple" style={{width:'2em'}}/>
                          <Column className="tableCols" field="icon" header="" body={this.actionIconTemplate}  style={{width: '100px'}}/>
                          <Column className="tableCols" field="application_name" header="Title" sortable style={{width: '120px'}}/>
                          {
                            userRole === '1' &&
                            <Column className="tableCols" field="admin" header="Date" body={this.adminActionTemplate} style={{width: '120px'}}/>
                          }
                          <Column className="tableCols" field="" header="Status" style={{width: '120px'}} body={this.actionStatusTemplate} />
                          {
                            userRole === '1' &&
                            <Column className="tableCols" field="action" header="Type / Sections" body={this.actionTemplate} style={{width: '200px'}}/>
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
    );
  }
}

 // setup props data
ArticleListComponent.propTypes = {
	articleListRes: PropTypes.any,
	doDeleteAppRes: PropTypes.any,
};

 // setup response function
const mapStateToProps = createStructuredSelector({
  articleListRes: getarticleListRes,
	doDeleteAppRes: doDeleteAppRes,
});

// dispatch function
function mapDispatchToProps(dispatch) {
  return {
		fetcharticleList: () => dispatch(fetcharticleList()),
		deleteApplicationRecord: (data) => dispatch(deleteApplicationRecord(data)),
  };
}

// connect component to redux store
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ArticleListComponent);