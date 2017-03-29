module.exports = {
  openProjectFile,
  openFiles
};

const electron = require('electron');

const log = require('./log');
const windows = require('./windows');

/*
 * Show flexible open dialog that supports selecting .torrent files to add, or
 * a file or folder to create a single-file or single-directory torrent.
 */
function openFiles() {
  if (!windows.main.win) return;
  log('openFiles');
  const opts = process.platform === 'darwin' ?
    {
      title: 'Select a file or folder to add.',
      properties: ['openFile', 'openDirectory']
    } :
    {
      title: 'Select a file to add.',
      properties: ['openFile']
    };
  setTitle(opts.title);
  electron.dialog.showOpenDialog(windows.main.win, opts, (selectedPaths) => {
    resetTitle();
    if (!Array.isArray(selectedPaths)) return;
    windows.main.dispatch('onOpen', selectedPaths);
  });
}

/*
 * Show open dialog to open a .torrent file.
 */
function openProjectFile(callback) {
  if (!windows.main.win) return;
  log('openProjectFile');
  const opts = {
    title: 'Select a project file.',
    filters: [{
      name: 'Project Files',
      extensions: ['json']
    }],
    properties: ['openFile', 'multiSelections']
  };
  setTitle(opts.title);
  electron.dialog.showOpenDialog(windows.main.win, opts, (selectedPaths) => {
    resetTitle();
    callback(selectedPaths);
    // if (!Array.isArray(selectedPaths)) return;
    // windows.main.send('openProject', selectedPaths[0]);
    // selectedPaths.forEach((selectedPath) => {
    //   windows.main.dispatch('openProject', selectedPath);
    // });
  });
}

/**
 * Dialogs on do not show a title on Mac, so the window title is used instead.
 */
function setTitle(title) {
  if (process.platform === 'darwin') {
    windows.main.dispatch('setTitle', title);
  }
}

function resetTitle() {
  windows.main.dispatch('resetTitle');
}