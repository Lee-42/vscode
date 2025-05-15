/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import { WindowChannel } from '../../../src/custom/ipc/channel';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/index.vue'),
        meta: {
            width: 300,
			height: 450,
			resizable: false,
			devtool: true,
			keepAlive: false,
			start: true,
        },
    },
    {
        path: '/project',
        name: 'project',
        component: () => import('../views/project/index.vue'),
        meta: {
            width: 800,
            height: 600,
            resizable: false,
            devtool: true,
            keepAlive: false,
        },
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

(router as any).openwin = (path: string) => {
    return new Promise((resolve) => {
        const winArgs = routes.find((route) => route.path === path);
        delete winArgs?.component;
        (window as any).api.ipcRenderer.invoke(WindowChannel.OPEN_WIN, winArgs);
        resolve(true);
    });
};

(router as any).closewin = (path: string) => {
    return new Promise((resolve) => {
        const winArgs = routes.find((route) => route.path === path);
        delete winArgs?.component;
        (window as any).api.ipcRenderer.invoke(WindowChannel.CLOSE_WIN, winArgs?.name);
        resolve(true);
    });
};

export default router;