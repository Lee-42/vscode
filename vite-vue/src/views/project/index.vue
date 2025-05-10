<template>
	<div class="project">
		<ProjectLeft />
		<ProjectRight v-show="!isNew" @newProject="isNew = true" />
		<ProjectNew v-show="isNew" @close="isNew = false" />
	</div>
</template>

<script setup lang="ts">
import ProjectLeft from "./left.vue";
import ProjectRight from "./right.vue";
import ProjectNew from "./new.vue";
import { ref } from "vue";

const isNew = ref(false);
</script>

<style scoped>
.project {
	display: flex;
	height: 100%;
}

</style>
