<template>
	<NConfigProvider
		:theme-overrides="themeOverrides"
		class="simulator-container"
	>
		<SimulatorHeader />
		<SimulatorBody />
		<SimulatorFooter />
	</NConfigProvider>
</template>

<script setup lang="ts">
import SimulatorHeader from "./header/index.vue";
import SimulatorFooter from "./footer/index.vue";
import SimulatorBody from "./body/index.vue";
import { NConfigProvider, type GlobalThemeOverrides } from "naive-ui";
import { onMounted, ref } from "vue";
import {
	ProjectChannel,
	ThemeChannel,
} from "../../../../src/custom/ipc/channel";
import type { ProjectProps } from "../../types";
import { useProjectStore } from "../../stores/project";

const projectStore = useProjectStore();

const themeOverrides = ref<GlobalThemeOverrides>({});

const updateTheme = (themes: any) => {
	themeOverrides.value = {
		common: {
			primaryColor: themes["--vscode-button-background"],
			primaryColorHover: themes["--vscode-button-hoverBackground"],
			primaryColorPressed: themes["--vscode-button-secondaryBackground"],
			primaryColorSuppl: themes["--vscode-button-secondaryBackground"],
			inputColor: themes["--vscode-input-background"],
			borderRadius: "2px",
			hoverColor: themes["--vscode-list-hoverBackground"],
			borderColor: themes["--vscode-button-background"],
			popoverColor: themes["--vscode-input-background"],
			textColor1: themes["--vscode-editor-foreground"],
			textColor2: themes["--vscode-descriptionForeground"],
			textColor3: themes["--vscode-disabledForeground"],
			modalColor: themes["--vscode-editor-background"],
		},
		Layout: {
			headerColor: themes["--vscode-titleBar-activeBackground"],
			headerBorderColor: themes["--vscode-titleBar-border"],
			siderColor: themes["--vscode-sideBar-background"],
			siderBorderColor: themes["--vscode-sideBar-border"],
			footerColor: themes["--vscode-statusBar-background"],
			footerBorderColor: themes["--vscode-statusBar-border"],
			color: themes["--vscode-editor-background"],
		},
		Card: {
			color: themes["--vscode-menu-background"],
			borderColor: "transparent",
		},
		Drawer: {
			color: themes["--vscode-dropdown-background"],
		},
		Tooltip: {
			padding: "4px",
		},
	};
};

onMounted(() => {
	// 初始化state
	(window as any).api.ipcRenderer
		.invoke(ProjectChannel.INIT_PROJECT)
		.then((project: ProjectProps) => {
			projectStore.initProjects(project);
		});
	// 初始化主题变量
	(window as any).api.ipcRenderer
		.invoke(ThemeChannel.UPDATE)
		.then((themes: any) => updateTheme(themes));

	(window as any).api.ipcRenderer.on(
		ThemeChannel.GET,
		(_: any, themes: any) => {
			updateTheme(themes);
		}
	);
});
</script>

<style lang="postcss">
.simulator-container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}
</style>
