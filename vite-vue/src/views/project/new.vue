<template>
	<div class="project-new">
		<div class="new-header" v-draggable>新建项目</div>
		<div class="new-body">
			<n-form
				ref="formRef"
				:label-width="80"
				:model="form"
				:rules="rules"
				size="small"
			>
				<n-form-item label="项目名称" path="projectName">
					<n-input
						v-model:value="form.projectName"
						placeholder="输入项目名称"
					/>
				</n-form-item>
				<n-form-item label="项目路径" path="projectPath">
					<n-input-group>
						<n-input
							v-model:value="form.projectPath"
							placeholder="输入项目名称"
						/>
						<n-button type="primary" @click="handleSelectPath">
							<n-icon :component="FolderOpen20Filled"></n-icon>
						</n-button>
					</n-input-group>
				</n-form-item>
				<n-form-item label="appId" path="appId">
					<n-input v-model:value="form.appId" placeholder="请输入appId" />
				</n-form-item>
				<n-form-item> </n-form-item>
			</n-form>
		</div>
		<div class="new-footer">
			<n-button size="small" type="primary" @click="handleValidateClick">
				完成
			</n-button>
			<n-button size="small" @click="cancel"> 取消 </n-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import {
	NButton,
	NForm,
	NFormItem,
	NInput,
	NInputGroup,
	NIcon,
	useMessage,
} from "naive-ui";
import { useProjectStore } from "../../stores/project.ts";
import { FolderOpen20Filled } from "@vicons/fluent";
import { basename } from "path-browserify";
import { ref } from "vue";
import type { ProjectProps } from "../../types";
import devices from "../../components/simulator/body/devices";
import { CommonChannel } from "../../../../src/custom/ipc/channel";

const projectStore = useProjectStore();
const projects = ref(projectStore.items);
const message = useMessage();
const form = ref({
	projectName: "",
	projectPath: "",
	appId: "",
});

const rules = ref({
	projectName: {
		required: true,
		message: "请输入项目名称",
	},
	projectPath: {
		required: true,
		message: "请输入项目路径",
	},
	appId: {
		required: true,
		message: "请输入appId",
	},
});
const formRef = ref();

const handleValidateClick = (e: MouseEvent) => {
	e.preventDefault();
	formRef.value?.validate((errors: any) => {
		if (!errors) {
			const projectName = form.value.projectName.trim();
			if (
				projects.value.length > 0 &&
				projects.value.find(
					(item: ProjectProps) => item.projectName === projectName
				)
			) {
				message.error("项目已存在");
				return;
			}
			projectStore.createProject({
				projectName: form.value.projectName,
				projectPath: form.value.projectPath,
				appId: form.value.appId,
				enginePath: "",
				projectType: "",
				device: devices[0],
			});
		} else {
			console.log(errors);
		}
	});
};

const handleSelectPath = () => {
	(window as any).api.ipcRenderer
		.invoke(CommonChannel.OPEN_FOLDER)
		.then((result: string) => {
			console.log("result: ", result);
			if (!form.value.projectName) {
				form.value.projectName = basename(result);
			}
			form.value.projectPath = result;
		});
};

const emit = defineEmits<{
	(e: "close"): void;
}>();

const cancel = () => {
	formRef.value?.restoreValidation();
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

	.new-header {
		font-size: 16px;
		font-weight: 600;
		letter-spacing: 0.1em;
		padding: 10px 20px;
	}

	.new-body {
		padding: 0px 20px;
	}

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
