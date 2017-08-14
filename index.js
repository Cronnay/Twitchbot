//server config
const tmi = require("tmi.js");
const electron = require("electron");

//App config
const options = require("./options");
const { app, BrowserWindow, ipcMain, Menu, webContents} = electron;


let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({width: 1300, height: 900, frame: false});
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const menuTemplate = [
    {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q': 'Ctrl+Q',
        click(){
            app.quit();
        }
    },
    //DEVELOPER
    {
        label: 'Reload',
        accelerator: process.platform === 'darwin' ? 'Command+R': 'Ctrl+R',
        click(){
            mainWindow.webContents.reloadIgnoringCache();
        }
    }
];

if(process.platform === 'darwin'){
    menuTemplate.unshift({});
}


// Connected
const client = new tmi.client(options);
client.connect();


//Events from Twitchchannel
client.on('chat', (channel, userstate, message, self) => {
    mainWindow.webContents.send('message', {channel, userstate, message});
    console.log(userstate);
});


//Events from client
ipcMain.on('newText', (event, message) => {
    client.say("#noxtroz", message);
})