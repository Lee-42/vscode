/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ipcMain } from 'electron';
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from '../db/project.js';
import { ProjectChannel } from './channel.js';

ipcMain.handle(ProjectChannel.CREATE, async (event, project: any) => {
	createProject(project);
});

ipcMain.handle(ProjectChannel.UPDATE, async (event, project: any) => {
	updateProject(project.id, project);
});

ipcMain.handle(ProjectChannel.DELETE, async (event, project: any) => {
	deleteProject(project.id);
});

ipcMain.handle(ProjectChannel.GET_ALL, async (event) => {
	return getAllProjects();
});

ipcMain.handle(ProjectChannel.GET_BY_ID, async (event, id: string) => {
	return getProjectById(id);
});



