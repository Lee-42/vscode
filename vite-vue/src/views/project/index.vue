<template>
	<div class="project">
		<div class="project-left">
			<n-button @click="login">登录</n-button>
		</div>
		<div class="project-right">
			<div
				class="project-item"
				v-for="item in projects"
				:key="item.path"
				@click="openProject(item)"
			>
				{{ item.path }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { NButton } from "naive-ui";
import { useRouter } from "vue-router";

const projects = [
	{
		path: "/Users/lee/Project/小程序/project1",
	},
	{
		path: "/Users/lee/Project/小程序/project2",
	},
	{
		path: "/Users/lee/Project/小程序/project3",
	},
];

const router = useRouter();

const login = () => {
	(router as any).openwin("/login").then(() => {
		(router as any).closewin("/project");
	});
};

const openProject = (item: any) => {
	(window as any).vscode.ipcRenderer.invoke("vscode:openNewWindow", item.path);

	(router as any).closewin("/project").then(() => {

	});
};
</script>

<style scoped>
.project {
	display: flex;
	height: 100%;
}
.project-left {
	width: 200px;
	background: grey;
	display: flex;
	align-items: center;
	justify-content: center;
}
.project-right {
	flex: 1;
	background: rgb(73, 73, 73);
}

.project-item {
	background: purple;
	color: yellow;
	margin: 10px;
	cursor: pointer;
}
</style>
