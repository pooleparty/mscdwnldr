import React, { Component, PropTypes } from 'react';
import Snackbar from 'material-ui/Snackbar';
import _ from 'lodash';

export default class Notifier extends Component {
  constructor(props) {
    super(props);

    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleRequestClose(event) {
    this.props.onRequestClose(_.get(this.props, 'notification.id'));
  }

  render() {
    if (!this.props.notification) {
      return null;
    }

    return (<div>
      <Snackbar
        open={this.props.open}
        message={_.get(this.props, 'notification.message')}
        onRequestClose={this.handleRequestClose}
        autoHideDuration={this.props.autoHideDuration}
      />
    </div>
    );
  }
}

Notifier.propTypes = {
  open: PropTypes.bool.isRequired,
  notification: PropTypes.objectOf(Object),
  onRequestClose: PropTypes.func.isRequired,
  autoHideDuration: PropTypes.number.isRequired
};

Notifier.defaultProps = {
  notification: null
};
