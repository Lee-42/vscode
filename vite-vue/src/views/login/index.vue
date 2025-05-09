<template>
	<div class="login">
        <n-form ref="formRef" :inline="false" :model="formValue" :rules="rules">
		<n-form-item path="user.name">
			<n-input v-model:value="formValue.user.name" placeholder="输入用户名" />
		</n-form-item>
		<n-form-item path="user.password">
			<n-input v-model:value="formValue.user.password" placeholder="输入密码" />
		</n-form-item>
		<n-form-item>
			<n-button type="primary" block @click="handleLogin"> 登录 </n-button>
		</n-form-item>
	</n-form>
	<div class="login-footer">
		<n-checkbox> 自动登录 </n-checkbox>
		<div>
			<n-button style="margin-right: 10px" type="tertiary" size="small" @click="handleOfflineLogin">
				游客
			</n-button>
			<n-button type="error" size="small" @click="handleLogout">
				退出
			</n-button>
		</div>
	</div>
    </div>
</template>

<script setup lang="ts">
import {
	NForm,
	NFormItem,
	NCheckbox,
	NInput,
	NButton,
	type FormInst,
} from "naive-ui";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const formRef = ref<FormInst | null>(null);
const formValue = ref({
	user: {
		name: "",
		password: "",
	},
	phone: "",
});
const rules = {
	user: {
		name: {
			required: true,
			message: "请输入姓名",
			trigger: "blur",
		},
		password: {
			required: true,
			message: "请输入密码",
			trigger: ["input", "blur"],
		},
	},
};

const handleLogin = (e: Event) => {
	e.preventDefault();
	formRef.value?.validate((errors) => {
		if (!errors) {
		} else {
			console.log(errors);
		}
	});
};
const handleOfflineLogin = () => {
    (router as any).openwin('/project').then(() => {
        (router as any).closewin('/login')
    })
};

const handleLogout = () => {
	console.log("quitApp");
	(window as any).vscode.ipcRenderer.invoke("vscode:quitApp");
};
</script>

<style scoped>
.login {
    padding: 20px;
}
.login-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

:deep(.n-form-item) {
}
</style>
