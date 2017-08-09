import _ from 'lodash';
import {
    connect
} from 'react-redux';
import {
  closeDownload
} from '../actions';
import DownloadList from '../components/DownloadList';

const mapStateToProps = (state) => {
  return {
    downloads: _.get(state, 'downloads', [])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCloseDownload: (download) => {
      dispatch(closeDownload(download));
    }
  };
};

const DownloadListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DownloadList);

export default DownloadListContainer;
