import _ from 'lodash';
import uuid from 'uuid/v4';
import {
  ACKNOWLEDGE_NOTIFICATION,
  // GET_VIDEO_INFO_START,
  // GET_VIDEO_INFO_ERROR,
  // GET_VIDEO_INFO_COMPLETE,
  // DOWNLOAD_VIDEO_START,
  DOWNLOAD_VIDEO_ERROR,
  DOWNLOAD_VIDEO_COMPLETE
} from '../actions';

export function notifications(state = [], action) {
  switch (action.type) {
    case ACKNOWLEDGE_NOTIFICATION:
      _.remove(state, {
        id: action.id
      });
      return [].concat(state);
    // case GET_VIDEO_INFO_START:
    // case GET_VIDEO_INFO_ERROR:
    // case GET_VIDEO_INFO_COMPLETE:
    // case DOWNLOAD_VIDEO_START:
    case DOWNLOAD_VIDEO_ERROR:
    case DOWNLOAD_VIDEO_COMPLETE:
      return state.concat([{
        id: uuid(),
        message: action.type
      }]);
    default:
      return state;
  }
}
