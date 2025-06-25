/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import './db';
import { createPinia } from 'pinia';
import { draggable } from './directives/draggable';
import HeaderBar from './components/headerbar/index.vue';
import Simulator from './components/simulator/index.vue';
import Devtool from './components/devtool/index.vue';
import Daimonion from './components/daimonion/index.vue';

// 防抖函数
const debounce = (fn: Function, delay: number) => {
	let timer: number | null = null;
	return function(this: any, ...args: any[]) {
		if (timer) {clearTimeout(timer);}
		timer = setTimeout(() => {
			fn.apply(this, args);
			timer = null;
		}, delay);
	};
};

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.directive('draggable', draggable);
app.mount('#app');

// 监听DOM元素创建
const observeElementCreation = (selector: string, callback: (element: Element) => void) => {
	// 使用防抖包装回调函数
	const debouncedCallback = debounce((element: Element) => {
		callback(element);
		// 元素创建后断开观察器连接
		observer.disconnect();
	}, 100);

	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			mutation.addedNodes.forEach((node) => {
				if (node instanceof Element) {
					const element = node.querySelector(selector);
					if (element) {
						debouncedCallback(element);
					}
				}
			});
		});
	});

	// 优化观察器配置
	observer.observe(document.body, {
		childList: true,
		subtree: true,
		attributes: false, // 不监听属性变化
		characterData: false, // 不监听文本内容变化
	});

	// 检查元素是否已经存在
	const existingElement = document.querySelector(selector);
	if (existingElement) {
		debouncedCallback(existingElement);
	}

	return observer;
};

// 监听headerbar-part创建
observeElementCreation('#headerbar-part', (element) => {
	console.log('HeaderBar element created:', element);
	const header = createApp(HeaderBar);
	header.mount('#headerbar-part');
	header.use(createPinia());
});

// 监听simulator-part创建
observeElementCreation('#simulator-part', (element) => {
	console.log('Simulator element created:', element);
	const simulator = createApp(Simulator);
	simulator.mount('#simulator-part');
	simulator.use(createPinia());
});

// 监听devtool-part创建
observeElementCreation('#devtool-part', (element) => {
	console.log('Devtool element created:', element);
	const devtool = createApp(Devtool);
	devtool.mount('#devtool-part');
	devtool.use(createPinia());
});

// 监听devtool-part创建
observeElementCreation('#daimonion-part', (element) => {
	console.log('Daimion element created:', element);
	const daimonion = createApp(Daimonion);
	daimonion.mount('#daimonion-part');
	daimonion.use(createPinia());
});



