import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import homeReducer from './homeReducer';

export default combineReducers({
  form: formReducer,
  doHomeRes: homeReducer,
  
});