/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { isAbsolute, resolve } from 'path-browserify';

const getFileUri = (path: string) => {
	// 统一转为绝对路径
	const absPath = isAbsolute(path) ? path : resolve('/', path);
	return `vscode-file://vscode-app${absPath}`;
};

export { getFileUri };
