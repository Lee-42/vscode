/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ipcMain } from 'electron';
import { WindowsManager } from '../windows-manager.js';
import { WindowChannel } from './channel.js';

const openwin = (windowsManager: WindowsManager) => {
	ipcMain.handle(WindowChannel.OPEN_WIN, async (event, args) => {
		windowsManager.openwin(args);
	});
};

const closewin = (windowsManager: WindowsManager) => {
	ipcMain.handle(WindowChannel.CLOSE_WIN, async (event, args) => {
		windowsManager.closewin(args);
	});
};


const maximizewin = (windowsManager: WindowsManager) => {
	ipcMain.handle(WindowChannel.MAXIMIZE, async (event, args) => {
		windowsManager.maximizewin(args);
	});
};


const unmaximizewin = (windowsManager: WindowsManager) => {
	ipcMain.handle(WindowChannel.UNMAXIMIZE, async (event, args) => {
		windowsManager.unmaximizewin(args);
	});
};

export const initWindowIpc = (windowsManager: WindowsManager) => {
	openwin(windowsManager);
	closewin(windowsManager);
	maximizewin(windowsManager);
	unmaximizewin(windowsManager);
};
