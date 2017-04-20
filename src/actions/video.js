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

// DOWNLOAD_VIDEO
export const DOWNLOAD_VIDEO_START_REQUEST = 'DOWNLOAD_VIDEO_START_REQUEST';

function downloadVideoStartRequest(url, args) {
  return {
    type: DOWNLOAD_VIDEO_START_REQUEST,
    url,
    ...args
  };
}

export const DOWNLOAD_VIDEO_START = 'DOWNLOAD_VIDEO_START';

function downloadVideoStart(event) {
  return {
    type: DOWNLOAD_VIDEO_START,
    ...event
  };
}

export const DOWNLOAD_VIDEO_UPDATE = 'DOWNLOAD_VIDEO_UPDATE';

function downloadVideoUpdate(event) {
  return {
    type: DOWNLOAD_VIDEO_UPDATE,
    ...event
  };
}

export const DOWNLOAD_VIDEO_COMPLETE = 'DOWNLOAD_VIDEO_COMPLETE';

function downloadVideoComplete(event) {
  return {
    type: DOWNLOAD_VIDEO_COMPLETE,
    ...event
  };
}

export const DOWNLOAD_VIDEO_ERROR = 'DOWNLOAD_VIDEO_ERROR';

function downloadVideoError(error) {
  return {
    type: DOWNLOAD_VIDEO_ERROR,
    error
  };
}

export function downloadVideo(url, args) {
  return dispatch => {
    dispatch(downloadVideoStartRequest(url, args));

    ipcRenderer.on('downloadVideoStart', (event, vid) => {
      dispatch(downloadVideoStart(vid));
    });

    ipcRenderer.on('downloadVideoUpdate', (event, vid) => {
      dispatch(downloadVideoUpdate(vid));
    });

    ipcRenderer.send('downloadVideo', {
      url,
      args
    });
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

  ipcRenderer.on('downloadVideoComplete', (event, complete) => {
    dispatch(downloadVideoComplete(complete));
  });

  ipcRenderer.on('downloadVideoError', (event, error) => {
    console.log(event);
    console.error('downloadVideoError', error);
    dispatch(downloadVideoError(error));
  });
}
