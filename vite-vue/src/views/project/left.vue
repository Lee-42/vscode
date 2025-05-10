<template>
	<div class="project-left" v-draggable>
		<div class="left-header"></div>
		<div class="left-footer">
			<n-avatar size="small">
				<img
					src="https://avatars.githubusercontent.com/u/95179300?v=4&size=64"
				/>
			</n-avatar>
			<n-button size="small">退出</n-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import {  NAvatar } from "naive-ui";
</script>

<style lang="postcss" scoped>
.project-left {
	width: 160px;
	background: grey;
	padding: 20px 10px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.left-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}
</style>
