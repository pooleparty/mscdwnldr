import {
  connect
} from 'react-redux';
import Notification from '../components/Notification';
import {
  acknowledgeNotification
} from '../actions';

const mapStateToProps = (state) => {
  return {
    open: !!state.notifications.length,
    notification: state.notifications[0],
    autoHideDuration: 4000
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestClose: (notificationId) => {
      dispatch(acknowledgeNotification(notificationId));
    }
  };
};

const NotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);

export default NotificationContainer;
