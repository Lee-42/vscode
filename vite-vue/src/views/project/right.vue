<template>
	<div class="project-right">
		<div class="project-header">
			<n-button size="small" type="primary">
                导入
			</n-button>
			<n-button size="small" type="primary">
				管理
			</n-button> 
		</div>
		<div class="project-body">
			<div class="project-item project-new" @click="newProject">
				<n-icon size="36" :component="Add12Regular" />
			</div>
			<div v-for="(item, index) in 9" :key="index" class="project-item">
				<slot :item="item"></slot>
			</div>
		</div>
		<div class="project-footer">
            <n-button size="small" type="primary">打开</n-button>
        </div>
	</div>
</template>

<script setup lang="ts">
import { NIcon, NButton } from "naive-ui";
import { Add12Regular } from "@vicons/fluent";

const emit = defineEmits<{
	(e: "newProject"): void;
}>();

const newProject = () => {
	emit("newProject");
};
</script>

<style lang="postcss" scoped>
.project-right {
	display: flex;
    flex: 1;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;

	.project-header {
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.n-button {
			margin-right: 20px;
		}
	}

	.project-body {
		flex: 1;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 25px;
		padding: 20px 30px;
		width: 100%;
		overflow-y: overlay;
		box-sizing: border-box;

		.project-new {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.project-item {
			height: 240px;
			background: grey;
			border-radius: 8px;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
			transition: transform 0.2s ease;
		}
	}

	.project-footer {
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.n-button {
			margin-right: 20px;
		}
	}
}

.project-item:hover {
	transform: translateY(-4px);
}
</style>
