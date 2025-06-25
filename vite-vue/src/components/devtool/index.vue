<template>
	<n-config-provider :theme-overrides="themeOverrides">
		<n-button
			v-if="!devtoolUrl"
			size="small"
			type="primary"
			@click="handleClick"
			>获取</n-button
		>
		<div v-else style="width: 100%; height: 100%; position: relative">
			<webview
				:src="devtoolUrl"
				nodeintegration="false"
				webSecurity="false"
				allowpopups="true"
				disablewebsecurity="true"
				partition="persist:devtools"
				autosize="true"
				useragent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
				style="width: 100%; height: 100%"
			></webview>
			<!-- <n-button
				size="small"
				type="info"
				@click="openWebviewDevTools"
				style="position: absolute; top: 10px; right: 10px; z-index: 1000;"
			>
				调试WebView
			</n-button> -->
		</div>
	</n-config-provider>
</template>

<script setup lang="ts">
import type { GlobalThemeOverrides } from "naive-ui";
import { NButton, NConfigProvider } from "naive-ui";
import { ref, onMounted } from "vue";
import {
	ProjectChannel,
	ThemeChannel,
} from "../../../../src/custom/ipc/channel";
import { useProjectStore } from "../../stores/project";
import type { ProjectProps } from "../../types";

const devtoolUrl = ref("");

const projectStore = useProjectStore();

const themeOverrides = ref<GlobalThemeOverrides>({});

const handleClick = () => {
	(window as any).api.ipcRenderer
		.invoke(ProjectChannel.GET_DEVTOOL_URL, "https://www.github.com")
		.then((res: any) => {
			console.log("获取调试器url: ", res);
			// /Users/lee/Project/vscode/vite-vue/public/front_end/inspector.html?ws=127.0.0.1:9222/devtools/page/C4494E8EBEFFC09FE21815648C4A50E9
			// devtoolUrl.value = `http://127.0.0.1:9222${res}`;
			devtoolUrl.value = `file:///Users/lee/Project/vscode/vite-vue/public/front_end/inspector.html?ws=127.0.0.1:9222/devtools/page/C4494E8EBEFFC09FE21815648C4A50E9`;
		});
};

// 打开webview调试窗口的方法
// const openWebviewDevTools = () => {
// 	const webview = document.querySelector('webview') as any;
// 	if (webview) {
// 		// 打开webview的开发者工具
// 		webview.openDevTools();
// 	} else {
// 		console.warn('WebView未找到');
// 	}
// };

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
		Drawer: {
			color: themes["--vscode-dropdown-background"],
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

	// 监听主题变量变化
	(window as any).api.ipcRenderer.on(
		ThemeChannel.GET,
		(_: any, themes: any) => {
			updateTheme(themes);
		}
	);
});
</script>

<style scoped lang="postcss">
.n-config-provider {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	webview {
		width: 100%;
		height: 100%;
	}
}
</style>
