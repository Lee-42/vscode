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
					<n-icon><RecordStop20Regular /></n-icon>
				</template>
			</n-button>
		</template>
		<span> 终止 </span>
	</n-tooltip>
</template>

<script setup lang="ts">
import { NIcon, NButton, NTooltip } from "naive-ui";
import { RecordStop20Regular } from "@vicons/fluent";

const handleClick = () => {
	console.log("interrupt");
};
</script>
