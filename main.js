"use strict";

const alert = require("./modules/alert");
const electron = require("electron");
const path = require("path");
const url = require("url");

let win;
let menu = menu_build();

// Avoid a theoretical race by checking whether the ready event has already occurred,
// otherwise set an event listener for it...

if (electron.app.isReady()) {
	startup();
} else {
	electron.app.once("ready", () => {
		startup();
	});
}

// ----------------------------------------------------------------------------------

function startup() {

	win = new electron.BrowserWindow({
		width: 1024,
		height: 768,
		backgroundColor: "#000000",
		resizable: true,
		show: false,
		useContentSize: true,
		webPreferences: {
			backgroundThrottling: false,
			nodeIntegration: true,
			zoomFactor: 1 / electron.screen.getPrimaryDisplay().scaleFactor		// Unreliable, see https://github.com/electron/electron/issues/10572
		}
	});

	win.once("ready-to-show", () => {
		win.webContents.setZoomFactor(1 / electron.screen.getPrimaryDisplay().scaleFactor);		// This seems to work, note issue 10572 above.
		// win.webContents.zoomFactor = 1 / electron.screen.getPrimaryDisplay().scaleFactor;	// The method above is deprecated. This line will be best in future.
		win.show();
		win.focus();
	});

	electron.app.on("window-all-closed", () => {
		electron.app.quit();
	});

	win.loadURL(url.format({
		protocol: "file:",
		pathname: path.join(__dirname, "renderer.html"),
		slashes: true
	}));

	electron.Menu.setApplicationMenu(menu);
}

function menu_build() {

	let template = [
		{
			label: "App",
			submenu: [
				{
					label: "About",
					click: () => {
						alert("Test Program");
					}
				},
				{
					role: "toggledevtools"
				},
			]
		},
	];

	return electron.Menu.buildFromTemplate(template);
}
