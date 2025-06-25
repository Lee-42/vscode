<template>
	<div class="navigation-bar">
		<n-icon size="26">
			<ChevronLeft24Filled />
		</n-icon>
		<div class="opra">
			<n-icon size="20" @click="handleMore">
				<MoreHorizontal20Regular />
			</n-icon>
			<n-icon size="16" @click="handleDismiss">
				<Dismiss48Regular />
			</n-icon>
		</div>
	</div>
	<n-drawer v-model:show="showMore" placement="bottom" to="#simulator-screen">
		<n-drawer-content title="斯通纳" style="background-color: white">
		</n-drawer-content>
	</n-drawer>
</template>

<script setup lang="ts">
import { NIcon, NDrawer, NDrawerContent } from "naive-ui";
import {
	ChevronLeft24Filled,
	MoreHorizontal20Regular,
	Dismiss48Regular,
} from "@vicons/fluent";
import { ref } from "vue";
const showMore = ref(false);

const handleMore = () => {
	console.log("more");
	showMore.value = true;
};

const handleDismiss = () => {
	console.log("dismiss");
};
</script>

<style lang="postcss" scoped>
.navigation-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 38px;
	padding: 0 10px;
	box-sizing: border-box;

	.opra {
		width: 80px;
		height: 28px;
		border-radius: 14px;
		box-sizing: border-box;
		border: 1px solid grey;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10px;
		cursor: pointer;
	}
}
</style>
