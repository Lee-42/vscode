<template>
	<n-layout-sider width="160" v-draggable>
		<div class="project-left">
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
	</n-layout-sider>
</template>

<script setup lang="ts">
import { NAvatar, NButton, NLayoutSider } from "naive-ui";
</script>

<style lang="postcss" scoped>
.project-left {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 10px;
	.left-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}
</style>
