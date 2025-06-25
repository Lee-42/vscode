/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IWorkbenchContribution, WorkbenchPhase, registerWorkbenchContribution2 } from '../../../../workbench/common/contributions.js';
import './simulatorViewDescriptor.js';

class SimulatorContribution implements IWorkbenchContribution {
	static readonly ID = 'workbench.contrib.simulator';

	constructor() {
		// 初始化 simulator 功能
	}
}

// 注册工作台贡献
registerWorkbenchContribution2(SimulatorContribution.ID, SimulatorContribution, WorkbenchPhase.BlockStartup);
