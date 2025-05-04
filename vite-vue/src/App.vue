<template>
	<n-button type="primary" @click="callVscode()">调起vscode</n-button>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'

const callVscode = () => {
	console.log('call vscode');
	(window as any).vscode.ipcRenderer.invoke('vscode:openNewWindow', '/Users/lee/Project/ide-重构/ide')
}
</script>

<style scoped>

</style>
