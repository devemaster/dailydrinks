
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import './applications.scss';
import LayoutWrapper from '../../component/LayoutWrapper/';
import { fetchAllApplication, getAllApplicationRes } from '../../action/applicationActions';
import { deleteApplicationRecord, doDeleteAppRes } from '../../action/deleteApplicationActions';
// import Swal from 'sweetalert2';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
// import { getItem } from '../../utils/localStore';
import Modal from "react-responsive-modal";
import { getItem } from '../../utils/localStore';

let isDelete = false;

class ApplicationsComponent extends React.PureComponent {
  constructor() { 
    super();
    isDelete = false;
		this.state = {
			isLoader: false,
      globalFilter: '',
      applicationList: [],
      renderUI: false,
      openDeleteAppModal: false,
      isDisabled: false,
		}
    this.actionTemplate = this.actionTemplate.bind(this);
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
        applicationList: itemArr
      });
    } else {
      this.props.fetchAllApplication();
    }
  }

  componentWillReceiveProps(props) {
    if (props.allApplicationRes) {
			if (props.allApplicationRes.data && props.allApplicationRes.data.applicationList) {
				if (props.allApplicationRes.data.applicationList.success===true) {
          this.setState({
            applicationList: props.allApplicationRes.data.applicationList.data,
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
    this.props.history.push({
      pathname: '/update-application',
      state: {appData: rowData}
    })
  }

  createApp(){
    this.props.history.push('/create-application')
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

  actionIconTemplate = (data) => {
    return (
      <div>
        <img src={data.icon} alt='' style={{width: 50, height: 50}} />
      </div>
    );
  }

  adminActionTemplate = (rowData) => {
    return (
      <div style={{textAlign: 'center'}}>
        <button className="btn btn-edit-customer" onClick={()=> this.goToAdmin(rowData)}>
          <span>Admin</span>
        </button>    
      </div>
    );
  }

  goToAdmin = (data) => {
    this.props.history.push('/adminDetails',{
      applicationData: data
    })
  }

  render() {
    const { applicationList } = this.state;
    console.log(applicationList);
    let userRole = getItem('userRoleId');
    const Header = (<div className="offer_head">Applications</div>);
    const spinner = <span><img src={loaderImg} alt="" /></span>;
    var tableHeader = <div style={{'textAlign':'left'}}>
                        <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
                        <input type="text" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Search" size="50"/>
                    </div>;
    return (
      <Loader show={this.state.isLoader} message={spinner}>
        <LayoutWrapper title="Applications" header={Header} >
          <div className="application-list_content">
            <div className="customer_inner_content">
              <div  className="row pl-pr-15px xs-pl-pr-0px">
                <div className="col-md-12 customertabpanel">
                  <div className="administration_tab">
                    <div  className="row pl-pr-15px xs-pl-pr-0px">
                      <div className="col-sm-12 col-md-6">
                        <div className="heading_title">All Applications</div>
                      </div>
                      {
                        userRole === '1' &&
                        <div className="col-sm-12 col-md-6" style={{ textAlign: 'right' }}>
                          <button className="btn btn-placeOrder" onClick={() => this.createApp()}>Create Application</button>
                        </div>
                      }
                    </div>
                    <div className="row pl-pr-15px xs-pl-pr-0px">
                      <div className="col-12 tableheight advisor-tab-tableheight" style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 15 }}>
                        <DataTable value={applicationList} header={tableHeader} globalFilter={this.state.globalFilter} paginator={true} rows={9}  responsive scrollable  emptyMessage="No data found">
                          <Column className="tableCols" field="icon" header="Icon" body={this.actionIconTemplate} sortable style={{width: '100px'}}/>
                          <Column className="tableCols" field="application_name" header="Application Name" sortable style={{width: '120px'}}/>
                          {
                            userRole === '1' &&
                            <Column className="tableCols" field="admin" header="Admin" body={this.adminActionTemplate} style={{width: '120px'}}/>
                          }
                          {
                            userRole === '1' &&
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
    );
  }
}

ApplicationsComponent.propTypes = {
	allApplicationRes: PropTypes.any,
	doDeleteAppRes: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
	allApplicationRes: getAllApplicationRes,
	doDeleteAppRes: doDeleteAppRes,
});

function mapDispatchToProps(dispatch) {
  return {
		fetchAllApplication: () => dispatch(fetchAllApplication()),
		deleteApplicationRecord: (data) => dispatch(deleteApplicationRecord(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ApplicationsComponent);