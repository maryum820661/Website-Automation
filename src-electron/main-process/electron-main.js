import { app, BrowserWindow, nativeTheme, webContents, BrowserView, session } from 'electron'
import path from 'path';
app.allowRendererProcessReuse = true;

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\')
}

let browserWindow

function createWindow () {
  /**
   * Initial window options
   */
  browserWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    useContentSize: true,
    center:true,
    backgroundColor: "#fff",
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: QUASAR_NODE_INTEGRATION,
      devTools: false,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    }
  });

  let browserView1 = new BrowserView({
    webPreferences: {
      preload:  path.resolve(__dirname, 'electron-preload.js'),
    }
  });

  let browserView2 = new BrowserView({
    webPreferences: {
      preload:  path.resolve(__dirname, 'electron-preload1.js'),
    }
  });
    browserWindow.addBrowserView(browserView1);
    browserWindow.addBrowserView(browserView2);
    browserView1.setBounds({ x: 0, y: 30, width: 650, height: 600 });
    browserView2.setBounds({ x: 650, y: 30, width: 650, height: 600});
    browserView1.webContents.loadURL('http://nedapps.neduet.edu.pk:8080/undergrad/userLogin.jsp');
    browserView2.webContents.loadURL('http://nedapps.neduet.edu.pk:8080/undergrad/userLogin.jsp');

  browserWindow.loadURL(process.env.APP_URL)

  browserWindow.on('closed', () => {
    browserWindow = null
  })
}

app.on('ready', createWindow)

app.on('ready',()=>{
  session
    .fromPartition('some-partition')
    .setPermissionRequestHandler((webContents, permission, callback) => {
      const url = webContents.getURL()
  
      if (permission === 'notifications') {
        // Approves the permissions request
        callback(true)
      }
  
      // Verify URL
      if (!url.startsWith('https://google.com/')) {
        // Denies the permissions request
        return callback(false)
      }
    })
})

app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (parsedUrl.origin !== 'https://google.com') {
      event.preventDefault()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (browserWindow === null) {
    createWindow()
  }
})
