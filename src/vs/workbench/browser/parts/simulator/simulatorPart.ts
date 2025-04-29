/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import './media/simulatorpart.css';
import { Part } from '../../part.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { IWorkbenchLayoutService, Parts } from '../../../services/layout/browser/layoutService.js';
import { IStorageService } from '../../../../platform/storage/common/storage.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { ISimulatorService } from '../../../services/simulator/browser/simulatorService.js';
import { InstantiationType, registerSingleton } from '../../../../platform/instantiation/common/extensions.js';
import { ACTIVITY_BAR_BACKGROUND } from '../../../common/theme.js';


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
		content.innerText = '模拟器';
		// addClass(content, 'simulator-wrapper');
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
