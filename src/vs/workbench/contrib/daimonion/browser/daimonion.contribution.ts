/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IWorkbenchContribution, WorkbenchPhase, registerWorkbenchContribution2 } from '../../../../workbench/common/contributions.js';
import './daimonionViewDescriptor.js';

class DaimonionContribution implements IWorkbenchContribution {
	static readonly ID = 'workbench.contrib.daimonion';

	constructor() {
		// 初始化 daimonion 功能
	}
}

// 注册工作台贡献
registerWorkbenchContribution2(DaimonionContribution.ID, DaimonionContribution, WorkbenchPhase.BlockStartup);
