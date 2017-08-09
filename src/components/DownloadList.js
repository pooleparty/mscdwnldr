import React, { Component, PropTypes } from 'react';
import DownloadStatus from '../data/downloadStatus';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import AvStop from 'material-ui/svg-icons/av/stop';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import LinearProgress from 'material-ui/LinearProgress';

const downloadContainerStyle = {
  padding: 10,
  marginTop: 5,
  marginBottom: 5
};

const downloadActionsStyle = {
  display: 'flex'
};

const downloadProgressStyle = {
  minHeight: 20
};

const downloadingStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

function getDownloadProgress(download) {
  let content;
  if (!download.complete) {
    content = (<LinearProgress
      mode={download.status === DownloadStatus.PENDING ? 'indeterminate' : 'determinate'}
      value={download.percent}
    />);
  } else {
    content = (<small>Download complete - {download.completedDate.format('M/D/YY h:mm:ss a')}</small>);
  }
  return (<div style={downloadProgressStyle}>{content}</div>);
}

export default class DownloadList extends Component {
  getDownloadActions(download) {
    let actions = [];
    if (!download.complete) {
      actions = [
        <div key={`stopDownload${download.downloadId}`}>
          <IconButton tooltip="Stop Download" onTouchTap={() => this.props.onStopDownload(download)}>
            <AvStop />
          </IconButton>
        </div>];
    } else {
      actions = [
        <div key={`closeDownload${download.downloadId}`}>
          <IconButton tooltip="Close Download" onTouchTap={() => this.props.onCloseDownload(download)}>
            <NavigationClose />
          </IconButton>
        </div>];
    }
    return (<div style={downloadActionsStyle}>
      {actions}
    </div>);
  }

  buildDownloadList(downloads) {
    return downloads.map((download) => {
      return (<Paper zDepth={0} rounded={false} style={downloadContainerStyle} key={download.downloadId}>
        <div style={downloadingStyle}>
          <div>{download.videoInfo.title}</div>
          <div>
            {this.getDownloadActions(download)}
          </div>
        </div>
        <div>
          {getDownloadProgress(download)}
        </div>
      </Paper>);
    });
  }

  render() {
    const downloads = this.buildDownloadList(this.props.downloads);

    return (<div>
      {downloads}
    </div>);
  }
}

DownloadList.propTypes = {
  downloads: PropTypes.arrayOf(Object),
  onStopDownload: PropTypes.func,
  onCloseDownload: PropTypes.func
};

DownloadList.defaultProps = {
  downloads: [],
  onStopDownload: () => { },
  onCloseDownload: () => { }
};
