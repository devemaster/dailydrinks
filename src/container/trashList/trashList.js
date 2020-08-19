
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import './trashList.scss';
import LayoutWrapper from '../../component/LayoutWrapper/';
import { fetchtrashList, gettrashListRes } from '../../action/trashListActions';
import { deleteContentListRecord, doDeleteContentRes } from '../../action/deleteContentListActions';
// import Swal from 'sweetalert2';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
// import { getItem } from '../../utils/localStore';
import Modal from "react-responsive-modal";
import { getItem } from '../../utils/localStore';
import moment from 'moment';
import logoImg from '../../assets/images/novusone-logo.png';


let isDelete = false;

class TrashListComponent extends React.PureComponent {
  

  // constructor function
  constructor() { 
    super();
    isDelete = false;
		this.state = {
			isLoader: false,
      globalFilter: '',
      trashListList: [],
      renderUI: false,
      openDeleteAppModal: false,
      isDisabled: false,
		}
    this.actionTemplate = this.actionTemplate.bind(this);
	}

// on component load function call
  componentDidMount() {
    let appData = JSON.parse(getItem('adminAppData'));

    // if get data set it directaly otherwise call function to get data
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
        trashListList: itemArr
      });
    } else {
      // get trash list action call
      this.props.fetchtrashList();
    }
  }

  
// on component receive new props
  componentWillReceiveProps(props) {
    
    console.log("props check", props)

    // trash list resposne
    if (props.trashListRes) {
			if (props.trashListRes.data && props.trashListRes.data.trashList) {
				if (props.trashListRes.data.trashList.status===true) {
          this.setState({
            trashListList: props.trashListRes.data.trashList.data,
            isLoader: false,
          });
				}
			}
    }

    // delete trash  response
    if (props.doDeleteContentRes) {
			if (props.doDeleteContentRes.data && props.doDeleteContentRes.data.doDeleteContentRes) {
				if (isDelete) {
          isDelete = false;
          this.setState({
            openDeleteAppModal: false,
            isDisabled: false,
          });

          // on trash delete success call trash list action 
          this.props.fetchtrashList();
				}
			}
    }
  }

  
// table select option on change call
  onSelectionChange = (e) => {   
    this.setState({
      wmsList: e.value,
    })
  }
  
// table action button template
  actionTemplate(rowData, column) {
    return (
      <div style={{textAlign: 'center'}}>
        <button className="btn btn-delete-customer" data-toggle="tooltip" data-placement="top" title="Permanent Delete" onClick={()=> this.openDeleteApp(rowData)}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>      
      </div>
    );
  }

 //  icon show template in table
  actionIconTemplate = (data) => {
    return (
      <div>
        {/* <img src={data.icon} alt='icon' style={{width: 50, height: 50}} /> */}
        <img src={logoImg} alt='icon' className="image_icons_content" />
      </div>
    );
  }

 // status button  template in table
  actionStatusTemplate = (data) => {
    if(data.status === 'draft'){
      return (
        <div className="status_main_bx">
          <button className="btn pending-status btn_draft" onClick={this.toggleBox}>
           Draft
          </button>         
        </div>
      );
    }else
    if(data.status === 'pending'){
      return (
        <div className="status_main_bx">
          <button className="btn btn-danger" onClick={this.toggleBox}>
            Pending
          </button>         
        </div>
      );
    }else
    if(data.status === 'active'){
      return (
        <div className="status_main_bx">
          <button className="btn btn-success" onClick={this.toggleBox}>
            Active
          </button>         
        </div>
      );
    }
    
  }

  // select type template
  actionTypeTemplate = (data) => {
    let cat =data.categories.split(',');
    return (
      <ul className="status_main_bx">
          {cat.map((item) => 
            <li>{item}</li>
          )}    
      </ul>
    );
  }

  // admin action template
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
  


  

// delete  confrim call
  deleteApp = () => {
    console.log(this.state.contant_id)
    this.setState({
      isDisabled: true,
    });
    isDelete = true;
    let payload = {
      contant_id: this.state.contant_id
    }
    // delete action call
    this.props.deleteContentListRecord(payload);
  }

// delete confirm model-popup open
  openDeleteApp = (rowData) => {
    this.setState({
      contant_id: rowData.contant_id,
      openDeleteAppModal: true,
    });
  }

// cancel delete
  cancelDeleteApp = () => {
    this.setState({
      openDeleteAppModal: false,
    });
  }

 

 


  goToAdmin = (data) => {
    // this.props.history.push('/adminDetails',{
    //   applicationData: data
    // })
  }

  render() {
    // trash list data from state
    const { trashListList } = this.state;
    console.log(trashListList);

    // get user role from global function
    let userRole = getItem('userRoleId');
    
// set page header title
    const Header = (<div className="offer_head">Trash List</div>);
    
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
        <LayoutWrapper title="Trash List" header={Header} >
          <div className="application-list_content">
            <div className="customer_inner_content">
              <div  className="row pl-pr-15px xs-pl-pr-0px">
                <div className="col-md-12 customertabpanel">
                  <div className="administration_tab">
                    <div  className="row pl-pr-15px xs-pl-pr-0px">
                      <div className="col-sm-12 col-md-6">
                        <div className="heading_title">Trash List</div>
                      </div>                      
                    </div>
                    
                    <div className="row pl-pr-15px xs-pl-pr-0px">
                      <div className="col-12 tableheight advisor-tab-tableheight" style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 15 }}>
                        <DataTable value={trashListList} header={tableHeader} globalFilter={this.state.globalFilter} paginator={true} rows={10}  responsive scrollable  emptyMessage="No data found" sortMode="multiple" editable={false} selection={this.state.wmsList} onSelectionChange={this.onSelectionChange} className="novus_datatable">
                          <Column selectionMode="multiple" style={{width:'2em'}}/>
                          <Column className="tableCols" field="icon" header="" body={this.actionIconTemplate}  style={{width: '100px'}}/>
                          <Column className="tableCols" field="title" header="Title" sortable style={{width: '120px'}}/>
                          {
                            userRole === '1' &&
                            <Column className="tableCols" field="admin" header="Date" body={this.adminActionTemplate} style={{width: '120px'}}/>
                          }
                          <Column className="tableCols" field="" header="Type / Sections" style={{width: '120px'}} body={this.actionTypeTemplate} />
                          <Column className="tableCols" field="" header="Status" style={{width: '120px'}} body={this.actionStatusTemplate} />
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
      </div>
    );
  }
}

// setup props data
TrashListComponent.propTypes = {
	trashListRes: PropTypes.any,
	doDeleteAppRes: PropTypes.any,
};

// setup response function
const mapStateToProps = createStructuredSelector({
  trashListRes: gettrashListRes,
	doDeleteContentRes: doDeleteContentRes,
});

// dispatch function
function mapDispatchToProps(dispatch) {
  return {
		fetchtrashList: () => dispatch(fetchtrashList()),
		deleteContentListRecord: (data) => dispatch(deleteContentListRecord(data)),
  };
}

// connect component to redux store
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TrashListComponent);