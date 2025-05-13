<template>
	<div>
		<NButton type="primary" size="small" @click="handleClick">模拟器</NButton>
	</div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui';

const handleClick = () => {
	console.log('模拟器');
}
</script>
