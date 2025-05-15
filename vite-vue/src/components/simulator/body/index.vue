<template>
	<div class="body">
		<div class="device" :style="deviceStyle">
			<img class="frame" :src="img" alt="" />
			<div class="screen" id="simulator-screen" :style="screenStyle">
				<StatusBar />
				<NavigationBar />
				<webview
					ref="webviewRef"
					class="webview"
					src="https://www.github.com"
				></webview>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { FileAccess } from "../../../../../src/vs/base/common/network.js";
import { resetCss } from "./resetCss";
import StatusBar from "./status-bar.vue";
import NavigationBar from "./navigation-bar.vue";
import type { CSSProperties } from 'vue';

const iphoneX = {
	screenWidth: 375,
	screenHeight: 812,
	winWidth: 430,
	winHeight: 860,
	padding: [24, 28, 0, 28],
	statusHeight: 40,
	borderRadius: "40px",
};
const scale = 0.75;

const webviewRef = ref<HTMLWebviewElement>();

onMounted(() => {
	webviewRef.value?.addEventListener("dom-ready", () => {
		webviewRef.value?.insertCSS(resetCss);
	});
});

const deviceStyle = computed<CSSProperties>(() => {
	return {
		width: `${iphoneX.winWidth}px`,
		height: `${iphoneX.winHeight}px`,
		transformOrigin: "50% 0px",
		padding: iphoneX.padding.map((p) => `${p}px`).join(" "),
		boxSizing: "border-box",
		transform: `scale(${scale})`,
	};
});

const screenStyle = computed<CSSProperties>(() => {
	return {
		width: `${iphoneX.screenWidth}px`,
		height: `${iphoneX.screenHeight}px`,
		borderRadius: iphoneX.borderRadius,
	};
});

const img = FileAccess.asFileUri(
	"vs/workbench/browser/parts/simulator/resources/iphone-x.png"
).path;
</script>

<style lang="postcss" scoped>
.body {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;

	.device {
		position: relative;
		margin-top: 22px;

		.frame {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
		}
		.screen {
			display: flex;
			flex-direction: column;
			position: relative;
			overflow: hidden;

			.navigation-bar {
				height: 33px;
			}
			.webview {
				flex: 1;
			}
		}
	}
}
</style>
