/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize, localize2 } from '../../../../nls.js';
import { Action2, registerAction2 } from '../../../../platform/actions/common/actions.js';
import { ServicesAccessor } from '../../../../platform/instantiation/common/instantiation.js';
import { SimulatorVisibleContext } from '../../../common/contextkeys.js';
import { IWorkbenchLayoutService, Parts } from '../../../services/layout/browser/layoutService.js';
import { closeIcon } from '../panel/panelActions.js';
// import { IWorkbenchLayoutService, Parts } from '../../../services/layout/browser/layoutService.js';

export class ToggleSimulatorAction extends Action2 {
	static readonly ID = 'workbench.action.toggleSimulator';
	static readonly LABEL = localize2('toggleSimulatorVisibility', "Toggle Simulator Visibility");

	constructor() {
		super({
			id: ToggleSimulatorAction.ID,
			title: ToggleSimulatorAction.LABEL,
			toggled: {
				condition: SimulatorVisibleContext,
				title: localize('closePanel', 'Hide Panel'),
				icon: closeIcon,
				mnemonicTitle: localize({ key: 'toggle panel mnemonic', comment: ['&& denotes a mnemonic'] }, "&&Panel"),
			},
		});
	}

	override run(accessor: ServicesAccessor, ...args: any[]): void {
		const layoutService = accessor.get(IWorkbenchLayoutService);
		layoutService.setPartHidden(layoutService.isVisible(Parts.SIMULATOR_PART), Parts.SIMULATOR_PART);
	}

}


registerAction2(ToggleSimulatorAction);
