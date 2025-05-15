<template>
	<div class="layout-controller">
		<n-avatar>
			<img src="https://avatars.githubusercontent.com/u/95179300?v=4&size=64" />
		</n-avatar>
		<TitleButton :icon="Phone24Regular" title="模拟器" :active="true"/>
		<TitleButton :icon="Code20Filled" title="编辑器" :active="true"/>
		<TitleButton :icon="WindowDevTools20Regular" title="调试器" :active="true"/>
		<n-switch v-model:value="value" />
	</div>
</template>

<script setup lang="ts">
import { NAvatar, NSwitch } from "naive-ui";
import TitleButton from "../title-button/index.vue";
import { Phone24Regular,Code20Filled, WindowDevTools20Regular } from '@vicons/fluent'
import { ref } from "vue";

const value = ref(false)
</script>

<style lang="postcss" scoped>
.layout-controller {
	display: flex;
	align-items: flex-start;
	
	div {
		margin-left: 20px;
	}
}
</style>
