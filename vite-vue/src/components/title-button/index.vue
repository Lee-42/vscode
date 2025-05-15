<template>
	<div class="title-button" :class="{ active }">
		<n-button type="primary" :secondary="!active" size="small">
			<template #icon>
				<n-icon>
					<component :is="icon" />
				</n-icon>
			</template>
		</n-button>
		<div class="title" :class="{ active }">{{ title }}</div>
	</div>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import type { Component } from 'vue'

withDefaults(defineProps<{
	icon: Component
	title: string
	active?: boolean
}>(), {
	active: true
})
</script>

<style scoped>
.title-button {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
	cursor: pointer;
}

.title {
	font-size: 12px;
	transition: color 0.3s ease;
}

</style>         

