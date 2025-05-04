/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/* eslint-disable no-restricted-globals */

(function () {

	const { ipcRenderer, contextBridge } = require('electron');
	const globals = {
		ipcRenderer: {

			send(channel: string, ...args: any[]): void {
				ipcRenderer.send(channel, ...args);
			},

			invoke(channel: string, ...args: any[]): Promise<any> {
				return ipcRenderer.invoke(channel, ...args);
			},

			on(channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void) {
				ipcRenderer.on(channel, listener);

				return this;
			},

			once(channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void) {
				ipcRenderer.once(channel, listener);

				return this;
			},

			removeListener(channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void) {
				ipcRenderer.removeListener(channel, listener);
				return this;
			}
		},
	};

	// Use `contextBridge` APIs to expose globals to VSCode
	// only if context isolation is enabled, otherwise just
	// add to the DOM global.
	if (process.contextIsolated) {
		try {
			contextBridge.exposeInMainWorld('vscode', globals);
		} catch (error) {
			console.error(error);
		}
	} else {
		(window as any).vscode = globals;
	}
}());
