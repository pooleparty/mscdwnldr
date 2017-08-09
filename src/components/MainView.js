import React, { Component, PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import SearchBar from './SearchBar';
import VideoInfo from './VideoInfo';
import DownloadListContainer from '../containers/DownloadListContainer';

const styles = {
  videoInfoLoading: {
    textAlign: 'center'
  }
};

export default class MainView extends Component {
  constructor(props) {
    super(props);

    this.getVideoInfo = this.getVideoInfo.bind(this);
    this.getVideoInfoLoading = this.getVideoInfoLoading.bind(this);
    this.downloadTestVideo = this.downloadTestVideo.bind(this);
  }

  getVideoInfoLoading() {
    if (this.props.videoInfoLoading) {
      return (<div style={styles.videoInfoLoading}>
        <CircularProgress />
      </div>);
    }
    return null;
  }

  getVideoInfo() {
    if (this.props.videoInfo) {
      return (<VideoInfo
        videoInfo={this.props.videoInfo}
        onDownloadVideo={this.props.onDownloadVideo}
      />);
    }
    return null;
  }

  downloadTestVideo() {
    this.props.onDownloadVideo('test');
  }

  render() {
    return (<div>
      <SearchBar onSubmit={this.props.onSearchSubmit} />
      <RaisedButton
        label="Download Test"
        primary
        onTouchTap={this.downloadTestVideo}
      />
      <DownloadListContainer />
      {this.getVideoInfoLoading()}
      {this.getVideoInfo()}
    </div>);
  }
}

MainView.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
  onDownloadVideo: PropTypes.func.isRequired,
  videoInfoLoading: PropTypes.bool,
  videoDownloading: PropTypes.bool,
  videoDownloadPercent: PropTypes.number,
  videoInfo: PropTypes.objectOf(Object)
};

MainView.defaultProps = {
  videoInfoLoading: false,
  videoDownloading: false,
  videoDownloadPercent: 0,
  videoInfo: undefined
};
