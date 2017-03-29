import * as videoActions from './video';

module.exports = {
  init: dispatch => videoActions.init(dispatch),
  ...videoActions
};
