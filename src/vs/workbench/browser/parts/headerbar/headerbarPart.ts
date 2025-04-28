/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import './media/headerbarpart.css';
import { Part } from '../../part.js';
import { $, append } from '../../../../base/browser/dom.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { IWorkbenchLayoutService, Parts } from '../../../services/layout/browser/layoutService.js';
import { IStorageService } from '../../../../platform/storage/common/storage.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { IHeaderBarService } from '../../../../workbench/services/headerBar/browser/headerBarService.js';
import { InstantiationType, registerSingleton } from '../../../../platform/instantiation/common/extensions.js';
import { ACTIVITY_BAR_BACKGROUND, ACTIVITY_BAR_TOP_BACKGROUND } from '../../../common/theme.js';
import { Button, ButtonWithIcon, unthemedButtonStyles } from '../../../../base/browser/ui/button/button.js';
import { Codicon } from '../../../../base/common/codicons.js';

export class HeaderbarPart extends Part implements IHeaderBarService {
	declare readonly _serviceBrand: undefined;

	readonly minimumWidth: number = 0;
	readonly maximumWidth!: number;
	readonly minimumHeight: number = 80;
	readonly maximumHeight: number = 80;

	private container: HTMLElement | undefined;
	private leftContainer: HTMLElement | undefined;
	private centerContainer: HTMLElement | undefined;
	private rightContainer: HTMLElement | undefined;

	constructor(
		@IStorageService storageService: IStorageService,
		@IThemeService themeService: IThemeService,
		@IWorkbenchLayoutService layoutService: IWorkbenchLayoutService,
		@IInstantiationService instantiationService: IInstantiationService
	) {
		super(
			Parts.HEADERBAR_PART,
			{ hasTitle: false },
			themeService,
			storageService,
			layoutService
		);

		// 注册主题变更监听
		this._register(this.themeService.onDidColorThemeChange(() => this.updateStyles()));
	}

	protected override createContentArea(parent: HTMLElement): HTMLElement {
		this.element = parent;

		// 创建主容器
		this.container = document.createElement('div');
		this.container.className = 'headerbar-container';
		this.updateStyles();

		// 初始化左中右区域的内容
		this.initLeftContent(this.container);
		this.initCenterContent(this.container);
		this.initRightContent(this.container);

		this.element.appendChild(this.container);
		return this.element;
	}

	// 初始化左区域的内容
	private initLeftContent(container: HTMLElement): void {
		this.leftContainer = document.createElement('div');
		this.leftContainer.className = 'headerbar-left';

		// 添加头像
		const img = document.createElement('img');
		img.className = 'avatar-container';
		img.src = 'https://avatars.githubusercontent.com/u/95179300?v=4&size=64';
		this.leftContainer.appendChild(img);
		// 将左中右区域添加到主容器
		container.appendChild(this.leftContainer);
	}

	// 初始化中区域的内容
	private initCenterContent(container: HTMLElement): void {
		this.centerContainer = document.createElement('div');
		this.centerContainer.className = 'headerbar-center';

		// 添加标题
		const title = document.createElement('div');
		title.className = 'header-title';
		title.textContent = 'VSCode';
		this.centerContainer.appendChild(title);
		container.appendChild(this.centerContainer);
	}

	// 初始化右区域的内容
	private initRightContent(container: HTMLElement): void {
		this.rightContainer = document.createElement('div');
		this.rightContainer.className = 'headerbar-right';

		// 添加登录按钮
		const buttonContainer = append(this.rightContainer, $('.i-button'));
		const button = new Button(buttonContainer, {
			...unthemedButtonStyles
		});
		button.label = '登录';
		button.onDidClick(() => {
			console.log('登录按钮被点击');
		});

		// 添加用户按钮
		const userButtonContainer = append(this.rightContainer, $('.editor-button'));
		const userButton = new ButtonWithIcon(userButtonContainer, {
			supportIcons: true,
			...unthemedButtonStyles,
		});
		userButton.icon = Codicon.person;
		container.appendChild(this.rightContainer);
	}

	public override updateStyles(): void {
		super.updateStyles();

		if (this.container) {
			// 使用主题颜色
			this.container.style.backgroundColor = this.themeService.getColorTheme().getColor(ACTIVITY_BAR_BACKGROUND)?.toString() || '';
			this.container.style.borderBottom = `1px solid ${this.themeService.getColorTheme().getColor(ACTIVITY_BAR_TOP_BACKGROUND)?.toString() || ''}`;
		}
	}

	override layout(width: number, height: number): void {
		super.layoutContents(width, height);
	}

	toJSON(): object {
		return {
			type: Parts.HEADERBAR_PART
		};
	}
}

registerSingleton(IHeaderBarService, HeaderbarPart, InstantiationType.Eager);
