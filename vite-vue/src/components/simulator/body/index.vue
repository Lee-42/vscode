<template>
	<div class="simulator-body">
		<div class="device" :style="deviceStyle">
			<img class="frame" :src="device?.frame" alt="" />
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
import { resetCss } from "./resetCss";
import StatusBar from "./status-bar.vue";
import NavigationBar from "./navigation-bar.vue";
import type { CSSProperties } from "vue";
import { useProjectStore } from "../../../stores/project";

const projectStore = useProjectStore();

const scale = computed(() => projectStore.project?.scale);

const device = computed(() => {
	const d = projectStore.project?.device;
	if (d) {
		return {
			...d,
		};
	} else {
		return null;
	}
});

const webviewRef = ref<HTMLWebviewElement>();

onMounted(() => {
	webviewRef.value?.addEventListener("dom-ready", () => {
		webviewRef.value?.insertCSS(resetCss);
	});
});

const deviceStyle = computed<CSSProperties>(() => {
	const d = device.value;
	if (d) {
		return {
			width: `${d.winWidth}px`,
			height: `${d.winHeight}px`,
			transformOrigin: "50% 0px",
			padding: d.padding.map((p) => `${p}px`).join(" "),
			boxSizing: "border-box",
			transform: `scale(${scale.value})`,
		};
	} else {
		return {};
	}
});

const screenStyle = computed<CSSProperties>(() => {
	const d = device.value;
	if (d) {
		return {
			width: `${d.screenWidth}px`,
			height: `${d.screenHeight}px`,
			borderRadius: d.borderRadius,
		};
	} else {
		return {};
	}
});

// const img = FileAccess.asFileUri(
// 	"vs/workbench/browser/parts/simulator/resources/iphone-x.png"
// ).path;
// console.log("img: ", img);
// /Users/lee/Project/vscode/out/vs/workbench/browser/parts/simulator/resources/iphone-x.png
// const img = "../../../assets/images/frame/iphone-x.png";
</script>

<style lang="postcss" scoped>
.simulator-body {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	height: 100%;
	overflow-y: auto;

	.device {
		position: relative;
		margin-top: 20px;

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
			background-color: white;

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
