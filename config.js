const appConfig = require('application-config')('dwnldr');
const path = require('path');
const electron = require('electron');

const APP_NAME = 'Dwnldr';
const APP_TEAM = 'Josh Poole';
const APP_VERSION = require('./package.json').version;

const IS_TEST = isTest();
const PORTABLE_PATH = IS_TEST ?
  path.join(process.platform === 'win32' ? 'C:\\Windows\\Temp' : '/tmp', `${APP_NAME}Test`) :
  path.join(path.dirname(process.execPath), 'Portable Settings');
const IS_PRODUCTION = isProduction();
const IS_PORTABLE = isPortable();

module.exports = {
  CRASH_REPORT_URL: 'https://dwnldr.io/crash-report',

  APP_COPYRIGHT: `Copyright © 2017 ${APP_TEAM}`,
  APP_FILE_ICON: path.join(__dirname, '..', 'public', `${APP_NAME}File`),
  APP_ICON: path.join(__dirname, '..', 'public', APP_NAME),
  APP_NAME,
  APP_TEAM,
  APP_VERSION,
  APP_WINDOW_TITLE: `${APP_NAME} (BETA)`,

  DELAYED_INIT: 3000 /* 3 seconds */ ,

  DEFAULT_DOWNLOAD_PATH: getDefaultDownloadPath(),

  IS_PRODUCTION,
  IS_TEST,

  CONFIG_PATH: getConfigPath(),
  ROOT_PATH: path.join(__dirname, '..'),
  STATIC_PATH: path.join(__dirname, '..', 'public'),

  WINDOW_ABOUT: `file://${path.join(__dirname, 'public', 'about.html')}`,
  WINDOW_MAIN: `file://${path.join(__dirname, 'public', 'index.html')}`,

  WINDOW_INITIAL_BOUNDS: {
    width: 1300,
    height: 900
  },
  WINDOW_MIN_HEIGHT: 300,
  WINDOW_MIN_WIDTH: 425,
  LOG: {
    json: true,
    level: 'debug'
  },
  HOST_URL: 'http://localhost:3000'
};

function getDefaultDownloadPath() {
  if (IS_PORTABLE) {
    return path.join(getConfigPath(), 'Downloads');
  }
  return getPath('downloads');
}

function getConfigPath() {
  if (IS_PORTABLE) {
    return PORTABLE_PATH;
  }
  return path.dirname(appConfig.filePath);
}

function getPath(key) {
  if (!process.versions.electron) {
    // Node.js process
    return '';
  } else if (process.type === 'renderer') {
    // Electron renderer process
    return electron.remote.app.getPath(key);
  }
  // Electron main process
  return electron.app.getPath(key);
}

function isTest() {
  return process.env.NODE_ENV === 'test';
}

function isPortable() {
  if (IS_TEST) {
    return true;
  }

  if (process.platform !== 'win32' || !IS_PRODUCTION) {
    // Fast path: Non-Windows platforms should not check for path on disk
    return false;
  }

  return true;

  // try {
  //   // This line throws if the "Portable Settings" folder does not exist, and does
  //   // nothing otherwise.
  //   fs.accessSync(PORTABLE_PATH, fs.constants.R_OK | fs.constants.W_OK);
  //   return true;
  // } catch (err) {
  //   return false;
  // }
}

function isProduction() {
  if (!process.versions.electron) {
    // Node.js process
    return false;
  }
  if (process.platform === 'darwin') {
    return !/\/Electron\.app\//.test(process.execPath);
  }
  if (process.platform === 'win32') {
    return !/\\electron\.exe$/.test(process.execPath);
  }
  if (process.platform === 'linux') {
    return !/\/electron$/.test(process.execPath);
  }
  return false;
}
