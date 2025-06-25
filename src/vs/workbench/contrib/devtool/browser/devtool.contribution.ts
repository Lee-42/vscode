/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IWorkbenchContribution, WorkbenchPhase, registerWorkbenchContribution2 } from '../../../../workbench/common/contributions.js';
import './devtoolViewDescriptor.js';

class DevToolContribution implements IWorkbenchContribution {
	static readonly ID = 'workbench.contrib.devtool';

	constructor() {
		// 初始化 devtool 功能
	}
}

// 注册工作台贡献
registerWorkbenchContribution2(DevToolContribution.ID, DevToolContribution, WorkbenchPhase.BlockStartup);
