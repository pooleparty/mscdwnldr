import _ from 'lodash';
import {
    connect
} from 'react-redux';
import {
  getVideoInfo,
  downloadVideo
} from '../actions';
import MainView from '../components/MainView';

const mapStateToProps = (state) => {
  return {
    videoInfoLoading: _.get(state, 'videoInfo.isLoading', false),
    videoInfo: _.get(state, 'videoInfo.info'),
    downloads: _.get(state, 'downloads', []),
    videoDownloading: _.get(state, 'video.isDownloading', false),
    videoDownloadPercent: _.get(state, 'video.percent', 0)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchSubmit: (search) => {
      console.log(search);
      dispatch(getVideoInfo(search));
    },
    onDownloadVideo: (url, args) => {
      dispatch(downloadVideo(url, args));
    }
  };
};

const MainViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainView);

export default MainViewContainer;
