<template>
	<div class="project-new">
		<div class="project-new-header">新建项目</div>
		<div class="new-footer">
			<n-button size="small" type="primary" @click="cancel"> 取消 </n-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { NButton } from "naive-ui";

const emit = defineEmits<{
	(e: "close"): void;
}>();

const cancel = () => {
	emit("close");
};
</script>

<style lang="postcss" scoped>
.project-new {
	width: 100%;
	display: flex;
    flex: 1;
	flex-direction: column;
	justify-content: space-between;
    
	.new-footer {
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.n-button {
			margin-right: 20px;
		}
	}
}
</style>
