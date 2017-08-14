const $ = require("jquery");
const { remote } = require('electron');

let win = remote.getCurrentWindow();


$(document).ready(function() {
    const electron = require("electron");
    const {ipcRenderer} = electron;

    ipcRenderer.on('message', (event, message) => {
        $('#meddelande-lista').append(`<li class="collection-header"><span class="collection-name" style="color: ${message.userstate.color};">${message.userstate['display-name']}</span>: ${message.message}</li>`);
        console.log(message.userstate);
    });

    $('#form').on('submit', (event) => {
        event.preventDefault();
        ipcRenderer.send('newText', $('#text').val());
        $('#text').val('');
    });
});

$('#minimize').on("click", () => {
    win.minimize();
});

$('#maximize').on('click', () => {
    if(!win.isMaximized()){
        win.maximize();
    }
    else{
        win.unmaximize();
    }
});
$('#close').on('click', () => {
    win.close();
});