<template>
	<n-layout class="login" v-draggable>
		<span class="title">开发者工具</span>
		<span class="version">v1.0.0</span>
		<img class="qrcode" src="../../assets/qrcode.jpg" alt="qrcode" />
		<n-button class="visitor" size="large" text @click="justVisitor"
			>游客模式</n-button
		>
	</n-layout>
</template>

<script setup lang="ts">
import { NButton, NLayout } from "naive-ui";
import { useRouter } from "vue-router";

const router = useRouter();

const justVisitor = () => {
	(router as any).openwin("/project").then(() => {
		(router as any).closewin("/login");
	});
};
</script>

<style lang="postcss" scoped>
.login {
	height: 100%;
	padding: 55px;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	position: relative;

	.title {
		font-size: 20px;
		font-weight: bold;
	}
	.version {
		font-size: 12px;
	}
	.qrcode {
		width: 200px;
		margin: 0 auto;
		margin-top: 40px;
	}
	.visitor {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
	}
}
</style>
