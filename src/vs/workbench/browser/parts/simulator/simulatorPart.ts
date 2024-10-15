/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import 'vs/css!./media/simulatorpart';
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
import { ISimulatorService } from 'vs/workbench/services/simulator/browser/simulatorService';
import { InstantiationType, registerSingleton } from 'vs/platform/instantiation/common/extensions';
import { ACTIVITY_BAR_BACKGROUND } from 'vs/workbench/common/theme';

export class SimulatorPart extends Part implements ISimulatorService {
	declare readonly _serviceBrand: undefined;

	readonly minimumWidth: number = 100;
	readonly maximumWidth: number = Number.POSITIVE_INFINITY;
	readonly minimumHeight: number = 77;
	readonly maximumHeight: number = Number.POSITIVE_INFINITY;

	constructor(
		@IStorageService storageService: IStorageService,
		@IThemeService themeService: IThemeService,
		@IWorkbenchLayoutService layoutService: IWorkbenchLayoutService,
		@IInstantiationService instantiationService: IInstantiationService
	) {
		super(
			Parts.SIMULATOR_PART,
			{ hasTitle: false },
			themeService,
			storageService,
			layoutService
		);
	}

	protected override createContentArea(parent: HTMLElement): HTMLElement {
		this.element = parent;
		const content = document.createElement('div');
		content.innerText = 'simulator';
		addClass(content, 'simulator-wrapper');
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
			type: Parts.SIMULATOR_PART
		};
	}
}

registerSingleton(ISimulatorService, SimulatorPart, InstantiationType.Eager);
