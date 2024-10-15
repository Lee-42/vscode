/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import 'vs/css!./media/headerbarpart';
import { Part } from 'vs/workbench/browser/part';
import { addClass } from 'vs/base/browser/dom';
import {
	IInstantiationService
} from 'vs/platform/instantiation/common/instantiation';
import {
	Parts,
	IWorkbenchLayoutService
} from 'vs/workbench/services/layout/browser/layoutService';
import { IStorageService } from 'vs/platform/storage/common/storage';
import { IThemeService } from 'vs/platform/theme/common/themeService';
import { IHeaderBarService } from 'vs/workbench/services/headerBar/browser/headerBarService';
import { InstantiationType, registerSingleton } from 'vs/platform/instantiation/common/extensions';
import { ACTIVITY_BAR_BACKGROUND } from 'vs/workbench/common/theme';

export class HeaderbarPart extends Part implements IHeaderBarService {
	declare readonly _serviceBrand: undefined;

	readonly minimumWidth: number = 0;
	readonly maximumWidth!: number;
	readonly minimumHeight: number = 100;
	readonly maximumHeight: number = 100;

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
		addClass(content, 'header-wrapper');
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
