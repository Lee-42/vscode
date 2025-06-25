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
					<n-icon><ArrowClockwise16Regular /></n-icon>
				</template>
			</n-button>
		</template>
		<span> 刷新 </span>
	</n-tooltip>
</template>

<script setup lang="ts">
import { NIcon, NButton, NTooltip } from "naive-ui";
import { ArrowClockwise16Regular } from "@vicons/fluent";

const handleClick = () => {
	console.log("refresh");
};
</script>
