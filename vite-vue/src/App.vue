<template>
	<n-config-provider :theme-overrides="themeOverrides" class="provider">
		<n-message-provider>
			<n-dialog-provider>
				<router-view></router-view>
			</n-dialog-provider>
		</n-message-provider>
	</n-config-provider>
</template>

<script setup lang="ts">
import {
	NMessageProvider,
	NConfigProvider,
	NDialogProvider,
	type GlobalThemeOverrides,
} from "naive-ui";
import { useProjectStore } from "./stores/project.ts";
import { onMounted, ref } from "vue";
import { ThemeChannel } from "../../src/custom/ipc/channel";

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
	};
};

onMounted(() => {
	const projectStore = useProjectStore();
	projectStore.fetchProjects();
	(window as any).api.ipcRenderer
		.invoke(ThemeChannel.UPDATE)
		.then((themes: any) => updateTheme(themes));
});
</script>

<style>
#app {
	height: 100vh;
}
.provider {
	height: 100%;
}
</style>
