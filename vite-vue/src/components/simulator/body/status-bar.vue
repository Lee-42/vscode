<template>
	<div class="status-bar" :style="statusBarStyle">
		<div class="status">
			<span class="time">{{ time }}</span>
			<div>
				<n-icon size="20">
					<Wifi224Filled />
				</n-icon>
				<n-icon size="20">
					<Battery1020Regular />
				</n-icon>
			</div>
		</div>
		<div class="normal" v-if="statusBarType === STATUS_BAR_TYPE.NORMAL"></div>
		<div class="notch" v-if="statusBarType === STATUS_BAR_TYPE.NOTCH"></div>
		<div
			class="dynamic-island"
			v-if="statusBarType === STATUS_BAR_TYPE.DYNAMIC_ISLAND"
		></div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { NIcon } from "naive-ui";
import { Wifi224Filled, Battery1020Regular } from "@vicons/fluent";
import { STATUS_BAR_TYPE } from "../header/devices";
import { useProjectStore } from "../../../stores/project";

const time = ref("12:00");

const projectStore = useProjectStore();

const device = computed(() => projectStore.project?.device);

const statusBarType = computed(
	() => projectStore.project?.device?.statusBarType
);

const statusBarStyle = computed(() => {
	const d = device.value;
	return {
		height: `${d?.statusHeight}px`,
		padding: d?.statusBarType === STATUS_BAR_TYPE.NORMAL ? "0 4px" : "0 28px",
	};
});
</script>

<style lang="postcss" scoped>
.status-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	width: 100%;
	box-sizing: border-box;
	.status {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 100%;
	}
	.normal {
	}
	.notch {
		width: 210px;
		height: 32px;
		background: black;
		position: absolute;
		transform: translateX(-50%);
		left: 50%;
		top: 0px;
		border-radius: 0 0 20px 20px;
	}
	.dynamic-island {
		width: 136px;
		height: 36px;
		background: black;
		position: absolute;
		transform: translateX(-50%);
		left: 50%;
		border-radius: 18px;
	}
}
</style>
