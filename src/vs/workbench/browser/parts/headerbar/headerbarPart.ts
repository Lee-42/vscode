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
import { unthemedButtonStyles } from '../../../../base/browser/ui/button/button.js';
import { Codicon } from '../../../../base/common/codicons.js';
import { ICommandService } from '../../../../platform/commands/common/commands.js';
import { IContextKeyService } from '../../../../platform/contextkey/common/contextkey.js';
import { AuxiliaryBarVisibleContext } from '../../../common/contextkeys.js';
import { ButtonWithIconAndDescription } from '../../../../base/browser/ui/button/custom-button.js';

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
	private readonly commandService: ICommandService;
	private readonly contextKeyService: IContextKeyService;

	constructor(
		@IStorageService storageService: IStorageService,
		@IThemeService themeService: IThemeService,
		@IWorkbenchLayoutService layoutService: IWorkbenchLayoutService,
		@IInstantiationService instantiationService: IInstantiationService,
		@ICommandService commandService: ICommandService,
		@IContextKeyService contextKeyService: IContextKeyService
	) {
		super(
			Parts.HEADERBAR_PART,
			{ hasTitle: false },
			themeService,
			storageService,
			layoutService
		);

		this.commandService = commandService;
		this.contextKeyService = contextKeyService;

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

		this.avatar(this.leftContainer);
		this.simulatorSwitcher(this.leftContainer);
		this.editortSwitcher(this.leftContainer);
		this.devtoolSwitcher(this.leftContainer);

		// 将左中右区域添加到主容器
		container.appendChild(this.leftContainer);
	}

	private avatar(container: HTMLElement) {
		// 添加头像
		const img = document.createElement('img');
		img.className = 'avatar-container';
		img.src = 'https://avatars.githubusercontent.com/u/95179300?v=4&size=64';
		container.appendChild(img);
	}


	private simulatorSwitcher(container: HTMLElement) {
		// 添加图标描述按钮示例
		const buttonContainer = append(container, $('.simulator-button'));
		const iconDescButton = new ButtonWithIconAndDescription(buttonContainer, {
			supportIcons: true,
		});
		iconDescButton.icon = Codicon.deviceMobile;
		iconDescButton.description = '模拟器';

		// 获取第二侧边栏可见性上下文
		const auxiliaryBarVisible = AuxiliaryBarVisibleContext.bindTo(this.contextKeyService);

		// 更新按钮状态
		const updateButtonState = () => {
			if (auxiliaryBarVisible.get()) {
				iconDescButton.active();
			} else {
				iconDescButton.inactive();
			}
		};

		// 监听状态变化
		this._register(this.contextKeyService.onDidChangeContext(e => {
			if (e.affectsSome(new Set(['auxiliaryBarVisible']))) {
				updateButtonState();
			}
		}));

		// 初始化按钮状态
		updateButtonState();

		iconDescButton.onDidClick(() => {
			this.commandService.executeCommand('workbench.action.toggleAuxiliaryBar');
		});
	}

	private editortSwitcher(container: HTMLElement) {
		const buttonContainer = append(container, $('.editor-button'));
		const iconDescButton = new ButtonWithIconAndDescription(buttonContainer, {
			supportIcons: true,
		});
		iconDescButton.icon = Codicon.edit;
		iconDescButton.description = '编辑器';
		iconDescButton.onDidClick(() => {
			console.log('切换编辑器');
		});

	}
	private devtoolSwitcher(container: HTMLElement) {
		const buttonContainer = append(container, $('.devtool-button'));
		const iconDescButton = new ButtonWithIconAndDescription(buttonContainer, {
			supportIcons: true,
			// ...unthemedButtonStyles
		});
		iconDescButton.icon = Codicon.terminal;
		iconDescButton.description = '调试器';
		iconDescButton.onDidClick(() => {
			console.log('切换调试器');
		});

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
