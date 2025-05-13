<template>
	<div class="simulator-container">
		<NSelect size="small" v-model="selectedSimulator" :options="simulators" />
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { NSelect} from 'naive-ui'

const selectedSimulator = ref('')
const simulators = ref([
	{ label: 'iOS 模拟器', value: 'ios' },
	{ label: 'Android 模拟器', value: 'android' }
])
</script>

<style lang="postcss" scoped>
.simulator-container {
	/* background: rgb(54, 39, 18); */
	background: var(--vscode-editor-background)
}
</style>
