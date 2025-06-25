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
import devices from "./devices";
import { ProjectChannel } from "../../../../../src/custom/ipc/channel";
import { useProjectStore } from "../../../stores/project";
import type { ProjectProps } from "../../../types";

const projectStore = useProjectStore();

const options = devices.map((device) => ({
	label: device.label,
	value: device.value,
}));

const value = computed(() => {
	return projectStore.project?.device?.value;
});

const handleUpdateValue = (value: string) => {
	const newDevice = devices.find((device) => device.value === value);
	const newProject = {
		...toRaw(projectStore.project),
		device: newDevice,
	};
	if (newDevice) {
		(window as any).api.ipcRenderer
			.invoke(ProjectChannel.UPDATE, newProject)
			.then((project: ProjectProps) => {
				console.log(project);
				projectStore.updateProject(project);
			});
	}
};
</script>
