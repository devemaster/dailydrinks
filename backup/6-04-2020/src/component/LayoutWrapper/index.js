import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import './layoutwrapper.css';
// import Loader from 'react-loader-advanced';
import { NavLink } from 'react-router-dom';
import { getItem } from '../../utils/localStore';
// import loaderImg from '../../assets/images/loader-example.gif';
import logoImg from '../../assets/images/novusone-logo.png';
import { doUserAllRes } from '../../action/userActions';
import Swal from 'sweetalert2';

export function logout() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You want to be signout",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {

          localStorage.clear();
            window.location.href = '/';
        }
      })

    
}

let page="";

class LayoutWrapper extends React.PureComponent {

    constructor() {
        super();
        this.state = {
            isLoader: true,
            leftSidebar: false,
            fullName: '',
            appName: '',
        }
    }

    componentDidMount() {
        page =window.location.pathname;
        page =page.split('/');
        const fullname = getItem('userName');
        const adminApp = getItem('adminAppName');
        this.setState({
            fullName: fullname,
            appName: adminApp,
            isLoader: true,
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoader: false
        })
    }

    openurl(geturl) {
        const url = geturl;
        window.open(url, '_blank');
    }

    toggleLeftSidebar = () => {
        this.setState({
            leftSidebar: !this.state.leftSidebar
        });
    }

    goCustomer = () => {
        let data = {
            data: []
        }
        this.props.doUserAllRes(data);
    }
    render() {
        // const spinner = <span><img src={loaderImg} alt="" /></span>;
        return (
            <div style={{ width: '100%', height: '100vh' }} className={(this.state.isLoader ? 'position-fixed' : '')}>
                {/* <Loader show={this.state.isLoader} message={spinner}> */}
                    <Helmet title={this.props.title} />
                    <div className="container-fluid header hidden_under_991px">
                        <div className="row ipo_icon header_inner">
                            <div className="col col-6 align-self-center">
                                <div className="logo">
                                    <img src={logoImg} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid header visible_under_991px">
                        <div className="row ipo_icon header_inner">
                            <div className="col col-3 align-self-center">
                                <button className="sidebar_toggle_btn left_sidebar_toggle_btn" onClick={this.toggleLeftSidebar}>
                                    <i className="fa fa-navicon fa-lg"></i>
                                </button>
                            </div>
                            <div className="col col-6 align-self-center">
                                <div className="logo">
                                    <img src={logoImg} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid page_content main_content_wrappper">
                        <div className="row">
                            <div className="col-md-12 col-lg-2" data-attr={this.state.leftSidebar ? 'active' : ''} id="left_sidebar">
                                <div className="left_sidebar">
                                    <div className="sidebar_widget left_sidebar_content right_sidebar_content">
                                        <div className="user-name">
                                            <div className="user-name-style">{this.state.fullName}</div>
                                            {
                                                this.state.appName &&
                                                <div>{this.state.appName} Application</div> 
                                            }
                                        </div>
                                        <div className={page[1]==='users' ? 'active' : 'no-class'} onClick={this.goCustomer}>
                                            <NavLink to={"/users"} data-parent="#sidebar" >
                                            <i className="fa fa-users" style={{fontSize: '16px'}}  aria-hidden="true"></i>
                                                <span className="content-name">Users</span>
                                            </NavLink>
                                        </div>
                                        <div className={page[1]==='applications' ? 'active' : 'no-class'} onClick={this.goCustomer}>
                                            <NavLink to={"/applications"} data-parent="#sidebar" >
                                            <i className="fa fa-mobile" style={{fontSize: '32px'}}  aria-hidden="true"></i>
                                                <span className="content-name">Applications</span>
                                            </NavLink>
                                        </div>
                                        <div className={page[1]==='notification' ? 'active' : 'no-class'}>
                                            <NavLink to={"/notification"} data-parent="#sidebar" >
                                            <i className="fa fa-bell" style={{fontSize: '14px'}}  aria-hidden="true"></i>
                                                <span className="content-name">Notification</span>
                                            </NavLink>
                                        </div>
                                        <div  className={(page[1]==='novus-bi-article' || page[1]==='novus-bi-create' || page[1]==='subcategory-list')  ? 'show nav-item dropdown pd-20 layout_left drop_down_cls': 'nav-item dropdown pd-20 layout_left drop_down_cls'}>
                                            <a className="nav-link dropdown-toggle link_clr" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fa fa-dashboard" style={{fontSize: '14px'}}  aria-hidden="true"></i>
                                            <span className="content-name">Novus BI</span>
                                            </a>
                                            <div className="dropdown-menu menu_fontSze" aria-labelledby="navbarDropdown" >
                                                <div className={(page[1]==='category-list' || page[1]==='novus-bi-create' || page[1]==='subcategory-list' ) ? 'active' : 'no-class'}>
                                                    <NavLink to={"/category-list"} data-parent="#sidebar" >
                                                    <i className="fa fa-newspaper" style={{fontSize: '14px'}}  aria-hidden="true"></i>
                                                    <span className="content-name">Sections</span>
                                                    </NavLink>
                                                </div>

                                            
                                                <div className={(page[1]==='content-list'|| page[1]==='novus-bi-article') ? 'active' : 'no-class'}>
                                                    <NavLink to={"/content-list"} data-parent="#sidebar" >
                                                    <i className="fa fa-file" style={{fontSize: '14px'}}  aria-hidden="true"></i>
                                                    <span className="content-name">List of Content</span>
                                                    </NavLink>
                                                </div>

                                                <div className={page[1]==='comment-list' ? 'active' : 'no-class'}>
                                                    <NavLink to={"/comment-list"} data-parent="#sidebar" >
                                                    <i className="fa fa-comments" style={{fontSize: '14px'}}  aria-hidden="true"></i>
                                                    <span className="content-name">Comments</span>
                                                    </NavLink>
                                                </div>

                                                <div className={page[1]==='trash-list' ? 'active' : 'no-class'}>
                                                    <NavLink to={"/trash-list"} data-parent="#sidebar" >
                                                    <i className="fa fa-trash" style={{fontSize: '14px'}}  aria-hidden="true"></i>
                                                    <span className="content-name">Trash</span>
                                                    </NavLink>
                                                </div>
                                         

                                                {/* <div>
                                                    <NavLink to={"/novus-bi"} data-parent="#sidebar" >
                                                    <i className="fa fa-pie-chart" style={{fontSize: '14px'}}  aria-hidden="true"></i>
                                                    <span className="content-name">IMPORTS STATS</span>
                                                    </NavLink>
                                                </div>

                                                <div>
                                                    <NavLink to={"/novus-bi"} data-parent="#sidebar" >
                                                    <i className="fa fa-trophy" style={{fontSize: '14px'}}  aria-hidden="true"></i>
                                                    <span className="content-name">COMPETITION</span>
                                                    </NavLink>
                                                </div>

                                                <div>
                                                    <NavLink to={"/novus-bi"} data-parent="#sidebar" >
                                                    <i className="fa fa-volume-up" style={{fontSize: '14px'}}  aria-hidden="true"></i>
                                                    <span className="content-name">PODCASTS</span>
                                                    </NavLink>
                                                </div>

                                                <div>
                                                <div className={page[1]==='novus-bi-article' ? 'active' : 'no-class'}>
                                                    <NavLink to={"/novus-bi-article"} data-parent="#sidebar" >
                                                    <i className="fa fa-file" style={{fontSize: '14px'}}  aria-hidden="true"></i>
                                                    <span className="content-name">Novus Bi Article</span>
                                                    </NavLink>
                                                </div>
                                                </div>                                                 */}
                                            </div>
                                        </div>
                                        <div className="no-class">
                                            <div onClick={logout} data-parent="#sidebar" className="logout_link">
                                                <i className="fa fa-sign-out" style={{fontSize: '18px'}}  aria-hidden="true"></i>
                                                <span className="content-name">Sign Out</span>
                                            </div>
                                        </div>
                                        {/* <div className="divider clearfix"></div> */}
                                        {/* <div onClick={logout} data-parent="#sidebar" className="logout_link">
                                            <i className="fa fa-users" style={{fontSize: '16px'}}  aria-hidden="true"></i>
                                            <span className="content-name">Sign Out</span>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <main className="col-md-12 col-lg-10">
                                <div className="content main_content_box_inner">
                                    {this.props.children}
                                </div>
                            </main>
                        </div>
                    </div>
                {/* </Loader> */}
            </div>
        )
    }
}

LayoutWrapper.propTypes = {

};

const mapStateToProps = createStructuredSelector({

});

function mapDispatchToProps(dispatch) {
    return {
        doUserAllRes: (data) => dispatch(doUserAllRes(data)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LayoutWrapper);
