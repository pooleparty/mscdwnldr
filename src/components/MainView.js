import React, { Component, PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import SearchBar from './SearchBar';
import VideoInfo from './VideoInfo';
import DownloadList from './DownloadList';

export default class MainView extends Component {
  constructor(props) {
    super(props);

    this.getVideoInfo = this.getVideoInfo.bind(this);
    this.getVideoInfoLoading = this.getVideoInfoLoading.bind(this);
    this.getVideoDownloading = this.getDownloadList.bind(this);
    this.downloadTestVideo = this.downloadTestVideo.bind(this);
  }

  getVideoInfoLoading() {
    if (this.props.videoInfoLoading) {
      return (<div>Loading Video Info <CircularProgress /></div>);
    }
    return null;
  }

  getDownloadList() {
    if (this.props.downloads && this.props.downloads.length) {
      return (<DownloadList downloads={this.props.downloads} />);
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
      {this.getVideoInfoLoading()}
      {this.getDownloadList()}
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
  videoInfo: PropTypes.objectOf(Object),
  downloads: PropTypes.arrayOf(Object)
};

MainView.defaultProps = {
  videoInfoLoading: false,
  videoDownloading: false,
  videoDownloadPercent: 0,
  videoInfo: undefined,
  downloads: []
};
