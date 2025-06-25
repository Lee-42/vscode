<template>
    <TitleButton
		:icon="Bug16Regular"
		title="真机调试"
		@click="handleClick"
	/>
</template>

<script setup lang="ts">
import TitleButton from "../title-button/index.vue";
import { Bug16Regular } from "@vicons/fluent";

const handleClick = () => {
	console.log("remote debug");
};
</script>