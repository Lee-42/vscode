<template>
    <TitleButton :icon="Alert16Regular" title="消息" @click="handleClick"/>
    <n-drawer v-model:show="show" title="消息" :show-mask="false" :mask-closable="false" :width="'100%'" :placement="'right'" :to="workbench || undefined">
        <div class="message-content">消息</div>
    </n-drawer>
</template>

<script setup lang="ts">
import { NDrawer } from "naive-ui";
import TitleButton from "../title-button/index.vue";
import { Alert16Regular } from "@vicons/fluent";
import { onMounted, ref } from "vue";

const show = ref(false);
const workbench = ref<HTMLElement | null>(null);

onMounted(() => {
    console.log(document.querySelectorAll('.monaco-grid-branch-node'))
    workbench.value = document.querySelectorAll('.monaco-grid-branch-node')[1] as HTMLElement;
});

const handleClick = () => {
	show.value = !show.value;
};
</script>


