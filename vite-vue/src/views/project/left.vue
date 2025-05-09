<template>
	<div class="project-left">
		<n-input class="search-input" size="small" placeholder="输入项目名称">
			<template #prefix>
				<n-icon :component="Search12Regular" />
			</template>
		</n-input>
		<div class="footer">
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
import { NInput, NIcon, NAvatar } from "naive-ui";
import { Search12Regular } from "@vicons/fluent";
</script>

<style lang="postcss" scoped>
.project-left {
	width: 160px;
	background: grey;
	padding: 30px 10px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}
</style>
