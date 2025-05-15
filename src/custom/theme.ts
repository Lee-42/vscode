/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import Store from 'electron-store';

// 主题类型定义
export type ThemeType = 'light' | 'dark' | 'system';

// 主题配置接口
export interface ThemeConfig {
	type: ThemeType;
	lastUpdated: number;
	customColors?: {
		primary?: string;
		secondary?: string;
		background?: string;
		text?: string;
	};
}

// 存储配置接口
interface ThemeStoreSchema {
	theme: ThemeConfig;
}

// 默认主题配置
const DEFAULT_THEME: ThemeConfig = {
	type: 'system',
	lastUpdated: Date.now(),
	customColors: {
		primary: '#007acc',
		secondary: '#6c757d',
		background: '#ffffff',
		text: '#000000'
	}
};

class ThemeManager {
	private store: Store<ThemeStoreSchema>;

	constructor() {
		this.store = new Store<ThemeStoreSchema>({
			name: 'theme-config',
			defaults: {
				theme: DEFAULT_THEME
			}
		});
	}

	/**
	 * 获取当前主题配置
	 */
	getTheme(): ThemeConfig {
		try {
			return this.store.get('theme');
		} catch (error) {
			console.error('获取主题配置失败:', error);
			return DEFAULT_THEME;
		}
	}

	/**
	 * 设置主题类型
	 */
	setThemeType(type: ThemeType): void {
		try {
			const currentTheme = this.getTheme();
			const newTheme: ThemeConfig = {
				...currentTheme,
				type,
				lastUpdated: Date.now()
			};

			this.store.set('theme', newTheme);
			console.log('设置主题类型成功:', type);
		} catch (error) {
			console.error('设置主题类型失败:', error);
			throw error;
		}
	}

	/**
	 * 更新自定义颜色
	 */
	updateCustomColors(colors: Partial<ThemeConfig['customColors']>): void {
		try {
			const currentTheme = this.getTheme();
			const newTheme: ThemeConfig = {
				...currentTheme,
				customColors: {
					...currentTheme.customColors,
					...colors
				},
				lastUpdated: Date.now()
			};

			this.store.set('theme', newTheme);
			console.log('更新自定义颜色成功:', colors);
		} catch (error) {
			console.error('更新自定义颜色失败:', error);
			throw error;
		}
	}

	/**
	 * 重置主题为默认配置
	 */
	resetTheme(): void {
		try {
			this.store.set('theme', DEFAULT_THEME);
			console.log('重置主题配置成功');
		} catch (error) {
			console.error('重置主题配置失败:', error);
			throw error;
		}
	}

	/**
	 * 获取主题最后更新时间
	 */
	getLastUpdated(): number {
		const theme = this.getTheme();
		return theme.lastUpdated;
	}

	/**
	 * 检查主题是否需要更新
	 */
	isThemeOutdated(maxAge: number): boolean {
		const lastUpdated = this.getLastUpdated();
		const now = Date.now();
		return now - lastUpdated > maxAge;
	}
}

// 导出单例实例
export const themeManager = new ThemeManager();
