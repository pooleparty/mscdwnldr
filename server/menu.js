module.exports = {
  init,
  setWindowFocus,
  setAllowNav,
  onToggleAlwaysOnTop,
  onToggleFullScreen
};

const electron = require('electron');

const app = electron.app;

const config = require('../config');
const windows = require('./windows');

let menu = null;

function init() {
  menu = electron.Menu.buildFromTemplate(getMenuTemplate());
  electron.Menu.setApplicationMenu(menu);
}

function setWindowFocus(flag) {
  getMenuItem('Full Screen').enabled = flag;
  getMenuItem('Float on Top').enabled = flag;
}

// Disallow opening more screens on top of the current one.
function setAllowNav(flag) {
  getMenuItem('Preferences').enabled = flag;
  getMenuItem('Create New Project...').enabled = flag;
}

function onToggleAlwaysOnTop(flag) {
  getMenuItem('Float on Top').checked = flag;
}

function onToggleFullScreen(flag) {
  getMenuItem('Full Screen').checked = flag;
}

function getMenuItem(label) {
  for (let i = 0; i < menu.items.length; i++) {
    const menuItem = menu.items[i].submenu.items.find((item) => {
      return item.label === label;
    });
    if (menuItem) return menuItem;
  }
}

function getMenuTemplate() {
  const template = [{
      label: 'File',
      submenu: [{
          label: 'Create New Project...',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            const dialog = require('./dialog');
            dialog.openSeedDirectory();
          }
        },
        {
          label: 'Open Project...',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            windows.main.openProject();
          }
        },
        {
          type: 'separator'
        },
        {
          role: 'close'
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [{
          role: 'undo'
        },
        {
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          role: 'cut'
        },
        {
          role: 'copy'
        },
        {
          role: 'delete'
        },
        {
          role: 'selectall'
        }
      ]
    },
    {
      label: 'View',
      submenu: [{
          label: 'Full Screen',
          type: 'checkbox',
          accelerator: process.platform === 'darwin' ?
            'Ctrl+Command+F' : 'F11',
          click: () => windows.main.toggleFullScreen()
        },
        {
          label: 'Float on Top',
          type: 'checkbox',
          click: () => windows.main.toggleAlwaysOnTop()
        },
        {
          type: 'separator'
        },
        {
          label: 'Go Back',
          accelerator: 'Esc',
          click: () => windows.main.dispatch('escapeBack')
        },
        {
          type: 'separator'
        },
        {
          label: 'Developer',
          submenu: [{
            label: 'Developer Tools',
            accelerator: process.platform === 'darwin' ?
              'Alt+Command+I' : 'Ctrl+Shift+I',
            click: () => windows.main.toggleDevTools()
          }, {
            label: 'Reload Window',
            accelerator: 'Cmd+R',
            click: () => windows.main.refresh()
          }]
        }
      ]
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [{
          label: `Learn more about ${config.APP_NAME}`,
          click: () => {
            const shell = require('./shell');
            shell.openExternal(config.HOME_PAGE_URL);
          }
        },
        {
          label: 'Contribute on GitHub',
          click: () => {
            const shell = require('./shell');
            shell.openExternal(config.GITHUB_URL);
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Report an Issue...',
          click: () => {
            const shell = require('./shell');
            shell.openExternal(config.GITHUB_URL_ISSUES);
          }
        }
      ]
    }
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: config.APP_NAME,
      submenu: [{
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: 'Preferences',
          accelerator: 'Cmd+,',
          click: () => windows.main.dispatch('preferences')
        },
        {
          type: 'separator'
        },
        {
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          role: 'hide'
        },
        {
          role: 'hideothers'
        },
        {
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        }
      ]
    });

    // Edit menu (Mac)
    template[2].submenu.push({
      type: 'separator'
    }, {
      label: 'Speech',
      submenu: [{
          role: 'startspeaking'
        },
        {
          role: 'stopspeaking'
        }
      ]
    });

    // Window menu (Mac)
    template.splice(6, 0, {
      role: 'window',
      submenu: [{
          role: 'minimize'
        },
        {
          type: 'separator'
        },
        {
          role: 'front'
        }
      ]
    });
  }

  // On Windows and Linux, open dialogs do not support selecting both files and
  // folders and files, so add an extra menu item so there is one for each type.
  if (process.platform === 'linux' || process.platform === 'win32') {
    // Edit menu (Windows, Linux)
    template[1].submenu.push({
      type: 'separator'
    }, {
      label: 'Preferences',
      accelerator: 'CmdOrCtrl+,',
      click: () => windows.main.dispatch('preferences')
    });

    // Help menu (Windows, Linux)
    template[5].submenu.push({
      type: 'separator'
    }, {
      label: `About ${config.APP_NAME}`,
      click: () => windows.about.init()
    });
  }
  // Add "File > Quit" menu item so Linux distros where the system tray icon is
  // missing will have a way to quit the app.
  if (process.platform === 'linux') {
    // File menu (Linux)
    template[0].submenu.push({
      label: 'Quit',
      click: () => app.quit()
    });
  }

  return template;
}
