/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { FileAccess } from '../vs/base/common/network.js';
import { platform } from 'os';
import { routes } from './windows.js';
import { env } from '../vs/base/common/process.js';

export class WindowsManager {
	windows: Map<string, BrowserWindow>;
	constructor() {
		this.windows = new Map();
		this.initWindow();
	}
	protected createWindow(options: any) {
		const defaultBrowserWindowOptions: BrowserWindowConstructorOptions = {
			width: 100,
			height: 100,
			titleBarStyle: platform() === 'darwin' ? 'hiddenInset' : 'hidden',
			webPreferences: {
				preload: FileAccess.asFileUri('vs/base/parts/sandbox/electron-sandbox/preload2.js').fsPath,
			}
		};
		const win = new BrowserWindow({
			...defaultBrowserWindowOptions,
			...options.meta
		});
		const id = options.name;
		if (env['VSCODE_DEV']) {
			win.loadURL(`http://localhost:5173/#/${id}`);
		} else {
			win.loadURL(FileAccess.asBrowserUri(`vs/code/electron-sandbox/dist/index.html`).toString(true) + `#/${id}`);
		}
		win.webContents.openDevTools();
		win.on('closed', () => {
			console.log('window closed', id);
			this.windows.delete(id.toString());
		});
		win.on('maximize', () => {
			console.log('window maximized', id);
		});
		win.on('unmaximize', () => {
			console.log('window unmaximized', id);
		});
		this.windows.set(id, win);
	}
	protected initWindow() {
		const winOptions = routes.find(route => route.meta.start);
		console.log('winOptions: ', winOptions);
		this.createWindow(winOptions);
	}
	public openwin(args: any) {
		console.log('openwin', args);
		if (this.getwin(args.path)) {
			return;
		}
		this.createWindow(args);
	}
	protected getwin(id: string) {
		return this.windows.get(id);
	}
	public closewin(id: string) {
		const win = this.getwin(id);
		win?.close();
		this.windows.delete(id);
	}
	public maximizewin(id: string) {
		const win = this.getwin(id);
		win?.maximize();
	}
	public unmaximizewin(id: string) {
		const win = this.getwin(id);
		win?.unmaximize();
	}
}

