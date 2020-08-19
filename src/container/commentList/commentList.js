
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import './commentList.scss';
import LayoutWrapper from '../../component/LayoutWrapper/';
import { fetchcommentList, getcommentListRes } from '../../action/commentListActions';
import { deleteApplicationRecord, doDeleteAppRes } from '../../action/deleteApplicationActions';
// import Swal from 'sweetalert2';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
// import { getItem } from '../../utils/localStore';
import Modal from "react-responsive-modal";
import { getItem } from '../../utils/localStore';
import logoImg from '../../assets/images/novusone-logo.png';


let isDelete = false;

class CommentListComponent extends React.PureComponent {

  // constructor function
  constructor() { 
    super();
    isDelete = false;
		this.state = {
			isLoader: false,
      globalFilter: '',
      commentListList: [],
      renderUI: false,
      openDeleteAppModal: false,
      isDisabled: false,
		}
    this.actionTemplate = this.actionTemplate.bind(this);
	}

  // on component load function call
  componentDidMount() {

    // call function if already setup comment data get otherwise call a function to get comment list
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
        commentListList: itemArr
      });
    } else {
      
      // get comment list action call
      this.props.fetchcommentList();
    }
  }

  // on component receive new props
  componentWillReceiveProps(props) {
    console.log("props check", props)

    // get comment list response
    if (props.commentListRes) {
			if (props.commentListRes.data && props.commentListRes.data.commentList) {
				if (props.commentListRes.data.commentList.success===true) {
          this.setState({
            commentListList: props.commentListRes.data.commentList.data,
            isLoader: false,
          });
				}
			}
    }

    // comment delete confrim response
    if (props.doDeleteAppRes) {
			if (props.doDeleteAppRes.data && props.doDeleteAppRes.data.deleteApplication) {
				if (props.doDeleteAppRes.data.deleteApplication.success===true && isDelete) {
          isDelete = false;
          this.setState({
            openDeleteAppModal: false,
            isDisabled: false,
          });

          // call comment list action whene delete success
          this.props.fetchAllApplication();
				}
			}
    }
  }

  // on table select change function call
  onSelectionChange = (e) => {   
    this.setState({
      wmsList: e.value,
    })
  }

// table action button template
  actionTemplate(rowData, column) {
    return (
      <div style={{textAlign: 'center'}}>
        <button className="btn btn-delete-customer" onClick={()=> this.openDeleteApp(rowData)}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>      
      </div>
    );
  }

  // goUpdateApplication = (rowData) => {
  //   // this.props.history.push({
  //   //   pathname: '/novus-bi-create',
  //   //   state: {appData: rowData}
  //   // })
  // }

  
  // createApp(){
  //   this.props.history.push('/novus-bi-create')
  // }

  
// delete  confrim call
  deleteApp = () => {
    this.setState({
      isDisabled: true,
    });
    isDelete = true;
    let payload = {
      app_id: this.state.appId
    }

    // delete comment action call
    this.props.deleteApplicationRecord(payload);
  }

// delete confirm model-popup open
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

 // category icon show template in table
  actionIconTemplate = (data) => {
    return (
      <div>
        {/* <img src={data.icon} alt='icon' style={{width: 50, height: 50}} /> */}
        <img src={logoImg} alt='icon' className="image_icons" />
      </div>
    );
  }

  // show time template for table
  adminActionTemplate = (rowData) => {
    return (
      <div className="date_field" style={{textAlign: 'center'}}>
        <p >
          19/02/2020 11:15  
        </p>    
      </div>
    );
  }

  // goToAdmin = (data) => {
  //   // this.props.history.push('/adminDetails',{
  //   //   applicationData: data
  //   // })
  // }

  render() {

    // get comment list from state
    const { commentListList } = this.state;
    console.log(commentListList);

    // get user role from global function
    let userRole = getItem('userRoleId');

    // set page header title
    const Header = (<div className="offer_head">Comment List</div>);

    // loader spinner
    const spinner = <span><img src={loaderImg} alt="" /></span>;

    // table header
    var tableHeader = <div style={{'textAlign':'left'}}>
                        <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
                        <input type="text" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Search" size="50"/>
                    </div>;
    return (
      <div className="active_drop_menus">
      <Loader show={this.state.isLoader} message={spinner}>
        <LayoutWrapper title="Comment List" header={Header} >
          <div className="application-list_content">
            <div className="customer_inner_content">
              <div  className="row pl-pr-15px xs-pl-pr-0px">
                <div className="col-md-12 customertabpanel">
                  <div className="administration_tab">
                    <div  className="row pl-pr-15px xs-pl-pr-0px">
                      <div className="col-sm-12 col-md-6">
                        <div className="heading_title">Comment List</div>
                      </div>                      
                    </div>
                    
                    <div className="row pl-pr-15px xs-pl-pr-0px">
                      <div className="col-12 tableheight advisor-tab-tableheight" style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 15 }}>
                        <DataTable value={commentListList} header={tableHeader} globalFilter={this.state.globalFilter} paginator={true} rows={10}  responsive scrollable  emptyMessage="No data found" sortMode="multiple" editable={false} selection={this.state.wmsList} onSelectionChange={this.onSelectionChange} className="novus_datatable">
                        <Column selectionMode="multiple" style={{width:'2em'}}/>
                          <Column className="tableCols" field="icon" header="" body={this.actionIconTemplate}  style={{width: '100px'}}/>
                          <Column className="tableCols" field="application_name" header="Title" sortable style={{width: '120px'}}/>
                          {
                            userRole === '1' &&
                            <Column className="tableCols" field="admin" header="Date" body={this.adminActionTemplate} style={{width: '120px'}}/>
                          }
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
      </div>
    );
  }
}

// setup props data
CommentListComponent.propTypes = {
	commentListRes: PropTypes.any,
	doDeleteAppRes: PropTypes.any,
};

// setup response function
const mapStateToProps = createStructuredSelector({
  commentListRes: getcommentListRes,
	doDeleteAppRes: doDeleteAppRes,
});

// dispatch function
function mapDispatchToProps(dispatch) {
  return {
		fetchcommentList: () => dispatch(fetchcommentList()),
		deleteApplicationRecord: (data) => dispatch(deleteApplicationRecord(data)),
  };
}

// connect component to redux store
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CommentListComponent);