<template>
	<div class="toolbar">
		<div class="toolbar-left">
			<NInputGroup>
				<DeviceSelector />
				<ScaleSelector />
			</NInputGroup>
		</div>
		<div class="toolbar-right">
			<Refresh />
			<Operation />
		</div>
	</div>
</template>

<script setup lang="ts">
import { NInputGroup } from "naive-ui";
import DeviceSelector from "./device-selector.vue";
import ScaleSelector from "./scale-selector.vue";
import Refresh from "./refresh.vue";
import Operation from "./operation.vue";
</script>

<style lang="postcss" scoped>
.toolbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 22px;
	background: var(--vscode-statusBar-background);
	
	.toolbar-left {
		display: flex;
		height: 100%;
	}
	.toolbar-right {
		display: flex;
		align-items: center;
		height: 100%;
		div {
			margin-right: 10px;
		}
	}
}
</style>
