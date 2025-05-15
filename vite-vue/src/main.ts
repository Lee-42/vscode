/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import HeaderBar from './components/headerbar/index.vue';
import router from './router';
import './db';
import { createPinia } from 'pinia';
import { draggable } from './directives/draggable';
import Simulator from './components/simulator/index.vue';

setTimeout(() => {
	const headerbarContainer = document.getElementById('headerbar-container');
	console.log('headerbarContainer: ', headerbarContainer);
	console.log('fuck you');
	const app = createApp(App);
	app.use(router);
	app.use(createPinia());
	app.directive('draggable', draggable);
	app.mount('#app');


	const header = createApp(HeaderBar);
	header.mount('#headerbar-container');

	const simulator = createApp(Simulator);
	simulator.mount('#simulator-container');
}, 3000);

