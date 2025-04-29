/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ThemeIcon } from '../../../common/themables.js';
import { reset } from '../../dom.js';
import { renderLabelWithIcons } from '../iconLabel/iconLabels.js';
import { Button, IButtonOptions } from './button.js';
import './custom-button.css';

/**
 * 这是一个带有图标和描述文本的按钮
 */
export class ButtonWithIconAndDescription extends Button {
	private _iconElement: HTMLElement;
	private _descriptionElement: HTMLElement;
	private _container: HTMLElement;

	constructor(container: HTMLElement, options: IButtonOptions) {
		super(container, options);

		if (options.supportShortLabel) {
			throw new Error('ButtonWithIconAndDescription does not support short labels');
		}

		// 创建容器
		this._container = document.createElement('div');
		this._container.classList.add('monaco-icon-description-container');
		container.appendChild(this._container);

		// 创建按钮元素
		this._element.classList.add('monaco-icon-button');

		// 创建图标元素
		this._iconElement = document.createElement('div');
		this._iconElement.classList.add('monaco-button-icon');
		this._element.appendChild(this._iconElement);

		// 将按钮添加到容器
		this._container.appendChild(this._element);

		// 创建描述文本元素
		this._descriptionElement = document.createElement('div');
		this._descriptionElement.classList.add('monaco-button-description');
		this._container.appendChild(this._descriptionElement);
	}

	override set icon(icon: ThemeIcon) {
		this._iconElement.classList.value = '';
		this._iconElement.classList.add('monaco-button-icon', ...ThemeIcon.asClassNameArray(icon));
		this._setAriaLabel();
	}

	set description(value: string) {
		if (this.options.supportIcons) {
			reset(this._descriptionElement, ...renderLabelWithIcons(value));
		} else {
			this._descriptionElement.textContent = value;
		}
	}

	active() {
		this._element.classList.remove('inactive');
	}

	inactive() {
		this._element.classList.add('inactive');
		this._element.blur();
	}

	override dispose(): void {
		super.dispose();
		this._container.remove();
	}
}
