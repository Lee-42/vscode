<template>
	<n-dropdown trigger="click" :options="options" @select="handleSelect">
		<TitleButton :icon="Broom16Regular" title="清理缓存" />
	</n-dropdown>
</template>

<script setup lang="ts">
import { NDropdown } from "naive-ui";
import TitleButton from "../title-button/index.vue";
import { Broom16Regular } from "@vicons/fluent";
import { useNotification } from "naive-ui";

const notification = useNotification();
const options = [
	{
		label: "清除模拟器缓存",
		key: "clean-simulator",
	},
	{
		label: "清除编译缓存",
		key: "clean-compile",
	},
	{
		label: "清除项目缓存",
		key: "clean-project",
	},
	{
		label: "清除日志缓存",
		key: "clean-log",
	},
];

const handleSelect = (key: string) => {
    console.log(key);
	notification.success({
		title: "清理缓存成功",
		content: "缓存已成功清理"
	})
};
</script>
