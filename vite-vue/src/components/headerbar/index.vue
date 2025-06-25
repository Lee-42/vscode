<template>
	<n-config-provider :theme-overrides="themeOverrides">
		<n-notification-provider>
			<n-modal-provider>
				<n-dialog-provider>
					<n-message-provider>
						<div class="header-bar" id="header-bar">
							<LayoutController />
							<CompileSelector />
							<Picasso />
							<CacheCleaner />
							<RemoteDebug />
							<Uploader />
							<Message />
						</div>
					</n-message-provider>
				</n-dialog-provider>
			</n-modal-provider>
		</n-notification-provider>
	</n-config-provider>
</template>

<script setup lang="ts">
import LayoutController from "./layout-controller.vue";
import CompileSelector from "./compile-selector.vue";
import CacheCleaner from "./cache-cleaner.vue";
import Uploader from "./uploader.vue";
import Picasso from "./picasso.vue";
import Message from "./message.vue";
import RemoteDebug from "./remote-debug.vue";
import {
	NMessageProvider,
	NModalProvider,
	NDialogProvider,
	NNotificationProvider,
	NConfigProvider,
} from "naive-ui";
import type { GlobalThemeOverrides } from "naive-ui";
import { onMounted, ref } from "vue";
import {
	ProjectChannel,
	ThemeChannel,
} from "../../../../src/custom/ipc/channel";
import { useProjectStore } from "../../stores/project";
import type { ProjectProps } from "../../types";

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
			// borderColor: themes["--vscode-button-background"],
			borderColor: "transparent",
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
		}
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

<style lang="postcss" scoped>
.n-config-provider {
	width: 100%;
	height: 100%;
	padding: 10px 20px;
	box-sizing: border-box;
	.header-bar {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}
}
</style>
