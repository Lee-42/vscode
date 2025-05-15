<template>
	<n-select v-model:value="value" size="tiny" :options="options" :consistent-menu-width="false" />
</template>

<script setup lang="ts">
import { NSelect } from "naive-ui";
import { ref } from "vue";

const value = ref(1)
const options = [
	{
		value: 1,
		label: "100%",
	},
	{
		value: 0.85,
		label: "85%",
	},
	{
		value: 0.75,
		label: "75%",
	},
	{
		value: 0.5,
		label: "50%",
	},
	{
		value: 0,
		label: "自适应",
	},
];
</script>
