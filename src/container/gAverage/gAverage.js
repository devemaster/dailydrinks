
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import './gAverage.scss';
import LayoutWrapper from '../../component/LayoutWrapper/';
import { fetchAverageList, getAverageListRes,submitUpdateAverage,doUpdateAverageRes } from '../../action/gAverageListActions';
// import Swal from 'sweetalert2';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
// import { getItem } from '../../utils/localStore';
import Modal from "react-responsive-modal";
import { getItem } from '../../utils/localStore';


let isDelete = false;
let arr =[];
class GaverageComponent extends React.PureComponent {
  onSelectionChange = (e) => {   
    this.setState({
      BannersList: e.value,
    })
  }
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
      AverageList: [],
      renderUI: false,
      openDeleteAppModal: false,
      isDisabled: false,
      newList:[],
      editable:true,
      Age:'',
      Dysbacteriosis:'',
      E_acervuline:'',
      E_maxima:'',
      E_tenella:'',
      ID:'',
      TMLS:''
    }
	}

  componentDidMount() {
    
      this.setState({
        isLoader:true
      });
      this.props.fetchAverageList();  
  }

  componentWillReceiveProps(props) {
    console.log("props check", props)
    if (props.AverageListRes) {
			if (props.AverageListRes.data && props.AverageListRes.data.averageList) {
				if (props.AverageListRes.data.averageList.success===false) {
          arr = props.AverageListRes.data.averageList.data
          this.setState({
            AverageList: props.AverageListRes.data.averageList.data,
            isLoader: false,
          },()=>{
            console.log(this.state.AverageList)
            this.setState({
              AverageList:this.state.AverageList[0].AverageList,
              Age:this.state.AverageList[0].Age,
              Dysbacteriosis:this.state.AverageList[0].Dysbacteriosis,
              E_acervuline:this.state.AverageList[0].E_acervuline,
              E_maxima:this.state.AverageList[0].E_maxima,
              E_tenella:this.state.AverageList[0].E_tenella,
              ID:this.state.AverageList[0].ID,
              TMLS:this.state.AverageList[0].TMLS
            })
          });
				}else{
          this.setState({
            AverageList: [],
            isLoader: false,
          });
        }
			}
    }
    if(props.doUpdateAverageRes){
      if(props.doUpdateAverageRes && props.doUpdateAverageRes.data){            
          if(props.doUpdateAverageRes.data && props.doUpdateAverageRes.data.updateAverage ){
              if(props.doUpdateAverageRes.data.updateAverage && isDelete === true){
                      isDelete= false;
                  this.setState({
                      isLoader: false
                  });
                  
                this.props.fetchAverageList();  
              } 
          }
      }
  }
  }
 
 
  
  update=()=>{
    
      arr[0].Age = this.state.Age;
      arr[0].Dysbacteriosis=this.state.Dysbacteriosis;
      arr[0].E_acervuline=this.state.E_acervuline;
      arr[0].E_maxima=this.state.E_maxima;
      arr[0].E_tenella=this.state.E_tenella;
      arr[0].ID=this.state.ID;
      arr[0].TMLS=this.state.TMLS;
      this.setState({
        AverageList:arr,
        isLoader:true
      })
      let data ={
        "id"			: arr[0].ID,
        "Age"			: arr[0].Age,
        "E_acervuline"  : arr[0].E_acervuline,
        "E_maxima"		: arr[0].E_maxima,
        "E_tenella" 	: arr[0].E_tenella,
        "TMLS"  		: arr[0].TMLS,	
        "Dysbacteriosis": arr[0].Dysbacteriosis
      }
      isDelete = true;
      this.props.handleFormSubmit(data);
  }

  render() {
    const { AverageList } = this.state;
    // console.log(AverageList);
    let userRole = getItem('userRoleId');
    const Header = (<div className="offer_head">Global Average</div>);
    const spinner = <span><img src={loaderImg} alt="" /></span>;
    // var tableHeader = <div style={{'textAlign':'left'}}>
    //                     <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
    //                     <input type="text" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Search" size="50"/>
    //                 </div>;
    return (
      <div className="active_drop_menus">
      <Loader show={this.state.isLoader} message={spinner}>
        <LayoutWrapper className="Banner_hed_page" title="Global Average" header={Header}>
          <div className="application-list_content header_dropopen">
            <div className="customer_inner_content">
              <div  className="row pl-pr-15px xs-pl-pr-0px">
                <div className="col-md-12 customertabpanel">
                  <div className="administration_tab">
                    <div  className="row pl-pr-15px xs-pl-pr-0px">
                      <div className="col-sm-12 col-md-6">
                        <div className="heading_title">Global Average</div>
                      </div>
                    </div>
                    <div className="row pl-pr-15px xs-pl-pr-0px">
                      <div className="col-12 table-responsive tableheight advisor-tab-tableheight" style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 15 }}>
                        <table className="table table-bordered">
                          <tbody> 
                          
                            <tr >                            
                              <th>Age</th>
                              <td  ><input type="text" id="Age" value={this.state.Age} onChange={(e) => {this.setState({Age:e.target.value})}}/></td>
                            </tr>
                            <tr >                            
                              <th>Dysbacteriosis</th>
                              <td  ><input type="text" id="Dysbacteriosis" value={this.state.Dysbacteriosis} onChange={(e) => {this.setState({Dysbacteriosis:e.target.value})}}/></td>
                            </tr>
                            <tr >                            
                              <th>E_acervuline</th>
                              <td  ><input type="text" id="E_acervuline" value={this.state.E_acervuline} onChange={(e) => {this.setState({E_acervuline:e.target.value})}}/></td>
                            </tr>
                            <tr >                            
                              <th>E_maxima</th>
                              <td  ><input type="text" id="E_maxima" value={this.state.E_maxima} onChange={(e) => {this.setState({E_maxima:e.target.value})}}/></td>
                            </tr>
                            <tr >                            
                              <th>E_tenella</th>
                              <td  ><input type="text" id="E_tenella" value={this.state.E_tenella} onChange={(e) => {this.setState({E_tenella:e.target.value})}}/></td>
                            </tr>
                            <tr >                            
                              <th>ID</th>
                              <td  ><input type="text" id="ID" value={this.state.ID} onChange={(e) => {this.setState({ID:e.target.value})}}/></td>
                            </tr>
                            <tr >                            
                              <th>TMLS</th>
                              <td  ><input type="text" id="TMLS" value={this.state.TMLS} onChange={(e) => {this.setState({TMLS:e.target.value})}}/></td>
                            </tr>
                            <tr>
                              <td colSpan="2">
                              <button className="btn btn-placeOrder" onClick={this.update}>Update</button>
                              </td>
                            </tr>
                              
                          </tbody>
                        </table>
                      </div>
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

GaverageComponent.propTypes = {
	AverageListRes: PropTypes.any,
  handleFormSubmit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  AverageListRes: getAverageListRes,
  doUpdateAverageRes: doUpdateAverageRes,
});

function mapDispatchToProps(dispatch) {
  return {
		fetchAverageList: () => dispatch(fetchAverageList()),
    handleFormSubmit: (data) => dispatch(submitUpdateAverage(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(GaverageComponent);