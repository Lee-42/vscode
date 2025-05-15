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
	};
};

onMounted(() => {
	// 初始化主题变量
	(window as any).api.ipcRenderer
		.invoke("vscode:initTheme")
		.then((themes: any) => updateTheme(themes));

	(window as any).api.ipcRenderer.on("vscode:updateTheme", (_: any, themes: any) => {
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
