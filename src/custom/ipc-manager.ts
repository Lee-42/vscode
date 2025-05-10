/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { App, ipcMain, dialog, BrowserWindow, app } from 'electron';
import { URI } from '../vs/base/common/uri.js';
import { IWindowsMainService, OpenContext } from '../vs/platform/windows/electron-main/windows.js';
import { IEnvironmentMainService } from '../vs/platform/environment/electron-main/environmentMainService.js';
import { WindowsManager } from './windows-manager.js';
import fs from 'fs-extra';
import { join } from 'path';

class CustomIpcManager {
	quitApp(app: App) {
		ipcMain.handle('vscode:quitApp', async (event) => {
			app.quit();
		});
	}
	openFolder() {
		ipcMain.handle('vscode:openFolder', async (event) => {
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
	}
	createProject() {
		ipcMain.handle('vscode:createProject', async (event, project: any) => {
			const { projectPath, projectName } = project;
			const sourcePath = '/Users/lee/Project/ide/public/zips/nt_empty_mobile';

			// todo 使用vscode的架构实现, 不要用第三方库
			fs.copySync(sourcePath, projectPath);

			// todo 这个enginePath 具体应该是什么?
			const enginePath = join(app.getPath('userData'), '.engine');
			if (!fs.existsSync(enginePath)) {
				fs.mkdirSync(enginePath);
			}

			const pep = join(enginePath, projectName);

			return {
				...project,
				enginePath: pep
			};
		});
	}
	getTheme() {
		ipcMain.handle('vscode:getTheme', async (event) => {
			// TODO 获取主题
			console.log('获取主题');
			return {
				theme: 'light',
			};
		});
	}
	openNewWindow(windowsMainService: IWindowsMainService, environmentMainService: IEnvironmentMainService) {
		const _windowsMainService = windowsMainService;
		ipcMain.handle('vscode:openNewWindow', async (_event, folderPath?: string) => {
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
	openwin(windowsManager: WindowsManager) {
		ipcMain.handle('vscode:open-win', async (event, args) => {
			windowsManager.openwin(args);
		});
	}
	closewin(windowsManager: WindowsManager) {
		ipcMain.handle('vscode:close-win', async (event, args) => {
			windowsManager.closewin(args);
		});
	}
	maximizewin(windowsManager: WindowsManager) {
		ipcMain.handle('vscode:maximize-win', async (event, args) => {
			windowsManager.maximizewin(args);
		});
	}
	unmaximizewin(windowsManager: WindowsManager) {
		ipcMain.handle('vscode:unmaximize-win', async (event, args) => {
			windowsManager.unmaximizewin(args);
		});
	}
}

export default new CustomIpcManager();


