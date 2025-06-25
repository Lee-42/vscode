/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { App } from 'electron';
// todo get dynamic
export const DEVTOOL_PORT = '9222';

export const DEVTOOL_ADDRESS = `http://127.0.0.1`;

export const DEVTOOL_URL = `${DEVTOOL_ADDRESS}:${DEVTOOL_PORT}`;

export const devtool_remote_init = (app: App) => {
	app.commandLine.appendSwitch('remote-debugging-port', `${DEVTOOL_PORT}`);
	app.commandLine.appendSwitch('remote-debugging-address', DEVTOOL_ADDRESS);
	app.commandLine.appendSwitch('remote-allow-origins', '*');
};
