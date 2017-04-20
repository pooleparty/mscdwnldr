module.exports = {
  init
};

const electron = require('electron');

const app = electron.app;

const log = require('./log');
const menu = require('./menu');
const windows = require('./windows');
const services = require('./services');

function init() {
  const ipc = electron.ipcMain;

  ipc.once('ipcReady', (e) => {
    app.ipcReady = true;
    app.emit('ipcReady');
  });

  /**
   * Dialog
   */

  ipc.on('openProjectFile', () => {
    windows.main.openProject();
  });
  ipc.on('openFiles', () => {
    const dialog = require('./dialog');
    dialog.openFiles();
  });

  /**
   * Dock
   */

  ipc.on('setBadge', (e, ...args) => {
    const dock = require('./dock');
    dock.setBadge(...args);
  });

  /**
   * Events
   */

  ipc.on('onEvent', (e, ...args) => {});

  ipc.on('getVideoInfo', (e, ...args) => {
    services.youtube.getInfo(...args, (err, info) => {
      if (err) {
        return windows.main.send('getVideoInfoError', err);
      }
      windows.main.send('getVideoInfoComplete', info);
    });
  });

  ipc.on('downloadVideo', (e, args) => {
    services.youtube.download(
      args.url,
      args.args,
      (start) => windows.main.send('downloadVideoStart', start),
      (update) => windows.main.send('downloadVideoUpdate', update),
      (err, complete) => {
        if (err) {
          return windows.main.send('downloadVideoError', err);
        }
        windows.main.send('downloadVideoComplete', complete);
      });
  });

  /**
   * Shell
   */

  ipc.on('openItem', (e, ...args) => {
    const shell = require('./shell');
    shell.openItem(...args);
  });
  ipc.on('showItemInFolder', (e, ...args) => {
    const shell = require('./shell');
    shell.showItemInFolder(...args);
  });
  ipc.on('moveItemToTrash', (e, ...args) => {
    const shell = require('./shell');
    shell.moveItemToTrash(...args);
  });

  /**
   * Auto start on login
   */

  ipc.on('setStartup', (e, flag) => {
    const startup = require('./startup');

    if (flag) startup.install();
    else startup.uninstall();
  });

  /**
   * Windows: Main
   */

  const main = windows.main;

  ipc.on('setAspectRatio', (e, ...args) => main.setAspectRatio(...args));
  ipc.on('setBounds', (e, ...args) => main.setBounds(...args));
  ipc.on('setProgress', (e, ...args) => main.setProgress(...args));
  ipc.on('setTitle', (e, ...args) => main.setTitle(...args));
  ipc.on('show', () => main.show());
  ipc.on('toggleFullScreen', (e, ...args) => main.toggleFullScreen(...args));
  ipc.on('setAllowNav', (e, ...args) => menu.setAllowNav(...args));
}