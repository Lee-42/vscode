<template>
	<NConfigProvider :theme-overrides="themeOverrides" class="provider">
		<div class="simulator-container">
			<Toolbar />
			<Body />
			<Footer />
		</div>
	</NConfigProvider>
</template>

<script setup lang="ts">
import Toolbar from "./toolbar/index.vue";
import Footer from "./footer/index.vue";
import Body from "./body/index.vue";
import { NConfigProvider, type GlobalThemeOverrides } from "naive-ui";
import { onMounted, ref } from "vue";
import { ThemeChannel } from "../../../../src/custom/ipc/channel";
import { useProjectStore } from "../../stores/project";

const themeOverrides = ref<GlobalThemeOverrides>({});
const projectStore = useProjectStore();

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
		},
	};
};

onMounted(() => {
	projectStore.fetchProjects().then((projects) => {
		console.log("projects: ", projects);
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

<style lang="postcss" scoped>
.simulator-container {
	width: 100%;
	height: 100%;
}
</style>
