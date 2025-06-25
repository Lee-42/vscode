<template>
	<n-select
		v-model:value="value"
		size="tiny"
		:options="options"
		:consistent-menu-width="false"
		@update:value="handleUpdateValue"
	/>
</template>

<script setup lang="ts">
import { NSelect } from "naive-ui";
import { computed, toRaw } from "vue";
import scales from "./scales";
import type { SelectOption } from "naive-ui";
import { ProjectChannel } from "../../../../../src/custom/ipc/channel";
import { useProjectStore } from "../../../stores/project";
import type { ProjectProps } from "../../../types";

const projectStore = useProjectStore();

const options = computed<SelectOption[]>(() =>
	scales.map((scale) => ({
		label: scale.label,
		value: scale.value,
	}))
);

const value = computed(() => projectStore.project?.scale);

const handleUpdateValue = (value: number) => {
	const newProject = {
		...toRaw(projectStore.project),
		scale: value,
	};
	console.log("newProject: ", newProject);
	(window as any).api.ipcRenderer
		.invoke(ProjectChannel.UPDATE, newProject)
		.then((project: ProjectProps) => {
			console.log(project);
			projectStore.updateProject(project);
		});
};
</script>
