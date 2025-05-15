<template>
	<div class="status-bar">
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
		<div class="notch"></div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NIcon } from "naive-ui";
import { Wifi224Filled, Battery1020Regular } from "@vicons/fluent";

const time = ref("12:00");
</script>

<style lang="postcss" scoped>
.status-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	width: 100%;
	height: 34px;
	padding: 0 28px;
	box-sizing: border-box;
	.status {
		display: flex;
		align-items: center;
        justify-content: space-between;
		width: 100%;
		height: 100%;
	}
	.notch {
		width: 210px;
		height: 100%;
		background: black;
		position: absolute;
		transform: translateX(-50%);
		left: 50%;
		border-radius: 0 0 20px 20px;
	}
}
</style>
