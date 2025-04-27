/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import './media/headerbarpart.css';
import { Part } from '../../part.js';
import { IInstantiationService, } from '../../../../platform/instantiation/common/instantiation.js';
import { IWorkbenchLayoutService, Parts } from '../../../services/layout/browser/layoutService.js';
import { IStorageService } from '../../../../platform/storage/common/storage.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { IHeaderBarService } from '../../../../workbench/services/headerBar/browser/headerBarService.js';
import { InstantiationType, registerSingleton } from '../../../../platform/instantiation/common/extensions.js';
import { ACTIVITY_BAR_BACKGROUND } from '../../../common/theme.js';

export class HeaderbarPart extends Part implements IHeaderBarService {
	declare readonly _serviceBrand: undefined;

	readonly minimumWidth: number = 0;
	readonly maximumWidth!: number;
	readonly minimumHeight: number = 80;
	readonly maximumHeight: number = 80;

	constructor(
		@IStorageService storageService: IStorageService,
		@IThemeService themeService: IThemeService,
		@IWorkbenchLayoutService layoutService: IWorkbenchLayoutService,
		@IInstantiationService instantiationService: IInstantiationService
	) {
		super(
			Parts.HEADERBAR_PART,
			{ hasTitle: false },
			themeService,
			storageService,
			layoutService
		);
	}

	protected override createContentArea(parent: HTMLElement): HTMLElement {
		this.element = parent;
		const content = document.createElement('div');
		content.innerText = '自定义头部';
		// addClass(content, 'header-wrapper');
		this.element.appendChild(content);

		return this.element;
	}

	override updateStyles(): void {
		super.updateStyles();

		const container = this.getContainer();
		container!.style.backgroundColor = this.getColor(ACTIVITY_BAR_BACKGROUND) as string;
	}

	override layout(width: number, height: number): void {
		super.layoutContents(width, height);
	}

	toJSON(): object {
		return {
			type: Parts.HEADERBAR_PART
		};
	}
}

registerSingleton(IHeaderBarService, HeaderbarPart, InstantiationType.Eager);
