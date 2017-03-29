const {
  ipcRenderer
} = typeof window.require === 'function' ? window.require('electron') : {
  ipcRenderer: {
    on: () => {},
    send: () => {}
  }
};

// GET_VIDEO_INFO
export const GET_VIDEO_INFO_START = 'GET_VIDEO_INFO_START';
function getVideoInfoStart(url) {
  return {
    type: GET_VIDEO_INFO_START,
    url
  };
}

export const GET_VIDEO_INFO_COMPLETE = 'GET_VIDEO_INFO_COMPLETE';
function getVideoInfoComplete(info) {
  return {
    type: GET_VIDEO_INFO_COMPLETE,
    info
  };
}

export const GET_VIDEO_INFO_ERROR = 'GET_VIDEO_INFO_ERROR';
function getVideoInfoError(error) {
  return {
    type: GET_VIDEO_INFO_ERROR,
    error
  };
}

export function getVideoInfo(url) {
  return dispatch => {
    dispatch(getVideoInfoStart(url));

    ipcRenderer.send('getVideoInfo', url);
  };
}

export function init(dispatch) {
  ipcRenderer.on('getVideoInfoComplete', (event, info) => {
    dispatch(getVideoInfoComplete(info));
  });

  ipcRenderer.on('getVideoInfoError', (event, error) => {
    console.error('getVideoInfoError', error);
    dispatch(getVideoInfoError(error));
  });
}
