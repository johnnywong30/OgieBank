import {combineReducers} from 'redux';
import authReducer from './auth';
import transactionReducer from './transactions';
import categoryReducer from './categories';

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionReducer,
  categories: categoryReducer,
});

export default rootReducer;
