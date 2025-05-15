/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export enum ProjectChannel {
	CREATE = 'project:create',
	UPDATE = 'project:update',
	DELETE = 'project:delete',
	GET_ALL = 'project:getAll',
	GET_BY_ID = 'project:getById'
}

export enum CommonChannel {
	OPEN_FOLDER = 'common:openFolder',
	QUIT_APP = 'common:quitApp',
	OPEN_NEW_WINDOW = 'common:openNewWindow'
}

export enum ThemeChannel {
	INIT = 'theme:init',
	UPDATE = 'theme:update',
	SET = 'theme:set',
	GET = 'theme:get'
}

export enum WindowChannel {
	OPEN_WIN = 'window:open',
	MINIMIZE = 'window:minimize',
	MAXIMIZE = 'window:maximize',
	CLOSE_WIN = 'window:close',
	UNMAXIMIZE = 'window:unmaximize'
}
