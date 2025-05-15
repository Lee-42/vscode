/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { CommonChannel } from './channel.js';
import { IWindowsMainService, OpenContext } from '../../vs/platform/windows/electron-main/windows.js';
import { URI } from '../../vs/base/common/uri.js';
import { IEnvironmentMainService } from '../../vs/platform/environment/electron-main/environmentMainService.js';

ipcMain.handle(CommonChannel.OPEN_FOLDER, async (event) => {
	const win = BrowserWindow.fromWebContents(event.sender);
	if (!win) {
		return null;
	}
	const result = await dialog.showOpenDialog(win, {
		properties: ['openDirectory', 'createDirectory'],
		title: '选择文件夹'
	});

	if (!result.canceled && result.filePaths.length > 0) {
		return result.filePaths[0];
	}
	return null;
});


ipcMain.handle(CommonChannel.QUIT_APP, async (event) => {
	app.quit();
});


export const openNewWindow = (windowsMainService: IWindowsMainService, environmentMainService: IEnvironmentMainService) => {
	const _windowsMainService = windowsMainService;
	ipcMain.handle(CommonChannel.OPEN_NEW_WINDOW, async (_event, folderPath?: string) => {
		if (_windowsMainService) {
			if (folderPath) {
				// 如果提供了文件夹路径，则打开该文件夹
				_windowsMainService.open({
					context: OpenContext.API,
					cli: environmentMainService.args,
					urisToOpen: [{ folderUri: URI.file(folderPath) }],
					forceNewWindow: true
				});
			}
		}
		return Promise.resolve();
	});
}

