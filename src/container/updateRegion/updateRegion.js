import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { reduxForm } from 'redux-form';
import './updateRegion.css';
import LayoutWrapper from '../../component/LayoutWrapper/';
import { getAllCountry, doAllCountryRes } from '../../action/createUserActions';
import { getAllUsers, doUserAllRes } from '../../action/userActions';
import { submitUpdateRegion, doUpdateRegionRes } from '../../action/updateRegionActions';
import { uploadAppIcon, doUploadAppIconRes } from '../../action/uploadAppIconActions';
import loaderImg from '../../assets/images/loader-example.gif';
import Loader from 'react-loader-advanced';
import BackIcon from '../../assets/images/icon-left.svg';
import validate from './formValidation';
import {MultiSelect} from 'primereact/multiselect';
import Swal from 'sweetalert2'


let isDone = false;
class UpdateRegionComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLoader: true,
            isSubmited: false,
            region_name: '',
            region_id:'',
            country: '',
            countrys:[],
            icon: '',
            countries: '',
            countryNames:'',
            countryList: [],
            usersList: [],
            selectedCountry: null,
            file: null,
            appData: null,
            iconName:'Choos Icon'
        }
    }
    componentDidMount() {
        // Get country list //
        this.props.getAllCountry();
        const appDetails = this.props.location.state.appData;
        this.setState({
            appData: appDetails, 
        }, () => {
            this.setState({
                region_id:this.state.appData.region_id,
                region_name: this.state.appData.region_name,
                countryNames: this.state.appData.country,
                // countries: this.state.appData.selected_countries
            })
        });
        this.setState({
            isLoader: false,
        });
    }
    componentWillReceiveProps(nextProps) {
        console.log("Props cat", nextProps)
        this.setState({
            isLoader:false
        })
        if(nextProps.doUploadAppIconRes){
            if (nextProps.doUploadAppIconRes.data && nextProps.doUploadAppIconRes.data.uploadAppIcon) {
				if (nextProps.doUploadAppIconRes.data.uploadAppIcon.success===true) {
                    this.setState({
                        icon: nextProps.doUploadAppIconRes.data.uploadAppIcon.imageurl
                    });
				}
			}
        }
        if(nextProps.doAllCountryRes){
            if(nextProps.doAllCountryRes.data.countryList ){
                if(nextProps.doAllCountryRes.data.countryList.success === true){
                    this.setState({
                        countryList: nextProps.doAllCountryRes.data.countryList.countriesList
                    },()=>{
                        let CountryArr = []
                        let cId = this.state.countryNames.split(',');
                        for(let c of this.state.countryList){
                        for(let i of cId){
                            if(i === c.id){
                            CountryArr.push(c)
                            }
                        }
                        }
                        this.setState({
                            countrys:CountryArr
                        },()=>{
                            console.log(this.state.countrys)
                        })
                    });
                }
            }
        }
        if(nextProps.doUpdateRegionRes){
            if(nextProps.doUpdateRegionRes && nextProps.doUpdateRegionRes.data){            
                if(nextProps.doUpdateRegionRes.data && nextProps.doUpdateRegionRes.data.updateRegion ){
                    if(nextProps.doUpdateRegionRes.data.updateRegion && nextProps.doUpdateRegionRes.data.updateRegion.success === true && 
                        isDone === true){
                            isDone= false;
                        this.setState({
                            isLoader: false
                        });
                        this.props.history.push('/region-list');
                    } 
                }
            }
        }
        
    }
    handleBack = () => {
        this.props.history.push('/region-list');
    }

    handleSubmit = () => {
        console.log(this.state.countrys)
        if(this.state.countrys && this.state.countrys.length > 0){ 
            const counts = [];
        
        for(let item of this.state.countrys){
            counts.push(item.id)
        }
        let countryIds = counts.toString()
        
            console.log("hello")
            this.setState({
              isSubmited: true,
            //   isLoader:true
            }, () => { });
            validate(this.state);
            const errors = validate(this.state);
            if (Object.keys(errors).length === 0) {
                let payloadReq = {
                    region_id : this.state.region_id,
                    region_name		: this.state.region_name,
                    country	: countryIds
                }
                this.props.handleFormSubmit(payloadReq);
                isDone = true;
            }
        }
        else{
            Swal.fire({
                title: 'Please select at least 1 country',
                type: 'error',
                confirmButtonText: 'OK',
                allowOutsideClick: false,
                timer: 3000
              })
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleFileChange = (e) => {
        this.setState({
            isLoader:true
        })
        this.setState({
            file: e.target.files
        });
        this.props.uploadImage(e.target.files);
    }
    fileUploadProcess= () =>{
        console.log("hello");
        this.setState({
            isLoader:true
        })
    }
    onBasicUploadAuto = (event) => {
        this.setState({
            isLoader:false
        })
        let response = JSON.parse(event.xhr.response)
        if(response.success === true){
            this.setState({
                iconName:response.path,
                icon:response.imageurl,
                iconError: ''
            })
        }else{
            this.setState({
                iconError:response.message
            })
        }
        // this.growl.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode'});
    }
    // countryChange = (item) => {
    //     this.setState({
    //         selectedCountry: item,
    //         country: item.value
    //     });
    // }
    render() {
        const Header = (<div className="offer_head">Update Region</div>);
        
        const spinner = <span><img src={loaderImg} alt="" /></span>;
        const errors = validate(this.state);
        const { isSubmited, countryList } = this.state;

        const countryListOptions = [];
        if (countryList && countryList.length > 0) {
            countryList.map((item) => {
                countryListOptions.push({ value: item.country_name, label: item.country_name, original: item });
                return (
                <option value={item.country_name} id={item.id} key={item.id}>
                    {item.country_name}              
                </option>
                );
            });
        }
        return (
                <LayoutWrapper title="Create Region" header={Header} >
                    <Loader show={this.state.isLoader} message={spinner}>
                        <div className="edit_profile_content_wrapper">
                            <div className="createprofile_heading">
                                <div className="createprofile_back_icon_text"  onClick={this.handleBack}>
                                    <img src={BackIcon} alt="" className="createprofile_back_icon" />
                                    <span className="createprofile_go_back">Back to Region</span>
                                </div>
                                <span className="offering_detail_title">Update Region</span>
                            </div>
                            <div className="editprofile_content">
                                <div className="form_content_editprofile edit_profile_form_fields_wrapper">
                                    <div >
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="mt-2">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" placeholder="Enter name" value={this.state.region_name} name="region_name" onChange={(e) => this.handleChange(e)} />
                                                        {errors && isSubmited && <span className="error-message">{errors.region_name}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="mt-2">
                                                    <div className="form-group">
                                                    <MultiSelect className="all_sec_dropdown all_section_tab form-drop-control" optionLabel="country_name" optionValue="id" value={this.state.countrys}  options={countryList} onChange={(e) => {this.setState({countrys: e.value})}} style={{minWidth:'100%'}} filter={true} filterPlaceholder="Search" placeholder="Choose Country" />
                                                    {errors && isSubmited && <span className="error-message err-msg">{errors.country}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                            {/* <div className="col-6">
                                                <div className="mt-2">
                                                    <div className="form-group">
                                                        <Select
                                                            value={this.state.selectedCountry}
                                                            onChange={this.countryChange}
                                                            options={countryListOptions}
                                                            name="selectedCountries"
                                                            placeholder="Select Countries"
                                                            isMulti={true}
                                                        />
                                                        {errors && isSubmited && <span className="error-message">{errors.selectedCountry}</span>}
                                                    </div>
                                                </div>
                                            </div> */}
                                        <div>
                                            <button onClick={()=> this.handleSubmit()} className="btn btn-primary login_button" >Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Loader>
                </LayoutWrapper>
        )
    }
}

UpdateRegionComponent.propTypes = {
    handleFormSubmit: PropTypes.func,
    doUpdateRegionRes: PropTypes.any,
    doAllCountryRes: PropTypes.any,
    allUsersRes: PropTypes.any,
    doUploadAppIconRes: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
    doUpdateRegionRes: doUpdateRegionRes,
    doAllCountryRes: doAllCountryRes,
    allUsersRes: doUserAllRes,
    doUploadAppIconRes: doUploadAppIconRes
});

function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(submitUpdateRegion(data)),
        getAllCountry: () => dispatch(getAllCountry()),
        getAllUsers: () => dispatch(getAllUsers()),
        uploadImage: (file) => dispatch(uploadAppIcon(file)),
    };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UpdateRegionComponent);
