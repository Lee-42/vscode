<template>
	<TitleButton
		:icon="CloudArrowUp32Regular"
		title="上传"
		@click="handleClick"
	/>
	<n-modal
		v-model:show="show"
		title="上传"
		:mask-closable="false"
		:z-index="6"
		class="uploader-modal"
		:style="{
			width: '540px',
		}"
	>
		<div class="modal-content">
			<n-card>
				<n-form
					ref="formRef"
					:model="formValue"
					:rules="rules"
					label-placement="left"
					size="small"
					label-width="auto"
				>
					<n-form-item label="AppID" path="appId">
						<n-input v-model:value="formValue.appId" placeholder="请输入AppID" />
					</n-form-item>
					<n-form-item label="版本号" path="version">
						<n-input v-model:value="formValue.version" placeholder="请输入版本号" />
					</n-form-item>
					<n-form-item label="版本描述" path="description">
						<n-input
							v-model:value="formValue.description"
							type="textarea"
							placeholder="请输入版本描述"
						/>
					</n-form-item>
				</n-form>
				<div class="button-group">
					<n-button size="small" @click="show = false">取消</n-button>
					<n-button size="small" type="primary" @click="handleSubmit">确认</n-button>
				</div>
			</n-card>
		</div>
	</n-modal>
</template>

<script setup lang="ts">
import TitleButton from "../title-button/index.vue";
import { NButton, NModal, NForm, NFormItem, NInput, NCard } from "naive-ui";
import { CloudArrowUp32Regular } from "@vicons/fluent";
import { onMounted, ref } from "vue";
import type { FormInst } from "naive-ui";

const show = ref(false);
const workbench = ref<HTMLElement | null>(null);
const formRef = ref<FormInst | null>(null);

const formValue = ref({
	appId: "",
	version: "",
	description: "",
});

const rules = {
	appId: {
		required: true,
		message: "请输入AppID",
		trigger: "blur",
	},
	version: {
		required: true,
		message: "请输入版本号",
		trigger: "blur",
	},
	description: {
		required: true,
		message: "请输入版本描述",
		trigger: "blur",
	},
};

onMounted(() => {
	workbench.value = document.querySelectorAll(
		".monaco-grid-branch-node"
	)[1] as HTMLElement;
});

const handleClick = () => {
	show.value = true;
};

const handleSubmit = () => {
	formRef.value?.validate((errors) => {
		if (!errors) {
			// TODO: 处理表单提交
			console.log(formValue.value);
			show.value = false;
		}
	});
};
</script>

<style lang="postcss">
.button-group {
	display: flex;
	justify-content: flex-end;
	gap: 12px;
	margin-top: 24px;
}

.uploader-modal {
	:deep(.n-modal-body) {
		padding: 20px;
	}
}

.modal-content {
	display: flex;
	flex-direction: column;
}
</style>
