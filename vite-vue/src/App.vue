<template>
	<n-config-provider :theme="darkTheme">
		<n-message-provider>
			<div class="app">
				<router-view></router-view>
			</div>
		</n-message-provider>
	</n-config-provider>
</template>

<script setup lang="ts">
import { NMessageProvider, NConfigProvider, darkTheme } from "naive-ui";
</script>

<style scoped>
.app {
	height: 100vh;
}
</style>
