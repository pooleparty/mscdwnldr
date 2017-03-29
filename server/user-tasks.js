module.exports = {
  init
};

const electron = require('electron');

const app = electron.app;

/**
 * Add a user task menu to the app icon on right-click. (Windows)
 */
function init() {
  if (process.platform !== 'win32') return;
  app.setUserTasks(getUserTasks());
}

function getUserTasks() {
  return [
    {
      arguments: '-n',
      title: 'Create New Project...',
      description: 'Create a new project'
    },
    {
      arguments: '-o',
      title: 'Open Project File...',
      description: 'Open a project file'
    }
  ].map(getUserTasksItem);
}

function getUserTasksItem(item) {
  return Object.assign(item, {
    program: process.execPath,
    iconPath: process.execPath,
    iconIndex: 0
  });
}
