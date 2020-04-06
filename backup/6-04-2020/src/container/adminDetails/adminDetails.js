import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import Loader from 'react-loader-advanced';
import Modal from "react-responsive-modal";
import './adminDetails.scss';
import LayoutWrapper from '../../component/LayoutWrapper/';
import { get_app_admin, doAppAdminRes } from '../../action/adminDetailsActions';
import { delete_admin, doDeleteAdminRes } from '../../action/deleteAdminActions';
import loaderImg from '../../assets/images/loader-example.gif';
import BackIcon from '../../assets/images/icon-left.svg';

let isDelete = false;

class AdminDetailsComponent extends React.PureComponent {

  constructor(props) {
    super(props);
    isDelete = false;
		this.state = {
			isLoader: false,
      globalFilter: '',
      openDeleteAppModal: false,
      isDisabled: false,
      adminList: [],
      selectAdminData: {},
      adminId: ''
		}
    this.actionTemplate = this.actionTemplate.bind(this);
  }

  componentDidMount() {
    let appData = this.props.location.state.applicationData;
    this.setState({
      selectAdminData: appData
    });
    let payLoad = {
      application_id: appData.application_id
    }
    this.props.getAppAdminList(payLoad);
  }

  componentWillReceiveProps(props) {
    if (props.appAdminRes) {
			if (props.appAdminRes.data && props.appAdminRes.data.adminDetails) {
				if (props.appAdminRes.data.adminDetails.success===true) {
          this.setState({
            adminList: props.appAdminRes.data.adminDetails.data,
            isLoader: false,
          });
				}
			}
    }
    if (props.doDeleteAdminRes) {
			if (props.doDeleteAdminRes.data && props.doDeleteAdminRes.data.deleteAdmin) {
				if (props.doDeleteAdminRes.data.deleteAdmin.success===true && isDelete) {
          isDelete = false;
          this.setState({
            openDeleteAppModal: false,
            isDisabled: false,
          });
          let payLoadData = {
            application_id: this.state.selectAdminData.application_id
          }
          this.props.getAppAdminList(payLoadData);
				}
			}
    }
  }

  actionTemplate(rowData, column) {
    return (
      <div style={{textAlign: 'center'}}>
        <button className="btn btn-delete-customer" onClick={()=> this.openDeleteApp(rowData)}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>      
      </div>
    );
  }

  createAdmin(){
    this.props.history.push('/create-admin',{
      applicationData: this.state.selectAdminData
    })
  }

  deleteApp = () => {
    this.setState({
      isDisabled: true,
    });
    isDelete = true;
    let payload = {
      admin_id: this.state.adminId
    }
    this.props.deleteAdmin(payload);
  }

  openDeleteApp = (rowData) => {
    this.setState({
      adminId: rowData.user_id,
      openDeleteAppModal: true,
    });
  }

  cancelDeleteApp = () => {
    this.setState({
      openDeleteAppModal: false,
    });
  }

  handleBack = () => {
    this.props.history.push('/applications');
  }

  actionAddressTemplate = (rowData) => {
    return (
      <div>
        {rowData.address1} {rowData.address2}
      </div>
    );
  }

  render() {
    const { selectAdminData } = this.state;
    const { adminList } = this.state;
    const Header = (<div className="offer_head">Applications</div>);
    const spinner = <span><img src={loaderImg} alt="" /></span>;
    var tableHeader = <div style={{'textAlign':'left'}}>
                        <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
                        <input type="text" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Search" size="50"/>
                      </div>;
    return (
      <Loader show={this.state.isLoader} message={spinner}>
        <LayoutWrapper title="Applications" header={Header} >
          <div className="admin-list_content">
            <div className="customer_inner_content">
              <div  className="row pl-pr-15px xs-pl-pr-0px">
                <div className="col-md-12 customertabpanel">
                  <div className="administration_tab">
                    <div className="row pl-pr-15px xs-pl-pr-0px">
                      <div className="col-md-4">
                        <div className="createprofile_heading">
                          <div className="createprofile_back_icon_text"  onClick={this.handleBack}>
                            <img src={BackIcon} alt="" className="createprofile_back_icon" />
                            <span className="createprofile_go_back">Back to Admin</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="admin-list-title">{selectAdminData.application_name} Application</div>
                      </div>
                      <div className="col-md-4">
                        <div style={{ textAlign: 'right' }}>
                          <button className="btn btn-create-admin" onClick={() => this.createAdmin()}>Create Admin</button>
                        </div>
                      </div>
                    </div>
                    <div className="row pl-pr-15px xs-pl-pr-0px">
                      <div className="col-12 tableheight advisor-tab-tableheight" style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 15 }}>
                        <DataTable value={adminList} header={tableHeader} globalFilter={this.state.globalFilter} paginator={true} rows={10}  responsive scrollable  emptyMessage="No data found">
                          <Column className="tableCols" field="email" header="Email" sortable style={{width: '280px'}}/>
                          <Column className="tableCols" field="fullname" header="Full Name" sortable style={{width: '120px'}}/>
                          <Column className="tableCols" field="address" header="Address" body={this.actionAddressTemplate} sortable style={{width: '150px'}}/>
                          <Column className="tableCols" field="country" header="Country" sortable style={{width: '120px'}} />
                          <Column className="tableCols" field="state" header="State" sortable style={{width: '120px'}} />
                          <Column className="tableCols" field="city" header="City" sortable style={{width: '120px'}} />
                          <Column className="tableCols" field="action" header="Action" body={this.actionTemplate} style={{width: '130px'}}/>
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
                              <button className="btn delete-user-yes-btn" onClick={() => this.deleteApp()} disabled={this.state.isDisabled}>
                                Yes
                              </button>
                            </div>
                            <div className="col-6 col-md-6 col-sm-6">
                              <button className="btn delete-user-no-btn" onClick={() => this.cancelDeleteApp()}>
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

AdminDetailsComponent.propTypes = {
  appAdminRes: PropTypes.any,
	doDeleteAdminRes: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  appAdminRes: doAppAdminRes,
	doDeleteAdminRes: doDeleteAdminRes,
});

function mapDispatchToProps(dispatch) {
  return {
    getAppAdminList: (data) => dispatch(get_app_admin(data)),
		deleteAdmin: (data) => dispatch(delete_admin(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AdminDetailsComponent);