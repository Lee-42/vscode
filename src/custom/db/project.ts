/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import Store from 'electron-store';
import { ProjectProps } from '../types/project.js';
const _store = new Store();

// create project
const createProject = (project: ProjectProps) => {
	const projects = _store.get('projects') as ProjectProps[] || [];
	projects.push({
		...project,
		id: project.projectPath,
		createdAt: new Date(Date.now()),
		updatedAt: new Date(Date.now())
	});
	_store.set('projects', projects);
	return project;
};

// update project
const updateProject = (id: string, updates: Partial<ProjectProps>) => {
	const projects = _store.get('projects') as ProjectProps[] || [];
	const index = projects.findIndex(p => p.id === id);

	if (index === -1) {
		throw new Error(`Project with id ${id} not found`);
	}

	projects[index] = {
		...projects[index],
		...updates,
		updatedAt: new Date(Date.now())
	};
	_store.set('projects', projects);
	return projects[index];
};

// delete project
const deleteProject = (project: ProjectProps) => {
	const projects = _store.get('projects') as ProjectProps[] || [];
	const filteredProjects = projects.filter(p => p.id !== project.id);
	_store.set('projects', filteredProjects);
	return {
		message: 'success',
	};
};

// get all projects
const getAllProjects = () => {
	return _store.get('projects') as ProjectProps[] || [];
};

// get project by id
const getProjectById = (id: string) => {
	const projects = _store.get('projects') as ProjectProps[] || [];
	return projects.find(p => p.id === id);
};

export {
	createProject,
	updateProject,
	deleteProject,
	getAllProjects,
	getProjectById,
	type ProjectProps
};
