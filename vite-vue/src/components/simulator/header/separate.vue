<template>
	<n-tooltip placement="bottom" trigger="hover">
		<template #trigger>
			<n-button
				size="tiny"
				circle
				type="primary"
				@click="handleClick"
			>
				<template #icon>
					<n-icon><PanelSeparateWindow20Filled /></n-icon>
				</template>
			</n-button>
		</template>
		<span> 分离窗口 </span>
	</n-tooltip>
</template>

<script setup lang="ts">
import { NIcon, NButton, NTooltip } from "naive-ui";
import { PanelSeparateWindow20Filled } from "@vicons/fluent";

const handleClick = () => {
	console.log("separate");
};
</script>

<style scoped lang="scss"></style>
