<template>
	<div class="simulator-footer">
		<n-select
			v-model:value="value"
			style="width: 90px"
			size="tiny"
			:options="options"
			:consistent-menu-width="false"
			@update:value="handleUpdateValue"
		/>
		<div class="value"> /pages/login/index </div>
	</div>
</template>

<script setup lang="ts">
import { NSelect } from "naive-ui";
import { ref } from "vue";

const value = ref("page_path");

const options = [
	{
		label: "页面路径",
		value: "page_path",
	},
	{
		label: "页面参数",
		value: "page_params",
	},
];

const handleUpdateValue = (value: string) => {
	console.log(value);
};
</script>

<style lang="postcss">
.simulator-footer {
	height: 22px;
	display: flex;
	align-items: center;
	gap: 10px;
	.n-select {
		width: 100px;
		input {
			border-color: transparent;
		}
	}
	.value {
		color: #999;
		font-size: 13px;
		font-weight: 500;
	}
}
</style>
