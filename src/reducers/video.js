import _ from 'lodash';
import moment from 'moment';
import DownloadStatus from '../data/downloadStatus';
import {
  GET_VIDEO_INFO_START,
  GET_VIDEO_INFO_ERROR,
  GET_VIDEO_INFO_COMPLETE,
  DOWNLOAD_VIDEO_START,
  DOWNLOAD_VIDEO_UPDATE,
  DOWNLOAD_VIDEO_ERROR,
  DOWNLOAD_VIDEO_COMPLETE,
  CLOSE_DOWNLOAD
} from '../actions';

export function videoInfo(state = {}, action) {
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

export function downloads(state = [], action) {
  let newState;
  switch (action.type) {
    case DOWNLOAD_VIDEO_START:
      newState = [].concat(state);
      if (!_.find(newState, {
          downloadId: action.downloadId
        })) {
        newState.push({
          ...action,
          status: DownloadStatus.DOWNLOADING,
          percent: 0,
          error: null,
          complete: false
        });
      }
      break;
    case DOWNLOAD_VIDEO_UPDATE:
      newState = [].concat(state);
      _.chain(newState)
        .find({
          downloadId: action.downloadId
        })
        .set('percent', parseFloat(action.percent))
        .value();
      break;
    case DOWNLOAD_VIDEO_ERROR:
      newState = [].concat(state);
      _.chain(newState)
        .find({
          downloadId: action.downloadId
        })
        .set('error', action.error)
        .set('status', DownloadStatus.ERROR)
        .value();
      break;
    case DOWNLOAD_VIDEO_COMPLETE:
      newState = [].concat(state);
      _.chain(newState)
        .find({
          downloadId: action.downloadId
        })
        .set('complete', true)
        .set('completedDate', moment())
        .set('status', DownloadStatus.COMPLETE)
        .set('percent', 100)
        .value();
      break;
    case CLOSE_DOWNLOAD:
      newState = [].concat(state);
      _.chain(newState)
        .remove(download => download.downloadId === action.download.downloadId)
        .value();
      break;
    default:
      return state;
  }
  return newState;
}
