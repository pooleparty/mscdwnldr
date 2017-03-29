import React, { Component, PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import SearchBar from '../components/SearchBar';

export default class MainView extends Component {
  constructor(props) {
    super(props);

    this.getVideoInfoProgress = this.getVideoInfo.bind(this);
  }

  getVideoInfo() {
    if (this.props.videoInfoLoading) {
      return (<CircularProgress />);
    } else if (this.props.videoInfo) {
      return (<pre>{JSON.stringify(this.props.videoInfo, null, 2)}</pre>);
    }
    return null;
  }

  render() {
    return (<div>
      <SearchBar onSubmit={this.props.onSearchSubmit} />
      {this.getVideoInfo()}
    </div>);
  }
}

MainView.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
  videoInfoLoading: PropTypes.bool,
  videoInfo: PropTypes.object
};

MainView.defaultProps = {
  videoInfoLoading: false,
  videoInfo: undefined
};
