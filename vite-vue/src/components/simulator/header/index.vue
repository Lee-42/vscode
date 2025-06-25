<template>
	<div class="simulator-header">
		<div class="header-left">
			<NInputGroup>
				<DeviceSelector />
				<ScaleSelector />
			</NInputGroup>
		</div>
		<div class="header-right">
			<Refresh />
			<Interrupt />
			<Separate />
		</div>
	</div>
</template>

<script setup lang="ts">
import { NInputGroup } from "naive-ui";
import DeviceSelector from "./device-selector.vue";
import ScaleSelector from "./scale-selector.vue";
import Refresh from "./refresh.vue";
import Interrupt from "./interrupt.vue";
import Separate from "./separate.vue";
</script>

<style lang="postcss" scoped>
.simulator-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 35px;
	box-sizing: border-box;
	background: var(--vscode-statusBar-background);
	padding: 0px 4px;

	.header-left {
		display: flex;
		height: 100%;
		align-items: center;
	}
	.header-right {
		display: flex;
		align-items: center;
		height: 100%;
		gap: 10px;
	}
}
</style>
