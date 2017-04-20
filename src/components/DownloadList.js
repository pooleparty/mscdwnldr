import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import AvStop from 'material-ui/svg-icons/av/stop';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import LinearProgress from 'material-ui/LinearProgress';
import Chip from 'material-ui/Chip';
import { green300 } from 'material-ui/styles/colors';

const downloadContainerStyle = {
  padding: 10,
  marginTop: 10,
  marginBottom: 10
};

const downloadActionsStyle = {
  display: 'flex'
};

const downloadingStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

function getDownloadActions(download) {
  let actions = [];
  if (!download.complete) {
    actions = [
      <div key={`stopDownload${download.downloadId}`}>
        <IconButton tooltip="Stop Download">
          <AvStop />
        </IconButton>
      </div>];
  } else {
    actions = [
      <div key={`completeLabel${download.downloadId}`}>
        <Chip backgroundColor={green300} >Complete</Chip>
      </div>,
      <div key={`closeDownload${download.downloadId}`}>
        <IconButton tooltip="Close Download">
          <NavigationClose />
        </IconButton>
      </div>];
  }
  return (<div style={downloadActionsStyle}>
    {actions}
  </div>);
}

function getDownloadProgress(download) {
  if (!download.complete) {
    return (<LinearProgress
      mode="determinate"
      value={download.percent}
    />);
  }
  return null;
}

// function getDownloadContainerStyle(download) {
//   const style = Object.assign({}, downloadContainerStyle);
//   if (download.complete) {
//     style.backgroundColor = green300;
//   }
//   return style;
// }

function buildDownloadList(downloads = []) {
  return downloads.map((download) => {
    return (<Paper zDepth={1} style={downloadContainerStyle} key={download.downloadId}>
      <div style={downloadingStyle}>
        <div>{download.videoInfo.title} - {download.percent}</div>
        <div>
          {getDownloadActions(download)}
        </div>
      </div>
      <div>
        {getDownloadProgress(download)}
      </div>
    </Paper>);
  }, this);
}

export default class DownloadList extends Component {
  render() {
    const downloads = buildDownloadList(this.props.downloads);

    return (<div>{downloads}</div>);
  }
}

DownloadList.propTypes = {
  downloads: PropTypes.arrayOf(Object)
};

DownloadList.defaultProps = {
  downloads: []
};
