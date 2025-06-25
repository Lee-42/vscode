<template>
	<div class="compile-mode">
		<n-input-group size="tiny">
			<n-select
				v-model:value="selectedMode"
				:options="modeOptions"
				size="tiny"
				style="width: 120px"
			/>
			<title-button :icon="ArrowClockwise16Regular" title="编译"></title-button>
		</n-input-group>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NSelect, NInputGroup } from "naive-ui";
import { ArrowClockwise16Regular } from "@vicons/fluent";
import TitleButton from "../title-button/index.vue";

const selectedMode = ref("development");
const modeOptions = [
	{
		label: "开发模式",
		value: "development",
	},
	{
		label: "生产模式",
		value: "production",
	},
	{
		label: "测试模式",
		value: "test",
	},
];
</script>

<style lang="postcss" scoped>
.compile-mode {
	display: flex;
	align-items: flex-start;
	margin-left: 20px;
}
</style>
