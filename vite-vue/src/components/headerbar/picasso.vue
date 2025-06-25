<template>
	<TitleButton @click="handleClick" :icon="DrawImage24Regular" title="毕加索" />
</template>

<script setup lang="ts">
import TitleButton from "../title-button/index.vue";
import { DrawImage24Regular } from "@vicons/fluent";
import { useDialog } from "naive-ui";

const dialog = useDialog();

const handleClick = () => {
	dialog.info({
		title: "毕加索",
		content: "毕加索",
		positiveText: "确定",
		negativeText: "取消",
	});
};
</script>
