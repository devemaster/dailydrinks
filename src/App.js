import React from 'react';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { getItem } from './utils/localStore';
import LoginComponent from './container/login/login';
import ForgetPasswordComponent from './container/forgetpassword/forgetPassword';
import UsersComponent from './container/users/users';
import ApplicationsComponent from './container/applications/applications';
import CreateUserComponent from './container/createUser/createUser';
import EditUserComponent from './container/editUser/editUser';
import CreateApplicationComponent from './container/createApplication/createApplication';
import UpdateApplicationComponent from './container/updateApplication/updateApplication';
import CreateNotificationComponent from './container/createNotification/createNotification';
import ResetPasswordComponent from './container/passwordreset/reset-password';
import AdminDetailsComponent from './container/adminDetails/adminDetails';
import CreateAdminComponent from './container/createAdmin/createAdmin';
import NovusBiComponent from './container/novusBi/novusBi';
import NovusBiCreateComponent from './container/novusBiCreate/novusBiCreate';
import NovusBiArticleComponent from './container/novusBiArticle/novusBiArticle';
import ContentListComponent from './container/contentList/contentList';
import CategoryListComponent from './container/categoryList/categoryList';
import CommentListComponent from './container/commentList/commentList';
import TrashListComponent from './container/trashList/trashList';
import SubCategoryList from './container/subCategoryList/subCategoryList';
import ArticleList from './container/articleList/articleList';
import UpdateContent from './container/updateContent/updateContent';
import UpdateCategory from './container/updateCategory/updateCategory';
import UpdateSubCategory from './container/updateSubCategory/updateSubCategory';
import CreateCategory from './container/createCategory/createCategory';
import NovusBiArticleUpdateComponent from './container/novusBiArticleUpdate/novusBiArticleUpdate';
import 'react-toastify/dist/ReactToastify.css';
import BannerListComponent from './container/bannerList/bannerList';
import bannerCreate from './container/bannerCreate/bannerCreate';
import updateBanner from './container/updateBanner/updateBanner';
import regionList from './container/regionList/regionList';
import regionCreate from './container/regionCreate/regionCreate';
import updateRegion from './container/updateRegion/updateRegion';
import gAverage from './container/gAverage/gAverage';

class App extends React.PureComponent {
  
  render() {
    const TOKEN = getItem('auth_token');

    if(TOKEN === null) {
      return(
        <React.Fragment>
          <BrowserRouter>
            <Switch>
              <Route exact={true} path="/" component={LoginComponent} />
              <Route path="/forgetpassword" component={ForgetPasswordComponent} />
              <Route path="/resetpassword/:token" component={ResetPasswordComponent} />
              <Route render={() => (<Redirect to={'/'} />)} />
            </Switch>
          </BrowserRouter>
        </React.Fragment>       
      )
    } else if (TOKEN !== null) {
      return(
        <div>
          <React.Fragment>
            <BrowserRouter>
              <Switch>
                <Route path="/users" component={UsersComponent} />
                <Route path="/createUser" component={CreateUserComponent} />
                <Route path="/updateUser" component={EditUserComponent} />
                <Route path="/applications" component={ApplicationsComponent} />
                <Route path="/create-application" component={CreateApplicationComponent} />
                <Route path="/update-application" component={UpdateApplicationComponent} />
                <Route path="/notification" component={CreateNotificationComponent} />
                <Route path="/adminDetails" component={AdminDetailsComponent} />
                <Route path="/create-admin" component={CreateAdminComponent} />
                <Route path="/novus-bi" component={NovusBiComponent} />
                <Route path="/novus-bi-create" component={NovusBiCreateComponent} />
                <Route path="/novus-bi-article-update" component={NovusBiArticleUpdateComponent} />
                <Route path="/novus-bi-article" component={NovusBiArticleComponent} />
                <Route path="/content-list" component={ContentListComponent} />
                <Route path="/category-list" component={CategoryListComponent} />   
                <Route path="/comment-list" component={CommentListComponent} />                 
                <Route path="/trash-list" component={TrashListComponent} />
                <Route path="/subcategory-list" component={SubCategoryList} />
                <Route path="/article-list" component={ArticleList} />
                <Route path="/update-content" component={UpdateContent} />
                <Route path="/update-category" component={UpdateCategory} />
                <Route path="/update-subcategory" component={UpdateSubCategory} />
                <Route path="/create-category" component={CreateCategory} />
                <Route path="/banner-list" component={BannerListComponent} />
                <Route path="/banner-create" component={bannerCreate} />
                <Route path="/banner-update" component={updateBanner} />
                <Route path="/region-list" component={regionList} />
                <Route path="/region-create" component={regionCreate} />
                <Route path="/region-update" component={updateRegion} />
                <Route path="/global-average" component={gAverage} />                
                <Route render={() => (<Redirect to="/users" />)} />                
              </Switch>
            </BrowserRouter>
          </React.Fragment>
        </div>
      )
    }
  }
}

export default App;
