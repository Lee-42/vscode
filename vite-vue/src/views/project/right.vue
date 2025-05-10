<template>
	<div class="project-right">
		<div class="project-header">
			<n-input size="small" placeholder="输入项目名称" v-model="search">	</n-input>
			<div>
				<n-button size="small" type="primary"> 导入 </n-button>
				<n-button size="small" type="primary" v-if="!manage" @click="manage = true"> 管理 </n-button>
				<n-button size="small" type="primary" v-if="manage" @click="cannelManage"> 取消 </n-button>
			</div>
			</div>
		<div class="project-body">
			<div class="project-item project-new" @click="newProject">
				<n-icon size="36" :component="Add12Regular" />
			</div>
			<div
				v-for="(item, index) in projects"
				:key="index"
				:class="['project-item', manage ? 'project-item-manage' : '', selectedProjects.includes(item) ? 'project-item-selected' : '']"
				@dblclick="openProject(item)"
				@click="selectProject(item)"
			>
				{{ item.projectName }}
			</div>
		</div>
		<div class="project-footer">
			<n-button size="small" v-if="selectedProjects.length > 0" @click="deleteProject" >删除</n-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { NIcon, NButton, useDialog, NInput } from "naive-ui";
import { Add12Regular } from "@vicons/fluent";
import { useProjectStore } from "../../stores/project.ts";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const projectStore = useProjectStore();
const projects = ref(projectStore.items);
const selectedProjects = ref<any[]>([]);
const manage = ref(false)
const dialog = useDialog();
const search = ref('');

watch(search, (value: string) => {
	projects.value = projectStore.items.filter((item) => item.projectName.includes(value));
})

const cannelManage = () => {
	manage.value = false;
	selectedProjects.value = [];
}

const emit = defineEmits<{
	(e: "newProject"): void;
}>();

const newProject = () => {
	emit("newProject");
};

const openProject = (item: any) => {
	(window as any).vscode.ipcRenderer.invoke("vscode:openNewWindow", item.projectPath).then(() => {
		(router as any).closewin("/project");
	})
};

const selectProject = (item: any) => {
	if(!manage.value) return;
	if(selectedProjects.value.includes(item)) {
		selectedProjects.value = selectedProjects.value.filter((item) => item !== item);
	} else {
		selectedProjects.value.push(item);
	}
};

const deleteProject = () => {
	dialog.warning({
		title: '提示',
		content: '确定删除选中的项目吗？',
		positiveText: '确定',
		negativeText: '取消',
		onPositiveClick: () => {
			selectedProjects.value.forEach((item) => {
				projectStore.deleteProject(item.id);
			});
			cannelManage();
		}
	})
}
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
		padding: 0 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.n-input {
			width: 200px;
		}
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
			border: 2px solid transparent;
			cursor: pointer;


			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 16px;
			font-weight: 600;
		}

		.project-item-manage {
			background: rgb(71, 71, 71);
		}

		.project-item-selected {
			border: 2px solid #7fe7c4;
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
	transform: scale(1.02);
}
</style>
