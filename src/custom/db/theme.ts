/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import Store from 'electron-store';

const _store = new Store();

const setTheme = (theme: any) => {
	_store.set('theme', theme);
};

const getTheme = () => {
	return _store.get('theme');
};

export { setTheme, getTheme };
