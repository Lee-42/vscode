/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { CommandsRegistry } from '../../../../platform/commands/common/commands.js';
import { ISimulatorService } from '../../../services/simulator/browser/simulatorService.js';
import { ServicesAccessor } from '../../../../platform/instantiation/common/instantiation.js';

console.log('注册命令');

CommandsRegistry.registerCommand({
	id: 'workbench.action.toggleSimulator',
	handler: (accessor: ServicesAccessor) => {
		const simulatorService = accessor.get(ISimulatorService);
		if (simulatorService && typeof simulatorService.toggle === 'function') {
			simulatorService.toggle();
		}
	}
});
