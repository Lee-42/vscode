<template>
  <div class="project-grid">
    <div v-for="(item, index) in items" :key="index" class="project-item">
      <slot :item="item"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: any[]
}>();
</script>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
}

.project-item {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.project-item:hover {
  transform: translateY(-4px);
}

@media (max-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
}
</style> 