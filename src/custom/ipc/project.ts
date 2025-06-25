/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { BrowserWindow, ipcMain } from 'electron';
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from '../db/project.js';
import { DEVTOOL_URL } from '../util/index.js';
import { ProjectProps } from '../types/project.js';
import { ProjectChannel } from './channel.js';

ipcMain.handle(ProjectChannel.CREATE, async (event, project: any) => createProject(project));

ipcMain.handle(ProjectChannel.UPDATE, async (event, project: any) => updateProject(project.id, project));

ipcMain.handle(ProjectChannel.DELETE, async (event, project: ProjectProps) => {
	return deleteProject(project);
});

ipcMain.handle(ProjectChannel.GET_ALL, async (event) => getAllProjects());

ipcMain.handle(ProjectChannel.GET_BY_ID, async (event, id: string) => getProjectById(id));

ipcMain.handle(ProjectChannel.TOGGLE_SIMULATOR, async (event, project: ProjectProps) => {
	if (!project.id) { return; }
	const newProject = {
		...project,
		simulationVisible: !project.simulationVisible,
	};
	updateProject(project.id, newProject);
	const window = BrowserWindow.fromWebContents(event.sender);
	window?.webContents.send(ProjectChannel.TOGGLE_SIMULATOR, newProject);
	console.log('newProject: ', newProject);
	return newProject;
});

ipcMain.handle(ProjectChannel.TOGGLE_DEVTOOL, async (event, project: ProjectProps) => {
	if (!project.id) { return; }
	const newProject = {
		...project,
		devtoolVisible: !project.devtoolVisible,
	};
	updateProject(project.id, newProject);
	const window = BrowserWindow.fromWebContents(event.sender);
	window?.webContents.send(ProjectChannel.TOGGLE_DEVTOOL, newProject);
	return newProject;
});

ipcMain.handle(ProjectChannel.WILL_MOUNT, async (event) => {
	const window = BrowserWindow.fromWebContents(event.sender);
	window?.webContents.send(ProjectChannel.WILL_MOUNT);
});

function getTargetWebViewDevtoolsFrontendUrl(url: string) {
	return fetch(`${DEVTOOL_URL}/json`)
		.then((res) => res.json())
		.then((res) => {
			const target = res.find((child: any) => child.type === 'webview');
			// todo whether can filter by id
			return target.devtoolsFrontendUrl;
		}).catch(err => {
		});
}

ipcMain.handle(ProjectChannel.GET_DEVTOOL_URL, async (event, url: string) => {
	return getTargetWebViewDevtoolsFrontendUrl(url);
});

