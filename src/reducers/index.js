import _ from 'lodash';
import {
  combineReducers
} from 'redux';
import {
  GET_VIDEO_INFO_START,
  GET_VIDEO_INFO_ERROR,
  GET_VIDEO_INFO_COMPLETE
} from '../actions';

function videoInfo(state = {}, action) {
  console.log(action);
  switch (action.type) {
    case GET_VIDEO_INFO_START:
      return _.assign({}, state, {
        isLoading: true,
        info: null
      });
    case GET_VIDEO_INFO_ERROR:
      return _.assign({}, state, {
        isLoading: false,
        info: null,
        error: action.error
      });
    case GET_VIDEO_INFO_COMPLETE:
      return _.assign({}, state, {
        isLoading: false,
        error: null,
        info: action.info
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  videoInfo
});

export default rootReducer;
