/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Registry } from '../../../../platform/registry/common/platform.js';
import { Extensions as ViewExtensions, IViewsRegistry, IViewContainersRegistry, ViewContainerLocation, ViewContainer } from '../../../../workbench/common/views.js';
import { DevToolViewPane } from './devtoolView.js';
import { localize } from '../../../../nls.js';
import { SyncDescriptor } from '../../../../platform/instantiation/common/descriptors.js';
import { ThemeIcon } from '../../../../base/common/themables.js';
import { ViewPaneContainer } from '../../../../workbench/browser/parts/views/viewPaneContainer.js';
import { Devtool } from '../common/devtool.js';

const VIEW_CONTAINER: ViewContainer = Registry.as<IViewContainersRegistry>(ViewExtensions.ViewContainersRegistry).registerViewContainer({
	id: Devtool.DEVTOOL_CONTAINER_ID,
	title: { value: localize('devtool', "DevTool"), original: 'DevTool' },
	ctorDescriptor: new SyncDescriptor(ViewPaneContainer, [Devtool.DEVTOOL_CONTAINER_ID, { mergeViewWithContainerWhenSingleView: true }]),
	icon: ThemeIcon.fromId('tools'),
	order: -1000,
	hideIfEmpty: true,
	storageId: Devtool.DEVTOOL_VIEW_STORAGE_ID
}, ViewContainerLocation.Panel);

Registry.as<IViewsRegistry>(ViewExtensions.ViewsRegistry).registerViews([{
	id: DevToolViewPane.ID,
	name: { value: localize('devtool', "DevTool"), original: 'DevTool' },
	ctorDescriptor: new SyncDescriptor(DevToolViewPane),
	containerIcon: ThemeIcon.fromId('tools'),
	containerTitle: localize('devtool', "DevTool"),
	canToggleVisibility: true,
	canMoveView: true,
	order: -1000,
	weight: 1,
	focusCommand: { id: 'workbench.view.devtool.focus' }
}], VIEW_CONTAINER);
