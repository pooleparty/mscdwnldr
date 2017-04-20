import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FormatList from './FormatList';

export default class VideoInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFormat: null
    };

    this.handleFormatSelection = this.handleFormatSelection.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  handleFormatSelection(selection) {
    this.setState({
      selectedFormat: selection
    });
  }

  handleDownload() {
    console.log(this.props);
    this.props.onDownloadVideo(this.props.videoInfo.video_url, { format: this.state.selectedFormat, videoInfo: this.props.videoInfo });
  }

  render() {
    return (<div>
      <h1>{this.props.videoInfo.title}</h1>
      <h2>Select Download Format</h2>
      <FormatList
        formats={this.props.videoInfo.formats}
        onFormatSelection={this.handleFormatSelection}
      />
      <br />
      <div>
        <RaisedButton
          label="Download"
          fullWidth
          primary
          disabled={!this.state.selectedFormat}
          onTouchTap={this.handleDownload}
        />
      </div>
      <pre>{JSON.stringify(this.props.videoInfo, null, 2)}</pre>
    </div>);
  }
}

VideoInfo.propTypes = {
  onDownloadVideo: PropTypes.func.isRequired,
  videoInfo: PropTypes.objectOf(Object).isRequired
};
