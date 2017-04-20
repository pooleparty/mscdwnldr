import * as videoActions from './video';
import * as notificationActions from './notification';

module.exports = {
  init: dispatch => videoActions.init(dispatch),
  ...videoActions,
  ...notificationActions
};
