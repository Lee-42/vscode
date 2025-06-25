/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { BrowserWindow, ipcMain } from 'electron';
import { setTheme, getTheme } from '../db/theme.js';
import { ThemeChannel } from './channel.js';

let _themes = getTheme() || {};
ipcMain.handle(ThemeChannel.UPDATE, async (event, themes) => {
	if (themes) {
		_themes = themes;
		setTheme(_themes);
		// broadcast to all windows
		BrowserWindow.getAllWindows().forEach(window => {
			if (!window.isDestroyed()) {
				window.webContents.send(ThemeChannel.GET, _themes);
			}
		});
	}
	return _themes;
});
