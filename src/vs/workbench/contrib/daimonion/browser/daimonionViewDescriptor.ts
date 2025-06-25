/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Registry } from '../../../../platform/registry/common/platform.js';
import { Extensions as ViewExtensions, IViewsRegistry, IViewContainersRegistry, ViewContainerLocation, ViewContainer } from '../../../../workbench/common/views.js';
import { DaimonionViewPane } from './daimonionView.js';
import { localize } from '../../../../nls.js';
import { SyncDescriptor } from '../../../../platform/instantiation/common/descriptors.js';
import { ThemeIcon } from '../../../../base/common/themables.js';
import { ViewPaneContainer } from '../../../../workbench/browser/parts/views/viewPaneContainer.js';
import { Daimonion } from '../common/daimonion.js';

const VIEW_CONTAINER: ViewContainer = Registry.as<IViewContainersRegistry>(ViewExtensions.ViewContainersRegistry).registerViewContainer({
	id: Daimonion.DAIMONION_CONTAINER_ID,
	title: { value: localize('daimonion', "Daimonion"), original: 'Daimonion' },
	ctorDescriptor: new SyncDescriptor(ViewPaneContainer, [Daimonion.DAIMONION_CONTAINER_ID, { mergeViewWithContainerWhenSingleView: true }]),
	icon: ThemeIcon.fromId('tools'),
	order: -1000,
	hideIfEmpty: true,
	storageId: Daimonion.DAIMONION_VIEW_STORAGE_ID
}, ViewContainerLocation.AuxiliaryBar);

Registry.as<IViewsRegistry>(ViewExtensions.ViewsRegistry).registerViews([{
	id: DaimonionViewPane.ID,
	name: { value: localize('daimonion', "Daimonion"), original: 'Daimonion' },
	ctorDescriptor: new SyncDescriptor(DaimonionViewPane),
	containerIcon: ThemeIcon.fromId('tools'),
	containerTitle: localize('daimonion', "Daimonion"),
	canToggleVisibility: true,
	canMoveView: true,
	order: -1000,
	weight: 1,
	focusCommand: { id: 'workbench.view.daimonion.focus' }
}], VIEW_CONTAINER);
