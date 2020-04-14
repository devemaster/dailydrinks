
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import './regionList.scss';
import LayoutWrapper from '../../component/LayoutWrapper/';
import {getAllCountry, doAllCountryRes, } from '../../action/createUserActions';
import { fetchRegionList, getRegionListRes } from '../../action/regionListActions';
import { deleteRegionListRecord, doDeleteRegionRes } from '../../action/deleteRegionListActions';
// import Swal from 'sweetalert2';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
// import { getItem } from '../../utils/localStore';
import Modal from "react-responsive-modal";
import { getItem } from '../../utils/localStore';


let isDelete = false;

class RegionListComponent extends React.PureComponent {
  onSelectionChange = (e) => {   
    this.setState({
      RegionsList: e.value,
    })
  }
  constructor() { 
    super();    
    isDelete = false;
		this.state = {
    
      // columns: [
      //   { RegionName: 'News',},
      //   { RegionName: 'MARKET KPIs'},
      //   { RegionName: 'IMPORTS STATS'},
      //   { RegionName: 'COMPETITION',},
      //   { RegionName: 'PODCASTS', },
      // ],
			isLoader: false,
      globalFilter: '',
      RegionList: [],
      renderUI: false,
      openDeleteAppModal: false,
      isDisabled: false,
      countryList: [],
    }
    this.actionTemplate = this.actionTemplate.bind(this);
    this.viewTemplate = this.viewTemplate.bind(this);
	}

  componentDidMount() {
    
      this.setState({
        isLoader:true
      });
      this.props.fetchRegionList();
      
      this.props.getAllCountry();
    
  }

  componentWillReceiveProps(props) {
    console.log("props check", props)
    if (props.RegionListRes) {
			if (props.RegionListRes.data && props.RegionListRes.data.regionList) {
				if (props.RegionListRes.data.regionList.success===true) {
          this.setState({
            RegionList: props.RegionListRes.data.regionList.RegionList,
            isLoader: false,
          });
				}else{
          this.setState({
            RegionList: [],
            isLoader: false,
          });
        }
			}
    }
    
    if(props.doAllCountryRes){
      if(props.doAllCountryRes.data.countryList ){
          if(props.doAllCountryRes.data.countryList.success === true){
              this.setState({
                  countryList: props.doAllCountryRes.data.countryList.countriesList
              });
          }
      }
    }
    if (props.doDeleteRegionRes) {
			if (props.doDeleteRegionRes.data && props.doDeleteRegionRes.data.deleteRegionList) {
				if (props.doDeleteRegionRes.data.deleteRegionList.success && isDelete) {
          isDelete = false;
          this.setState({
            openDeleteAppModal: false,
            isDisabled: false,
            isLoader:false
          });
          this.props.fetchRegionList();
				}
			}
    }
  }


  createApp(){
    this.props.history.push('/region-create')
  }

  deleteApp = () => {
    this.setState({
      isDisabled: true,
      isLoader:true
    });
    isDelete = true;
    let payload = {
      region_id: this.state.cat_id
    }
    this.props.deleteRegionListRecord(payload);
  }

  openDeleteApp = (rowData) => {
    this.setState({
      cat_id: rowData.region_id,
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
        <button className="btn btn-success" data-toggle="tooltip" data-placement="top" title="Edit Region" onClick={()=> this.goUpdateApplication(rowData)}>
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </button>
        <button className="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Delete Region" onClick={()=> this.openDeleteApp(rowData)}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>        
        
      </div>
    );
  }
  actionIconTemplate = (data) => {
    
    let CountryArr = []
    let cId = data.country.split(',');
    for(let c of this.state.countryList){
      for(let i of cId){
        if(i === c.id){
          CountryArr.push(c.country_name)
        }
      }
    }
    console.log(cId,CountryArr)
    return (
      <div>
        {CountryArr.map((item,key)=>
          <span className="countrySpan" key={key}>{item}</span>
          )
        }
      </div>
    );
  }
  viewTemplate(rowData, column) {
    return (
      <div style={{textAlign: 'center'}}>
        <button className="btn btn-info" data-toggle="tooltip" data-placement="top" title="View Sub Region" onClick={()=> this.getSubRegion(rowData)}>
          <i className="fa fa-eye" aria-hidden="true"></i>
        </button>  
      </div>
    );
  }
  goUpdateApplication = (rowData) => {
    this.props.history.push({
      pathname: '/region-update',
      state: {appData: rowData}
    })
  }
  goAddSubRegion = (rowData) => {
    this.props.history.push({
      pathname: '/create-Region',
      state: {appData: rowData}
    })
  }

  render() {
    const { RegionList } = this.state;
    // console.log(RegionList);
    let userRole = getItem('userRoleId');
    const Header = (<div className="offer_head">Region List</div>);
    const spinner = <span><img src={loaderImg} alt="" /></span>;
    // var tableHeader = <div style={{'textAlign':'left'}}>
    //                     <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
    //                     <input type="text" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Search" size="50"/>
    //                 </div>;
    return (
      <div className="active_drop_menus">
      <Loader show={this.state.isLoader} message={spinner}>
        <LayoutWrapper className="Region_hed_page" title="Region List" header={Header}>
          <div className="application-list_content header_dropopen">
            <div className="customer_inner_content">
              <div  className="row pl-pr-15px xs-pl-pr-0px">
                <div className="col-md-12 customertabpanel">
                  <div className="administration_tab">
                    <div  className="row pl-pr-15px xs-pl-pr-0px">
                      <div className="col-sm-12 col-md-6">
                        <div className="heading_title">Region List</div>
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
                        {/* <DataTable value={RegionList} header={tableHeader} globalFilter={this.state.globalFilter} paginator={true} rows={10}  responsive scrollable  emptyMessage="No data found" sortMode="multiple" editable={false} selection={this.state.RegionsList} onSelectionChange={this.onSelectionChange} className="novus_datatable"> */}
                        <DataTable value={RegionList} sortMode="multiple" editable={false} selection={this.state.RegionsList} onSelectionChange={this.onSelectionChange} paginator={true} rows={10} rowsPerPageOptions={[5,10,20]} responsive={true}>

                          <Column field="region_name" header="Name"/>
                          
                          <Column className="tableCols" field="country" body={this.actionIconTemplate}   header="Country"/>
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

RegionListComponent.propTypes = {
	RegionListRes: PropTypes.any,
	doDeleteRegionRes: PropTypes.any,
  doAllCountryRes: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  RegionListRes: getRegionListRes,
	doDeleteRegionRes: doDeleteRegionRes,
  doAllCountryRes: doAllCountryRes,
});

function mapDispatchToProps(dispatch) {
  return {
		fetchRegionList: () => dispatch(fetchRegionList()),
		deleteRegionListRecord: (data) => dispatch(deleteRegionListRecord(data)),
    getAllCountry: () => dispatch(getAllCountry()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RegionListComponent);