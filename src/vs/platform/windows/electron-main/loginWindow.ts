/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IConfigurationService } from '../../../platform/configuration/common/configuration.js';
import { IEnvironmentMainService } from '../../../platform/environment/electron-main/environmentMainService.js';
import { ILogService } from '../../../platform/log/common/log.js';
import { IStateService } from '../../../platform/state/node/state.js';
import { IProtocolMainService } from '../../../platform/protocol/electron-main/protocol.js';
import { BaseWindow } from './windowImpl.js';
import * as electron from 'electron';
import { FileAccess } from '../../../base/common/network.js';
import { INativeWindowConfiguration } from '../../window/common/window.js';

export class LoginWindow extends BaseWindow {
	protected override _win: electron.BrowserWindow | null = null;
	private readonly _id: number;

	constructor(
		@IConfigurationService configurationService: IConfigurationService,
		@IStateService stateService: IStateService,
		@IEnvironmentMainService environmentMainService: IEnvironmentMainService,
		@ILogService logService: ILogService,
		@IProtocolMainService private readonly protocolMainService: IProtocolMainService
	) {
		super(configurationService, stateService, environmentMainService, logService);
		this._id = Date.now(); // 使用时间戳作为临时ID
	}

	get id(): number {
		return this._id;
	}

	// 实现必要的抽象方法
	matches(webContents: electron.WebContents): boolean {
		return this._win?.webContents.id === webContents.id;
	}

	// 添加登录窗口特定的方法
	async initialize(): Promise<void> {
		const configObjectUrl = this.protocolMainService.createIPCObjectUrl<INativeWindowConfiguration>();
		console.log('configObjectUrl: ', configObjectUrl.resource.toString());
		// 初始化窗口配置
		const windowConfig = {
			width: 400,
			height: 600,
			webPreferences: {
				preload: FileAccess.asFileUri('vs/base/parts/sandbox/electron-sandbox/preload.js').fsPath,
				additionalArguments: [`--vscode-window-config=${configObjectUrl.resource.toString()}`],
			}
		};

		// 创建窗口
		this._win = new electron.BrowserWindow(windowConfig);

		this._win.webContents.openDevTools();

		// 加载登录页面
		await this._win.loadURL('http://localhost:5173');


		// 设置窗口事件监听
		this.setupWindowListeners();
	}

	private setupWindowListeners(): void {
		if (!this._win) {
			return;
		}

		// 窗口关闭事件
		this._win.on('closed', () => {
			// this.onDidClose.fire();
			console.log('closed');
		});

		// 窗口最大化事件
		this._win.on('maximize', () => {
			// this.onDidMaximize.fire();
			console.log('maximize');
		});

		// 窗口取消最大化事件
		this._win.on('unmaximize', () => {
			// this.onDidUnmaximize.fire();
			console.log('unmaximize');
		});
	}

	// 添加登录相关的业务方法
	async handleLogin(username: string, password: string): Promise<boolean> {
		// 这里实现登录逻辑
		// 可以使用 protocolMainService 进行通信
		return true;
	}
}
