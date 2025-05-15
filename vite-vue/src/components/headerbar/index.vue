<template>
	<n-config-provider :theme-overrides="themeOverrides">
		<n-notification-provider>
			<n-modal-provider>
				<n-dialog-provider>
					<n-message-provider>
						<div class="header-bar">
							<LayoutController />
							<CompileSelector />
							<CacheCleaner />
							<Uploader />
							<Message />
							<div class="test"></div>
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
import Message from "./message.vue";
import {
	NMessageProvider,
	NModalProvider,
	NDialogProvider,
	NNotificationProvider,
	NConfigProvider,
} from "naive-ui";
import type { GlobalThemeOverrides } from "naive-ui";
import { onMounted, ref } from "vue";
import { useProjectStore } from "../../stores/project";
import { ThemeChannel } from "../../../../src/custom/ipc/channel";

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
			color: themes['--vscode-editor-background']
		}
	};
};

onMounted(() => {
	console.log('projectStoreprojectStore: ', projectStore.items);
	// 初始化主题变量
	(window as any).api.ipcRenderer
		.invoke(ThemeChannel.UPDATE)
		.then((themes: any) => updateTheme(themes));

	(window as any).api.ipcRenderer.on(ThemeChannel.GET, (_: any, themes: any) => {
		console.log("themes: ", themes);
		updateTheme(themes);
	});
});
</script>

<style lang="postcss" scoped>
.n-config-provider {
	width: 100%;
	.header-bar {
		width: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.test {
		width: 20px;
		height: 20px;
	}
}
</style>
