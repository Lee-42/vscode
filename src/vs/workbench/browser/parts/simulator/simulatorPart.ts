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
import { SelectBox } from '../../../../base/browser/ui/selectBox/selectBox.js';
import { IContextViewService } from '../../../../platform/contextview/browser/contextView.js';
import { defaultSelectBoxStyles } from '../../../../platform/theme/browser/defaultStyles.js';
import { FileAccess } from '../../../../base/common/network.js';

export class SimulatorPart extends Part implements ISimulatorService {
	declare readonly _serviceBrand: undefined;

	readonly minimumWidth: number = 300;
	readonly maximumWidth: number = Number.POSITIVE_INFINITY;
	readonly minimumHeight: number = 77;
	readonly maximumHeight: number = Number.POSITIVE_INFINITY;

	// private readonly instantiationService: IInstantiationService;
	private readonly contextViewService: IContextViewService;

	constructor(
		@IStorageService storageService: IStorageService,
		@IThemeService themeService: IThemeService,
		@IWorkbenchLayoutService layoutService: IWorkbenchLayoutService,
		@IInstantiationService instantiationService: IInstantiationService,
		@IContextViewService contextViewService: IContextViewService
	) {
		super(
			Parts.SIMULATOR_PART,
			{ hasTitle: false },
			themeService,
			storageService,
			layoutService
		);
		// this.instantiationService = instantiationService;
		this.contextViewService = contextViewService;
	}

	protected override createContentArea(parent: HTMLElement): HTMLElement {
		this.element = parent;
		const container = document.createElement('div');
		container.className = 'simulator-container';

		this.initHeader(container);
		this.initBody(container);
		this.initFooter(container);

		this.element.appendChild(container);
		return this.element;
	}

	protected useSelectBox(container: HTMLElement) {
		const options = [
			{ text: '请选择模拟器', value: '' },
			{ text: 'iOS 模拟器', value: 'ios' },
			{ text: 'Android 模拟器', value: 'android' }
		];

		const selectBox = new SelectBox(
			options,
			0,
			this.contextViewService,
			defaultSelectBoxStyles
		);

		selectBox.render(container);
	}

	// 渲染模拟器头部
	protected initHeader(container: HTMLElement) {
		const content = document.createElement('div');
		content.className = 'simulator-header';
		this.useSelectBox(content);
		container.appendChild(content);
	}

	// 渲染模拟器主体
	protected initBody(container: HTMLElement) {
		const content = document.createElement('div');
		content.className = 'simulator-body';

		const image = document.createElement('img');
		image.className = 'simulator-image';
		image.src = FileAccess.asFileUri('vs/workbench/browser/parts/simulator/resources/iphone-x.png').path; // 这里需要替换为实际的图片路径
		image.alt = '模拟器预览';

		content.appendChild(image);
		container.appendChild(content);
	}

	// 渲染模拟器底部
	protected initFooter(container: HTMLElement) {
		const content = document.createElement('div');
		content.className = 'simulator-footer';
		container.appendChild(content);
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

	// 切换显示/隐藏
	public toggle(): void {
		if (this.element) {
			this.element.style.display = this.element.style.display === 'none' ? '' : 'none';
		}
	}
}

registerSingleton(ISimulatorService, SimulatorPart, InstantiationType.Eager);
