<template>
	<div class="layout-controller">
		<n-avatar>
			<img src="https://avatars.githubusercontent.com/u/95179300?v=4&size=64" />
		</n-avatar>
		<TitleButton
			:icon="Phone24Regular"
			title="模拟器"
			:active="projectStore.project?.simulationVisible"
			@click="toggleSimulator"
		/>
		<TitleButton :icon="Code20Filled" title="编辑器" :active="true" />
		<TitleButton
			:icon="WindowDevTools20Regular"
			title="调试器"
			:active="projectStore.project?.devtoolVisible"
			@click="toggleDevtool"
		/>
	</div>
</template>

<script setup lang="ts">
import { NAvatar } from "naive-ui";
import TitleButton from "../title-button/index.vue";
import {
	Phone24Regular,
	Code20Filled,
	WindowDevTools20Regular,
} from "@vicons/fluent";
import { toRaw } from "vue";
import { ProjectChannel } from "../../../../src/custom/ipc/channel";
import { useProjectStore } from "../../stores/project";
import type { ProjectProps } from "../../types";

const projectStore = useProjectStore();

const toggleSimulator = () => {
	(window as any).api.ipcRenderer.invoke(
		ProjectChannel.TOGGLE_SIMULATOR,
		toRaw(projectStore.project)
	).then((project: ProjectProps) => {
		projectStore.updateProject(project);
	})
};

const toggleDevtool = () => {
	(window as any).api.ipcRenderer.invoke(
		ProjectChannel.TOGGLE_DEVTOOL,
		toRaw(projectStore.project)
	).then((project: ProjectProps) => {
		projectStore.updateProject(project);
	})
}
</script>

<style lang="postcss" scoped>
.layout-controller {
	display: flex;
	align-items: flex-start;

	div {
		margin-left: 20px;
	}
}
</style>
