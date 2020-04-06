import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import Loader from 'react-loader-advanced';
import Modal from "react-responsive-modal";
import './users.scss';
import LayoutWrapper from '../../component/LayoutWrapper/';
import { getAllUsers, doUserAllRes } from '../../action/userActions';
import { updateUserStatus, doUserApprovedRes } from '../../action/approvedUserActions';
import { deleteUserDetails, doDeleteUserRes } from '../../action/deleteUserActions';
import { fetchAllApplication, getAllApplicationRes } from '../../action/applicationActions';
import { approveAppUser, doUserApproveAppRes } from '../../action/approveUserAppActions';
import { checkUserName, doCheckUserRes } from '../../action/checkUserActions';
import loaderImg from '../../assets/images/loader-example.gif';
import { getItem } from '../../utils/localStore';
import Swal from 'sweetalert2';

let isApprove = false;
let isDelete = false;
let isApprovedApp = false;
let userRole = getItem('userRoleId');
let isUserAvailable = false;

class UsersComponent extends React.PureComponent {
  constructor() { 
    super();
    isApprove = false;
    isDelete = false;
    isApprovedApp = false;
    isUserAvailable = false;
		this.state = {
			isLoader: false,
      globalFilter: '',
      usersList: [],
      openDeleteUserModal: false,
      isdisabled: false,
      openApprovedModal: false,
      applicationList: [],
      isSubmitedUser: false,
      isSubmited: false,
      applicationId: '',
      applicationName: '',
      userName: '',
      selectedUserList: [],
      openErrorModal: false,
      uiRender: false,
      selectedUserId: '',
		}
    this.actionTemplate = this.actionTemplate.bind(this);
    this.approveDisapprove = this.approveDisapprove.bind(this);
    this.createApproved = this.createApproved.bind(this);
  }

  componentDidMount() {
    let userAppGroup = getItem('adminAppId');
    if (userAppGroup !== null) {
      this.setState({
        isLoader: false,
        applicationId: getItem('adminAppId'),
        applicationName: getItem('adminAppName'),
      });
    } else {
      this.setState({
        isLoader: false,
      });
    }
    this.props.getUsers();
    this.props.fetchAllApplication();
  }

  componentWillReceiveProps(props) {
    if (props.allApplicationRes) {
			if (props.allApplicationRes.data && props.allApplicationRes.data.applicationList) {
				if (props.allApplicationRes.data.applicationList.success===true) {
          this.setState({
            applicationList: props.allApplicationRes.data.applicationList.data
          },()=>{});
        }
      }
    }
    if (props.allUsersRes) {
			if (props.allUsersRes.data && props.allUsersRes.data.allUser) {
				if (props.allUsersRes.data.allUser.success===true) {
          this.setState({
            usersList: props.allUsersRes.data.allUser.data,
            isLoader: false,
          });
				}
			}
    }
    
    if (props.doUserApprovedRes) {
      if (props.doUserApprovedRes.data && props.doUserApprovedRes.data.approvedUser) {
        if (props.doUserApprovedRes.data.approvedUser.success === true && isApprove) {
          isApprove = false;
          this.props.getUsers();
        }
      }
    }
    if (props.userApproveAppRes) {
      if (props.userApproveAppRes.data && props.userApproveAppRes.data.userApproveApp) {
        if (props.userApproveAppRes.data.userApproveApp.success === true ) {
          isApprovedApp = false;
          this.props.getUsers();
          this.setState({
            openApprovedModal: false
          });
        }
      }
    }
    if (props.doDeleteUserRes) {
      if (props.doDeleteUserRes.data && props.doDeleteUserRes.data.deleteUser) {
        if (props.doDeleteUserRes.data.deleteUser.success === true && isDelete) {
          isDelete = false;
          this.props.getUsers();
          this.setState({
            openDeleteUserModal: false,
            isdisabled: false
          });
        }
      }
    }
    
    if(props.checkUserRes){
      if(props.checkUserRes.data.checkUser ){
          if(props.checkUserRes.data.checkUser.success === true && isUserAvailable) {
              isUserAvailable = false;
              this.setState({
                  isLoader: false
              });
              let localArray = this.state.selectedUserList;
              if (localArray.length > 0) {
                let isTrue = 0;
                if (userRole == '1') {
                  for (let items of this.state.selectedUserList) {
                    if (items.application_id == this.state.applicationId) {
                      isTrue = 1;
                    }
                  }
                } else {
                  for (let items of localArray) {
                    if (items.user_name == this.state.userName) {
                      isTrue = 1;
                    }
                  }
                }
                if (isTrue == 0) {
                  let localArr = localArray;
                  let appName = '';
                  if (userRole == '1') {
                    for (let item of this.state.applicationList) {
                      if (Number(this.state.applicationId) == item.application_id) {
                        appName = item.application_name;
                      }
                    }
                  } else {
                    appName = this.state.applicationName
                  }
                  localArr.push({
                    application_id: this.state.applicationId,
                    application_name: appName,
                    user_name: this.state.userName,
                  });
                  this.setState({
                    selectedUserList: localArr,
                  }, () => {
                    if (userRole == '1') {
                      this.setState({
                        applicationId: '',
                        userName: '',
                        isSubmitedUser: false
                      })
                    } else {
                      this.setState({
                        userName: '',
                        isSubmitedUser: false
                      })
                    }
                  });
                } else {
                  this.setState({
                    openErrorModal: true
                  });
                }
              } else {
                let localArr = this.state.selectedUserList;
                let appName = '';
                // for (let item of this.state.applicationList) {
                //   if (this.state.applicationId == item.application_id) {
                //     appName = item.application_name;
                //   }
                // }
                if (userRole == '1') {
                  for (let item of this.state.applicationList) {
                    if (Number(this.state.applicationId) == item.application_id) {
                      appName = item.application_name;
                    }
                  }
                } else {
                  appName = this.state.applicationName
                }
                localArr.push({
                  application_id: this.state.applicationId,
                  application_name: appName,
                  user_name: this.state.userName,
                });
                this.setState({
                  selectedUserList: localArr,
                }, () => {
                  if (userRole == '1') {
                    this.setState({
                      applicationId: '',
                      userName: '',
                      isSubmitedUser: false
                    })
                  } else {
                    this.setState({
                      userName: '',
                      isSubmitedUser: false
                    })
                  }
                });
              }
          }
          if(props.checkUserRes.data.checkUser.success === false && isUserAvailable) {
              isUserAvailable = false;
              this.setState({
                  isLoader: false
              });
              Swal.fire({
                  title: props.checkUserRes.data.checkUser.message,
                  type: 'info',
                  confirmButtonText: 'OK',
                  allowOutsideClick: false,
                  timer: 3000
              });
          }
      } else {
          setTimeout(() => { this.setState({
              isLoader: false
          }); }, 3000);
      }
    }
  }

  approvedUser = () => {
    this.setState({
      isSubmited: true,
    }, () => { });
    this.validate(this.state);
    const errors = this.validate(this.state);
    if (Object.keys(errors).length === 0) {
      let selectedUsr = this.state.selectedUserList;

      for (var i = 0; i < selectedUsr.length; i++) {
        var o = selectedUsr[i];
        delete o.application_name;
      }
      // for (let item of selectedUsr) {
      //   delete item.application_name
      // }
      let payReq = {
        create_user: selectedUsr,
        user_id: this.state.selectedUserId
      }
      this.props.approveAppUser(payReq);
    }
  }

  approveDisapprove(rowData, status){
    let payloadReq = {
      user_id: rowData.user_id,
      status: status
    }
    this.props.updateUserStatus(payloadReq);
    isApprove = true;
  }

  deleteUser = () => {
    let payLoad = {
      user_id: this.state.userId
    }
    this.props.deleteUserRecord(payLoad);
    isDelete = true;
    this.setState({
      isdisabled: true
    });
  }

  updateUser = (data) => {
    this.props.history.push({
      pathname: 'updateUser',
      state: {userData: data}
    });
  }

  createApproved(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  actionTemplate(rowData, column) {
    // console.log(rowData);
    return (<div style={{textAlign: 'center'}}>
      {
        rowData.status === 1 &&
        <div>
          <button className="btn btn-edit-customer" onClick={() => { this.openApproved(rowData) }}>Approve</button>
          <button className="btn btn-delete-customer" onClick={() => { this.approveDisapprove(rowData, '2') }}>
            Disapprove
          </button>
        </div>
      }
      {
        rowData.status === 0 &&
        <div>
          <button className="btn btn-delete-customer" onClick={() => { this.approveDisapprove(rowData, '2') }}>
            Disapprove
          </button>
        </div>
      }
      {
        rowData.status === 2 &&
        <div>
          <button className="btn btn-edit-customer" onClick={() => { this.openApproved(rowData) }}>
            Approve
          </button>
        </div>
      }
    </div>);
  }

  actionUpdateTemplate = (rowData) => {
    return (
      <div style={{textAlign: 'center'}}>
        <button className="btn btn-edit-customer" onClick={() => { this.updateUser(rowData) }}><i className="fa fa-pencil" aria-hidden="true"></i></button>
        <button className="btn btn-delete-customer" onClick={() => { this.openDeleteModal(rowData) }}><i className="fa fa-trash" aria-hidden="true"></i></button>
      </div>
    );
  }

  actionAddressTemplate = (rowData) => {
    return (
      <div>
        {rowData.address1} {rowData.address2}
      </div>
    );
  }

  statusTemplate = (rowData) => {
    return (<div style={{textAlign: 'center'}}>
      {
        rowData.status === 1 &&
        <div className="btn pending-status">Pending</div>
      }
      {
        rowData.status === 0 &&
        <div className="btn approve-status">Approved</div>
      }
      {
        rowData.status === 2 &&
        <div className="btn disapprove-status">Disapproved</div>
      }
    </div>);
  }

  createUser(){
    this.props.history.push('/createUser')
  }

  openDeleteModal = (data) => {
    this.setState({
      userId: data.user_id,
      openDeleteUserModal: true,
    });
  }

  cancelDeleteUser = () => {
    this.setState({
      openDeleteUserModal: false,
    });
  }

  openApproved = (data) => {
    let appUserName = data.app_user;
    if (appUserName.length > 0) {
      if (userRole == '1') {
        for (let item of this.state.applicationList) {
          for(let app of appUserName) {
            if (app.application_id == item.application_id) {
              app.application_name = item.application_name;
            }
          }
        }
      } else {
        for(let app of appUserName) {
          app.application_name = this.state.applicationName;
        }
      }
      
      this.setState({
        openApprovedModal: true,
        selectedUserList: appUserName,
        selectedUserId: data.user_id
      });
    } else {
      this.setState({
        openApprovedModal: true,
        selectedUserList: appUserName,
        selectedUserId: data.user_id
      });
    }
  }

  closeApproved = () => {
    if (userRole == '1') {
      this.setState({
        openApprovedModal: false,
        applicationId: '',
        applicationName: '',
        userName: '',
        selectedUserList: [],
      });
    } else {
      this.setState({
        openApprovedModal: false,
        userName: '',
        selectedUserList: [],
      });
    }
    
  }

  closeErrorModal = () => {
    this.setState({
        openErrorModal: false
    });
  } 

  validateUser(values) {
    const errors = {};
    if (values.applicationId == '') {
      errors.applicationId = 'Please select application';
    }
    if (values.userName == '') {
      errors.userName = 'Please enter username';
    }
    return errors;
  }

  validate(values) {
    const errors = {};
    if (values.selectedUserList.length === 0) {
      errors.selectedUserList = 'Please select application and enter username';
    }
    return errors;
  }

  addApproved = () => {
    this.setState({
      isSubmitedUser: true,
    }, () => {});
    this.validateUser(this.state);
    const errors = this.validateUser(this.state);

    if (Object.keys(errors).length === 0) {
      let requestData = {
        UserName: this.state.userName
      }
      isUserAvailable = true;
      this.props.checkUserName(requestData)
      this.setState({
        isLoader: true
      });
    }
  }

  removeApproved = (data) => {
    if(this.state.selectedUserList.length == 1){
      this.setState({ 
        selectedUserList: [],
        uiRender: true
      },()=>{ })
    } else {
      var index = this.state.selectedUserList.indexOf(data)
      let removeData = this.state.selectedUserList.slice(0, index).concat(this.state.selectedUserList.slice(index + 1, this.state.selectedUserList.length));
      this.setState({ 
        selectedUserList: removeData,
        uiRender: true
      },()=>{ })
    }
  }

  actionApproveTemplate = (rowData) => {
    return (
      <div style={{textAlign: 'center'}}>
        <button className="btn addmore-delete-btn" onClick={() => this.removeApproved(rowData)}><i className="fa fa-trash" aria-hidden="true"></i></button>
      </div>
    )
  }

  render() {
    const { usersList, isSubmitedUser, selectedUserList, isSubmited } = this.state;
    const errorsUser = this.validateUser(this.state);
    const errors = this.validate(this.state);
    const Header = (<div className="offer_head">Users</div>);
    const spinner = <span><img src={loaderImg} alt="" /></span>;
    var tableHeader = <div style={{'textAlign':'left'}}>
                        <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
                        <input type="text" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Search" size="50"/>
                    </div>;
    return (
      <Loader show={this.state.isLoader} message={spinner}>
        <LayoutWrapper title="Users" header={Header} >
            <div className="customer_content">
              <div className="customer_inner_content">
                <div  className="row pl-pr-15px xs-pl-pr-0px">
                  <div className="col-md-12 customertabpanel">
                    <div className="administration_tab">

                      <div  className="row pl-pr-15px xs-pl-pr-2px">
                        <div className="col-sm-12 col-md-6">
                          <div className="heading_title">All Users</div>
                        </div>
                        <div className="col-sm-12 col-md-6" style={{ textAlign: 'right' }}>
                          <button className="btn btn-placeOrder" onClick={() => this.createUser()}>Create User</button>
                        </div>
                      </div>
                      <div className="row pl-pr-15px xs-pl-pr-0px">
                        <div className="col-12 tableheight advisor-tab-tableheight" style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 15 }}>
                          <DataTable value={usersList} header={tableHeader} global Filter={this.state.globalFilter} paginator={true} rows={9}  responsive scrollable  emptyMessage="No data found" >
                            <Column className="tableCols" field="email" header="Email" sortable style={{width: '280px'}}/>
                            <Column className="tableCols" field="fullname" header="Full Name" sortable style={{width: '120px'}}/>
                            <Column className="tableCols" field="address" header="Address" body={this.actionAddressTemplate} sortable style={{width: '150px'}}/>
                            <Column className="tableCols" field="country" header="Country" sortable style={{width: '120px'}} />
                            <Column className="tableCols" field="status"  body={this.statusTemplate} header="Status" sortable style={{width: '120px'}}/>
                            <Column className="tableCols" field="action" header="Approve/Disapprove" body={this.actionTemplate} style={{width: '220px'}}/>
                            <Column className="tableCols" field="action1" header="Action" body={this.actionUpdateTemplate} style={{width: '130px'}}/>
                          </DataTable>
                        </div>
                        <Modal open={this.state.openDeleteUserModal} onClose={this.cancelDeleteUser} center>
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
                                        onClick={() => this.deleteUser() }
                                        disabled={this.state.isdisabled}
                                    >
                                        Yes
                                    </button>
                                </div>
                                <div className="col-6 col-md-6 col-sm-6">
                                    <button
                                        className="btn delete-user-no-btn"
                                        onClick={() => this.cancelDeleteUser() }
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                          </div>
                        </Modal>
                        <Modal open={this.state.openApprovedModal} onClose={this.closeApproved} center>
                          <div className="approve-user-modal" style={{width: 600}}>
                            <div className="row" >
                              <div className="approve-user-header">Approve Users</div>
                            </div>
                            <div className="row" >
                                <div className="col-5 col-md-5 col-sm-12">
                                  {
                                    userRole == '1' ? 
                                    <div className="form-group">
                                        <select className="form-control" name="applicationId" onChange={(e) => this.createApproved(e)} value={this.state.applicationId}>
                                            <option value=''>Select Application</option>
                                            {
                                                (this.state.applicationList) && this.state.applicationList.map((opp, j) =>
                                                    <option key={j} value={opp.application_id} disabled={opp.disabled}>{opp.application_name}</option>
                                                )
                                            }
                                        </select>
                                        {errorsUser && isSubmitedUser && <span className="error-message">{errorsUser.applicationId}</span>}
                                    </div>
                                    :
                                    <div className="form-group">
                                        <select className="form-control" name="applicationId" value={this.state.applicationId} readOnly>
                                            
                                            <option value={this.state.applicationId} disabled={true}>{this.state.applicationName}</option>
                                              
                                        </select>
                                        {errorsUser && isSubmitedUser && <span className="error-message">{errorsUser.applicationId}</span>}
                                    </div>
                                  }
                                </div>
                                <div className="col-5 col-md-5 col-sm-12">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="userName" placeholder="Enter user name" onChange={(e) => this.createApproved(e)} value={this.state.userName} />
                                        {errorsUser && isSubmitedUser && <span className="error-message">{errorsUser.userName}</span>}
                                    </div>
                                </div>
                                <div className="col-2 col-md-2 col-sm-12">
                                    <div className="form-group">
                                        {
                                            <button
                                            onClick={() => {
                                                this.addApproved()
                                            }}
                                            className="btn addmore-btn mt0">ADD</button>
                                        }
                                    </div>
                                </div>
                                {errors && isSubmited && <span className="error-message">{errors.selectedUserList}</span>}
                            </div>

                            {
                              selectedUserList.length > 0 &&
                              <div className="row mt-5">
                                <div className="col-md-12">
                                  <DataTable value={selectedUserList} paginator={true} rows={10}  responsive scrollable  emptyMessage="No data found">
                                    <Column className="tableCols" field="application_name" header="Application Name" sortable style={{width: '280px'}}/>
                                    <Column className="tableCols" field="user_name" header="User Name" sortable style={{width: '120px'}}/>
                                    <Column className="tableCols" field="action" header="Action" body={this.actionApproveTemplate} style={{width: '130px'}}/>
                                  </DataTable>
                                </div>
                              </div>
                            }
                            <Modal open={this.state.openErrorModal} onClose={this.closeErrorModal} center>
                                <div className="error-message-user-modal">
                                    <div className="row" >
                                      {
                                        userRole == '1' ?
                                        <div className="error-message-user-header"> This application already selected please choose other application </div>
                                        :
                                        <div className="error-message-user-header"> This user already added please enter other user </div>
                                      }
                                    </div>
                                    <div className="row" style={{width: 500}}>
                                        
                                    </div>
                                </div>
                            </Modal>
                            <div className="row text_center" style={{marginTop: 30}}>
                                <div className="col-12 col-md-12 col-sm-12" style={{textAlign: 'center'}}>
                                    <button
                                      className="btn delete-user-yes-btn"
                                      onClick={() => this.approvedUser() }
                                      disabled={this.state.isdisabled}
                                    >
                                      Approve
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

UsersComponent.propTypes = {
	allUsersRes: PropTypes.any,
  doUserApprovedRes: PropTypes.any,
  doDeleteUserRes: PropTypes.any,
  allApplicationRes: PropTypes.any,
  userApproveAppRes: PropTypes.any,
  checkUserRes: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
	allUsersRes: doUserAllRes,
  doUserApprovedRes: doUserApprovedRes,
  doDeleteUserRes: doDeleteUserRes,
	allApplicationRes: getAllApplicationRes,
	userApproveAppRes: doUserApproveAppRes,
  checkUserRes: doCheckUserRes,
});

function mapDispatchToProps(dispatch) {
  return {
		getUsers: () => dispatch(getAllUsers()),
		updateUserStatus: (date) => dispatch(updateUserStatus(date)),
		deleteUserRecord: (date) => dispatch(deleteUserDetails(date)),
		approveAppUser: (date) => dispatch(approveAppUser(date)),
		fetchAllApplication: () => dispatch(fetchAllApplication()),
    checkUserName: (data) => dispatch(checkUserName(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UsersComponent);