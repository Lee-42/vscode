/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { CommonChannel, ProjectChannel } from './channel.js';
import { IWindowsMainService, OpenContext } from '../../vs/platform/windows/electron-main/windows.js';
import { URI } from '../../vs/base/common/uri.js';
import { IEnvironmentMainService } from '../../vs/platform/environment/electron-main/environmentMainService.js';
import { ProjectProps } from '../types/project.js';
import fsExtra from 'fs-extra';

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


export const toggleSimulator = (cb: () => void) => {
	ipcMain.handle(ProjectChannel.TOGGLE_SIMULATOR, (event, data) => {
		cb();
	});
};

// broadcast
export let project: ProjectProps | null = null;
ipcMain.handle(ProjectChannel.INIT_PROJECT, (event, data) => {
	return project;
});

export const openNewWindow = (windowsMainService: IWindowsMainService, environmentMainService: IEnvironmentMainService) => {
	const _windowsMainService = windowsMainService;
	ipcMain.handle(CommonChannel.OPEN_NEW_WINDOW, async (_event, item: ProjectProps) => {
		const { projectPath } = item;
		project = item;
		if (projectPath && fsExtra.readdirSync(projectPath).length === 0) {
			fsExtra.copySync('/Users/lee/Project/ide/public/zips/nt_empty_mobile', projectPath);
		}
		if (_windowsMainService) {
			if (projectPath) {
				// if the folder path is provided, open the folder
				_windowsMainService.open({
					context: OpenContext.API,
					cli: environmentMainService.args,
					urisToOpen: [{ folderUri: URI.file(projectPath) }],
					forceNewWindow: true
				});
			}
		}
		return Promise.resolve();
	});
};

