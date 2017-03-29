import _ from 'lodash';
import {
    connect
} from 'react-redux';
import {
  getVideoInfo
} from '../actions';
import MainView from '../components/MainView';

const mapStateToProps = (state) => {
  return {
    videoInfoLoading: _.get(state, 'videoInfo.isLoading', false),
    videoInfo: _.get(state, 'videoInfo.info')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchSubmit: (search) => {
      console.log(search);
      dispatch(getVideoInfo(search));
    }
  };
};

const MainViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainView);

export default MainViewContainer;
