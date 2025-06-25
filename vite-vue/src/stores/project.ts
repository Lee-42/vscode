/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { defineStore } from 'pinia';
import type { ProjectProps } from '../types/index.ts';
import { ProjectChannel } from '../../../src/custom/ipc/channel.ts';
import { useMessage } from 'naive-ui';
const message = useMessage();

export interface ProjectStore {
    projects: ProjectProps[];
    project: ProjectProps | null;
}

export const useProjectStore = defineStore('project', {
    state: (): ProjectStore => ({
        projects: [],
        project: null,
    }),
    actions: {
        async initProjects(project: ProjectProps) {
            if (!this.project) {
                this.project = project;
            }
        },
        async updateProject(project: ProjectProps) {
            this.project = project;
        },
        async fetchProjects() {
            return new Promise((resolve, _reject) => {
                (window as any).api.ipcRenderer.invoke(ProjectChannel.GET_ALL).then((projects: ProjectProps[]) => {
                    this.projects = projects;
                    resolve(projects);
                });
            });
        },
        async createProject(project: Omit<ProjectProps, 'id'>) {
            if (
                this.projects.length > 0 &&
                (this.projects.find(
                    (item: ProjectProps) => item.projectName === project.projectName
                ))
            ) {
                message.error('项目已存在');
                return;
            }
            return new Promise((resolve, _reject) => {
                (window as any).api.ipcRenderer.invoke(ProjectChannel.CREATE, project).then((result: any) => {
                    this.projects.push(result);
                    resolve(result);
                });
            });
        },
        async deleteProject(project: ProjectProps) {
            return new Promise((resolve, _reject) => {
                (window as any).api.ipcRenderer.invoke(ProjectChannel.DELETE, project).then((result: any) => {
                    this.projects = this.projects.filter((item: ProjectProps) => item.id !== project.id);
                    resolve(result);
                });
            });
        },
    },
    getters: {
        totalNumber: (state) => state.projects.length,
        getProjectById: (state) => (id: string) => {
            return state.projects.find((item: ProjectProps) => item.id === id);
        },
    },
});
