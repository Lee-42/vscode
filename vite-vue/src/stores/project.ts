/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { defineStore } from 'pinia';
import { db } from '../db';
import type { ProjectProps } from '../types/index.ts';

export interface ProjectStore {
    items: ProjectProps[];
}

export const useProjectStore = defineStore('project', {
    state: (): ProjectStore => ({
        items: [],
    }),
    actions: {
        async fetchProjects() {
            const items = await db.projects.toArray();
            this.items = items;
        },
        async createProject(createdData: Omit<ProjectProps, 'id'>) {
            const newPId = await db.projects.add(createdData);
            this.items.push({
                id: newPId,
                ...createdData,
            });
            return newPId;
        },
        async deleteProject(id: number) {
            await db.projects.delete(id);
            const index = this.items.findIndex((item: ProjectProps) => item.id === id);
            if (index > -1) {
                this.items.splice(index, 1);
            }
        },
        async updateProject(id: number, updatedData: Partial<ProjectProps>) {
            await db.projects.update(id, updatedData);
            const index = this.items.findIndex((item: ProjectProps) => item.id === id);
            if (index > -1) {
                this.items[index] = { ...this.items[index], ...updatedData };
            }
        },
    },
    getters: {
        totalNumber: (state) => state.items.length,
        getProjectById: (state) => (id: number) => {
            return state.items.find((item: ProjectProps) => item.id === id);
        },
    },
});