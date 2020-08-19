
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import './bannerList.scss';
import LayoutWrapper from '../../component/LayoutWrapper/';
import { fetchBannerList, getBannerListRes } from '../../action/bannerListActions';
import { deleteBannerListRecord, doDeleteBannerRes } from '../../action/deleteBannerListActions';
// import Swal from 'sweetalert2';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
// import { getItem } from '../../utils/localStore';
import Modal from "react-responsive-modal";
import { getItem } from '../../utils/localStore';


let isDelete = false;

class BannerListComponent extends React.PureComponent {
  
  // constructor function
  constructor() { 
    super();    
    isDelete = false;
		this.state = {
    
      // columns: [
      //   { BannerName: 'News',},
      //   { BannerName: 'MARKET KPIs'},
      //   { BannerName: 'IMPORTS STATS'},
      //   { BannerName: 'COMPETITION',},
      //   { BannerName: 'PODCASTS', },
      // ],
			isLoader: false,
      globalFilter: '',
      BannerList: [],
      renderUI: false,
      openDeleteAppModal: false,
      isDisabled: false,
    }
    this.actionTemplate = this.actionTemplate.bind(this);
    this.viewTemplate = this.viewTemplate.bind(this);
	}

  // on component load function call
  componentDidMount() {
    
      this.setState({
        isLoader:true
      });

      // get banner list 
      this.props.fetchBannerList();
  }

  // on component receive new props
  componentWillReceiveProps(props) {
    console.log("props check", props)

    // get banner list response
    if (props.BannerListRes) {
			if (props.BannerListRes.data && props.BannerListRes.data.bannerList) {
				if (props.BannerListRes.data.bannerList.success===true) {
          this.setState({
            BannerList: props.BannerListRes.data.bannerList.data,
            isLoader: false,
          });
				}else{
          this.setState({
            BannerList: [],
            isLoader: false,
          });
        }
			}
    }

    // banner delete confirm response
    if (props.doDeleteBannerRes) {
			if (props.doDeleteBannerRes.data && props.doDeleteBannerRes.data.deleteBannerList) {
				if (props.doDeleteBannerRes.data.deleteBannerList.success && isDelete) {
          isDelete = false;
          this.setState({
            openDeleteAppModal: false,
            isDisabled: false,
            isLoader:false
          });
          // call banner list when delete success
          this.props.fetchBannerList();
				}
			}
    }
  }

  // on select change function of table 
  onSelectionChange = (e) => {   
    this.setState({
      BannersList: e.value,
    })
  }

  // routing function to create banner page
  createApp(){
    this.props.history.push('/banner-create')
  }

  // on delete banner confirm call function
  deleteApp = () => {
    this.setState({
      isDisabled: true,
      isLoader:true
    });
    isDelete = true;
    let payload = {
      banner_id: this.state.cat_id
    }

    // delete banner action call
    this.props.deleteBannerListRecord(payload);
  }

  // delete confirm model-popup open
  openDeleteApp = (rowData) => {
    this.setState({
      cat_id: rowData.banner_id,
      openDeleteAppModal: true,
    });
  }

  // cancel delete
  cancelDeleteApp = () => {
    this.setState({
      openDeleteAppModal: false,
    });
  }

  // banner list table action button 
  actionTemplate(rowData, column) {
    return (
      <div style={{textAlign: 'center'}}  className="btn-group">
        <button className="btn btn-success" data-toggle="tooltip" data-placement="top" title="Edit Banner" onClick={()=> this.goUpdateApplication(rowData)}>
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </button>
        <button className="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Delete Banner" onClick={()=> this.openDeleteApp(rowData)}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>        
        
      </div>
    );
  }


  // banner image icon template for table
  actionIconTemplate = (data) => {
    // console.log(data)
    return (
      <div>
        {/* <img src={data.icon} alt='icon' style={{width: 50, height: 50}} /> */}
        <img src={data.banner_image} alt='icon' className="image_icons" />
      </div>
    );
  }

  // view banner template for table
  viewTemplate(rowData, column) {
    return (
      <div style={{textAlign: 'center'}}>
        <button className="btn btn-info" data-toggle="tooltip" data-placement="top" title="View Sub Banner" onClick={()=> this.getSubBanner(rowData)}>
          <i className="fa fa-eye" aria-hidden="true"></i>
        </button>  
      </div>
    );
  }

  // go to banner edit page with data and routing function
  goUpdateApplication = (rowData) => {
    this.props.history.push({
      pathname: '/banner-update',
      state: {appData: rowData}
    })
  }

  // sub banner create page routing with parent banner data
  goAddSubBanner = (rowData) => {
    this.props.history.push({
      pathname: '/create-Banner',
      state: {appData: rowData}
    })
  }

  render() {

    // get banner list from state
    const { BannerList } = this.state;
    // console.log(BannerList);

    // get userRole from global function
    let userRole = getItem('userRoleId');

    // set page header title
    const Header = (<div className="offer_head">Banner List</div>);

    // loader spinner
    const spinner = <span><img src={loaderImg} alt="" /></span>;
    // var tableHeader = <div style={{'textAlign':'left'}}>
    //                     <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
    //                     <input type="text" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Search" size="50"/>
    //                 </div>;
    return (
      <div className="active_drop_menus">
      <Loader show={this.state.isLoader} message={spinner}>
        <LayoutWrapper className="Banner_hed_page" title="Banner List" header={Header}>
          <div className="application-list_content header_dropopen">
            <div className="customer_inner_content">
              <div  className="row pl-pr-15px xs-pl-pr-0px">
                <div className="col-md-12 customertabpanel">
                  <div className="administration_tab">
                    <div  className="row pl-pr-15px xs-pl-pr-0px">
                      <div className="col-sm-12 col-md-6">
                        <div className="heading_title">Banner List</div>
                      </div>
                      {
                        userRole === '1' &&
                        <div className="col-sm-12 col-md-6" style={{ textAlign: 'right' }}>
                          <button className="btn btn-placeOrder" onClick={() => this.createApp()}>Add</button>
                        </div>
                      }
                    </div>
                    <div className="row pl-pr-15px xs-pl-pr-0px">
                      <div className="col-12 tableheight advisor-tab-tableheight" style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 15 }}>
                        {/* <DataTable value={BannerList} header={tableHeader} globalFilter={this.state.globalFilter} paginator={true} rows={10}  responsive scrollable  emptyMessage="No data found" sortMode="multiple" editable={false} selection={this.state.BannersList} onSelectionChange={this.onSelectionChange} className="novus_datatable"> */}
                        <DataTable value={BannerList} sortMode="multiple" editable={false} selection={this.state.BannersList} onSelectionChange={this.onSelectionChange} paginator={true} rows={10} rowsPerPageOptions={[5,10,20]} responsive={true}>

                          <Column className="tableCols" field="Image" body={this.actionIconTemplate}   header="Icon"/>
                          <Column field="title" header="Title"/>
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

// setup props data
BannerListComponent.propTypes = {
	BannerListRes: PropTypes.any,
	doDeleteBannerRes: PropTypes.any,
};

 // setup response function
const mapStateToProps = createStructuredSelector({
  BannerListRes: getBannerListRes,
	doDeleteBannerRes: doDeleteBannerRes,
});

// dispatch function
function mapDispatchToProps(dispatch) {
  return {
		fetchBannerList: () => dispatch(fetchBannerList()),
		deleteBannerListRecord: (data) => dispatch(deleteBannerListRecord(data)),
  };
}

// connect component to redux store
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BannerListComponent);