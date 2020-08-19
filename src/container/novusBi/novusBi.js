
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import './novusBi.scss';
import LayoutWrapper from '../../component/LayoutWrapper/';
import { fetchnovusBi, getnovusBiRes } from '../../action/novusBiActions';
import { deleteApplicationRecord, doDeleteAppRes } from '../../action/deleteApplicationActions';
// import Swal from 'sweetalert2';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
// import { getItem } from '../../utils/localStore';
import Modal from "react-responsive-modal";
import { getItem } from '../../utils/localStore';
import {Button} from 'primereact/button';


let isDelete = false;

class NovusBiComponent extends React.PureComponent {
 
  constructor() { 
    super();
    isDelete = false;
		this.state = {
			isLoader: false,
      globalFilter: '',
      novusBiList: [],
      renderUI: false,
      openDeleteAppModal: false,
      isDisabled: false,
      opened: false,
		}
    this.actionTemplate = this.actionTemplate.bind(this);
    this.toggleBox = this.toggleBox.bind(this);
    this.toggleBtn1 = this.toggleBtn1.bind(this);
    this.toggleBtn2 = this.toggleBtn2.bind(this);
    this.toggleBtn3 = this.toggleBtn3.bind(this);
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
        novusBiList: itemArr
      });
    } else {
      this.props.fetchnovusBi();
    }
  }

  componentWillReceiveProps(props) {
    console.log("props check", props)
    if (props.novusBiRes) {
			if (props.novusBiRes.data && props.novusBiRes.data.novusBi) {
				if (props.novusBiRes.data.novusBi.success===true) {
          this.setState({
            novusBiList: props.novusBiRes.data.novusBi.data,
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

  // on table select on change
  onSelectionChange = (e) => {   
    this.setState({
      wmsList: e.value,
    })
  }

  // table action button template
  actionTemplate(rowData, column) {
    return (
      <div style={{textAlign: 'center'}}>
        <button className="btn btn-edit-customer" >
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </button>
        <button className="btn btn-delete-customer" onClick={()=> this.openDeleteApp(rowData)}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>      
      </div>
    );
  }

  
  // create page routing 
  createApp(){
    this.props.history.push('/novus-bi-create')
  }

  
// delete  confrim call
  deleteApp = () => {
    this.setState({
      isDisabled: true,
    });
    isDelete = true;
    let payload = {
      app_id: this.state.appId
    }
    // delete action call
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

 //  icon show template in table
  actionIconTemplate = (data) => {
    return (
      <div>
        {/* <img src={data.icon} alt='icon' style={{width: 50, height: 50}} /> */}
        <img src='http://localhost:3000/static/media/novusone-logo.6b9fef02.png' alt='icon' className="image_icons" />
      </div>
    );
  }


  // toggle buttons
  toggleBox() {		
		this.setState({
      opened: true,
    });    
  }
  toggleBtn1() {	
		this.setState({
      opened: false,
    });    
  }
  toggleBtn2() {	
		this.setState({
      opened: false,
    });    
  }
  toggleBtn3() {	
		this.setState({
      opened: false,
    });    
  }
  
  // status action templage for table
  actionStatusTemplate = (data) => {
    const { opened } = this.state;
    return (
      <div className="status_main_bx">
        <button className="btn pending-status" onClick={this.toggleBox}>
          Draft
        </button> 
        { opened && (
          <div className="status_bx">
          <Button label="Draft" icon="pi pi-pencil" className="btn pending-status" iconPos="left" onClick={this.toggleBtn1} />
          </div>  
        )}
      </div>
    );
  }


  
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

    // list data from state
    const { novusBiList } = this.state;
    console.log(novusBiList);

    // get user role from global function
    let userRole = getItem('userRoleId');

    // set page header title
    const Header = (<div className="offer_head">Applications</div>);

    // loader spinner
    const spinner = <span><img src={loaderImg} alt="" /></span>;

    // table header
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
                        <div className="heading_title">News</div>
                      </div>
                      {
                        userRole === '1' &&
                        <div className="col-sm-12 col-md-6" style={{ textAlign: 'right' }}>
                          <button className="btn btn-placeOrder" onClick={() => this.createApp()}>Create List</button>
                        </div>
                      }
                    </div>
                    <div className="row pl-pr-15px xs-pl-pr-0px">
                      <div className="col-12 tableheight advisor-tab-tableheight" style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 15 }}>
                        <DataTable value={novusBiList} header={tableHeader} globalFilter={this.state.globalFilter} paginator={true} rows={10}  responsive scrollable  emptyMessage="No data found" sortMode="multiple" editable={false} selection={this.state.wmsList} onSelectionChange={this.onSelectionChange} className="novus_datatable">
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
NovusBiComponent.propTypes = {
	novusBiRes: PropTypes.any,
	doDeleteAppRes: PropTypes.any,
};

// setup response function
const mapStateToProps = createStructuredSelector({
  novusBiRes: getnovusBiRes,
	doDeleteAppRes: doDeleteAppRes,
});

// dispatch function
function mapDispatchToProps(dispatch) {
  return {
		fetchnovusBi: () => dispatch(fetchnovusBi()),
		deleteApplicationRecord: (data) => dispatch(deleteApplicationRecord(data)),
  };
}

// connect component to redux store
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(NovusBiComponent);