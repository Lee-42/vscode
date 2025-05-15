/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import Store from 'electron-store';

const _store = new Store();


// 项目相关的类型定义
interface Project {
	id: string;
	name: string;
	path: string;
	createdAt: number;
	updatedAt: number;
	[key: string]: any;
}

// 创建项目
const createProject = (project: Project) => {
	const projects = _store.get('projects') as Project[] || [];
	projects.push({
		...project,
		createdAt: Date.now(),
		updatedAt: Date.now()
	});
	_store.set('projects', projects);
	return project;
};

// 更新项目
const updateProject = (id: string, updates: Partial<Project>) => {
	const projects = _store.get('projects') as Project[] || [];
	const index = projects.findIndex(p => p.id === id);

	if (index === -1) {
		throw new Error(`Project with id ${id} not found`);
	}

	projects[index] = {
		...projects[index],
		...updates,
		updatedAt: Date.now()
	};

	_store.set('projects', projects);
	return projects[index];
};

// 删除项目
const deleteProject = (id: string) => {
	const projects = _store.get('projects') as Project[] || [];
	const filteredProjects = projects.filter(p => p.id !== id);
	_store.set('projects', filteredProjects);
};

// 获取所有项目
const getAllProjects = () => {
	return _store.get('projects') as Project[] || [];
};

// 根据ID获取项目
const getProjectById = (id: string) => {
	const projects = _store.get('projects') as Project[] || [];
	return projects.find(p => p.id === id);
};

export {
	createProject,
	updateProject,
	deleteProject,
	getAllProjects,
	getProjectById,
	type Project
};
