<template>
	<n-config-provider :theme="darkTheme">
		<n-message-provider>
			<n-dialog-provider>
				<div class="app">
					<router-view></router-view>
				</div>
			</n-dialog-provider>
		</n-message-provider>
	</n-config-provider>
</template>

<script setup lang="ts">
import { NMessageProvider, NConfigProvider, NDialogProvider, darkTheme } from "naive-ui";
import { useProjectStore } from "./stores/project.ts";
import { onMounted } from "vue";

onMounted(() => {
	const projectStore = useProjectStore();
	projectStore.fetchProjects();
	console.log('获取主题');
	(window as any).vscode.ipcRenderer.invoke('vscode:getTheme').then((result: any) => {
		console.log('result: ', result);
	})
});
</script>

<style scoped>
.app {
	height: 100vh;
}
</style>
