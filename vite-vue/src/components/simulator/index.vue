<template>
	<NConfigProvider :theme-overrides="themeOverrides">
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
import { NConfigProvider } from "naive-ui";
import { onMounted, ref } from "vue";

const themeOverrides = ref({});

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
		}
	};
};

onMounted(() => {
	// 初始化主题变量
	(window as any).api.ipcRenderer
		.invoke("vscode:initTheme")
		.then((themes: any) => updateTheme(themes));

	(window as any).api.ipcRenderer.on(
		"vscode:updateTheme",
		(_: any, themes: any) => updateTheme(themes)
	);
});
</script>

<style lang="postcss" scoped>
.simulator-container {
	background: var(--vscode-editor-background);
	webview {
		height: 100%;
	}
}
</style>
