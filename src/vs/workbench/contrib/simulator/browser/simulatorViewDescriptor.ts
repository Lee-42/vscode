/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Registry } from '../../../../platform/registry/common/platform.js';
import { Extensions as ViewExtensions, IViewsRegistry, IViewContainersRegistry, ViewContainerLocation, ViewContainer } from '../../../../workbench/common/views.js';
import { SimulatorViewPane } from './simulatorView.js';
import { localize } from '../../../../nls.js';
import { SyncDescriptor } from '../../../../platform/instantiation/common/descriptors.js';
import { ThemeIcon } from '../../../../base/common/themables.js';
import { ViewPaneContainer } from '../../../../workbench/browser/parts/views/viewPaneContainer.js';
import { Simulator } from '../common/simulator.js';

const VIEW_CONTAINER: ViewContainer = Registry.as<IViewContainersRegistry>(ViewExtensions.ViewContainersRegistry).registerViewContainer({
	id: Simulator.SIMULATOR_CONTAINER_ID,
	title: { value: localize('simulator', "Simulator"), original: 'Simulator' },
	ctorDescriptor: new SyncDescriptor(ViewPaneContainer, [Simulator.SIMULATOR_CONTAINER_ID, { mergeViewWithContainerWhenSingleView: true }]),
	icon: ThemeIcon.fromId('tools'),
	order: -1000,
	hideIfEmpty: true,
	storageId: Simulator.SIMULATOR_VIEW_STORAGE_ID
}, ViewContainerLocation.AuxiliaryBar);

Registry.as<IViewsRegistry>(ViewExtensions.ViewsRegistry).registerViews([{
	id: SimulatorViewPane.ID,
	name: { value: localize('simulator', "Simulator"), original: 'Simulator' },
	ctorDescriptor: new SyncDescriptor(SimulatorViewPane),
	containerIcon: ThemeIcon.fromId('tools'),
	containerTitle: localize('simulator', "Simulator"),
	canToggleVisibility: true,
	canMoveView: true,
	order: -1000,
	weight: 1,
	focusCommand: { id: 'workbench.view.simulator.focus' }
}], VIEW_CONTAINER);
