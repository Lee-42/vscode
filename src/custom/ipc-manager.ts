/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { App, ipcMain } from 'electron';
import { URI } from '../vs/base/common/uri.js';
import { IWindowsMainService, OpenContext } from '../vs/platform/windows/electron-main/windows.js';
import { IEnvironmentMainService } from '../vs/platform/environment/electron-main/environmentMainService.js';
import { WindowsManager } from './windows-manager.js';

class CustomIpcManager {
	quitApp(app: App) {
		ipcMain.handle('vscode:quitApp', async (event) => {
			app.quit();
		});
	}
	openNewWindow(windowsMainService: IWindowsMainService, environmentMainService: IEnvironmentMainService) {
		const _windowsMainService = windowsMainService;
		ipcMain.handle('vscode:openNewWindow', async (_event, folderPath?: string) => {
			if (_windowsMainService) {
				if (folderPath) {
					// 如果提供了文件夹路径，则打开该文件夹
					return _windowsMainService.open({
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


