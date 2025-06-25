/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import Store from 'electron-store';

// theme type
export type ThemeType = 'light' | 'dark' | 'system';

// theme config
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

// store config
interface ThemeStoreSchema {
	theme: ThemeConfig;
}

// default theme config
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
	 * get current theme config
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
	 * set theme type
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
	 * update custom colors
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
	 * reset theme to default config
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
	 * get theme last updated time
	 */
	getLastUpdated(): number {
		const theme = this.getTheme();
		return theme.lastUpdated;
	}

	/**
	 * check theme is outdated
	 */
	isThemeOutdated(maxAge: number): boolean {
		const lastUpdated = this.getLastUpdated();
		const now = Date.now();
		return now - lastUpdated > maxAge;
	}
}

// export singleton instance
export const themeManager = new ThemeManager();
