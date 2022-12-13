import {combineReducers} from 'redux';
import authReducer from './auth';
import transactionReducer from './transactions'
const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionReducer,
});

export default rootReducer;
