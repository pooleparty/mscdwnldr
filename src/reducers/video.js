import _ from 'lodash';
import {
  GET_VIDEO_INFO_START,
  GET_VIDEO_INFO_ERROR,
  GET_VIDEO_INFO_COMPLETE,
  DOWNLOAD_VIDEO_START,
  DOWNLOAD_VIDEO_UPDATE,
  DOWNLOAD_VIDEO_ERROR,
  DOWNLOAD_VIDEO_COMPLETE
} from '../actions';

export function videoInfo(state = {}, action) {
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

// export function video(state = {}, action) {
//   switch (action.type) {
//     case DOWNLOAD_VIDEO_START:
//       return _.assign({}, state, {
//         url: action.url,
//         isDownloading: true,
//         percent: 0,
//         error: null
//       });
//     case DOWNLOAD_VIDEO_UPDATE:
//       return _.assign({}, state, {
//         isDownloading: true,
//         percent: action.percent,
//         error: null
//       });
//     case DOWNLOAD_VIDEO_ERROR:
//       return _.assign({}, state, {
//         url: null,
//         isDownloading: false,
//         percent: 0,
//         error: action.error
//       });
//     case DOWNLOAD_VIDEO_COMPLETE:
//       return _.assign({}, state, {
//         isDownloading: false,
//         percent: 0,
//         error: null
//       });
//     default:
//       return state;
//   }
// }

export function downloads(state = [], action) {
  let newState;
  switch (action.type) {
    case DOWNLOAD_VIDEO_START:
      return state.concat({
        ...action,
        percent: 0,
        error: null,
        complete: false
      });
    case DOWNLOAD_VIDEO_UPDATE:
      console.log(`DOWNLOAD_VIDEO_UPDATE downloadId: ${action.downloadId} percent: ${parseFloat(action.percent)}`);
      newState = [].concat(state);
      _.chain(newState)
        .find({
          downloadId: action.downloadId
        })
        .set('percent', parseFloat(action.percent))
        .value();
      return newState;
    case DOWNLOAD_VIDEO_ERROR:
      _.chain(state)
        .find({
          downloadId: action.downloadId
        })
        .set('error', action.error)
        .value();
      return [].concat(state);
    case DOWNLOAD_VIDEO_COMPLETE:
      newState = [].concat(state);
      _.chain(newState)
        .find({
          downloadId: action.downloadId
        })
        .set('complete', true)
        .value();
      return newState;
    default:
      return state;
  }
}
