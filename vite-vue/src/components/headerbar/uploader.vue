<template>
	<TitleButton :icon="CloudArrowUp32Regular" title="上传" @click="handleClick" />
	<n-drawer
		v-model:show="show"
		title="上传"
		:show-mask="false"
		:mask-closable="false"
		placement="top"
		:to="workbench || undefined"
	>
        <n-button @click="show = false">取消</n-button>
    </n-drawer>
</template>

<script setup lang="ts">
import TitleButton from "../title-button/index.vue";
import { NButton, NDrawer } from "naive-ui";
import { CloudArrowUp32Regular } from "@vicons/fluent";
import { onMounted, ref } from "vue";

const show = ref(false);
const workbench = ref<HTMLElement | null>(null);

onMounted(() => {
	workbench.value = document.querySelectorAll(
		".monaco-grid-branch-node"
	)[1] as HTMLElement;
});

const handleClick = () => {
	show.value = true;
};
</script>
