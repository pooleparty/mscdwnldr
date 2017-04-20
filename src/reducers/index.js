import {
  combineReducers
} from 'redux';

import * as videoReducers from './video';
import * as notificationReducers from './notification';

const rootReducer = combineReducers({
  ...videoReducers,
  ...notificationReducers
});

export default rootReducer;
