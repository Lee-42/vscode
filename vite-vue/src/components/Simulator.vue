<template>
  <div class="simulator">
    <div class="simulator-header">
      <select class="device-select" v-model="selectedDevice">
        <option v-for="device in devices" :key="device.id" :value="device.id">
          {{ device.name }}
        </option>
      </select>
    </div>
    <div class="simulator-body">
      <div class="simulator-status-bar"></div>
      <div class="simulator-content">
        <slot></slot>
      </div>
      <div class="simulator-navigation-bar"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const devices = [
  { id: 'iphone-14', name: 'iPhone 14' },
  { id: 'iphone-14-pro', name: 'iPhone 14 Pro' },
  { id: 'ipad-pro', name: 'iPad Pro' }
]

const selectedDevice = ref('iphone-14')
</script>

<style scoped>
.simulator {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--vscode-editor-background);
}
.simulator-header {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid var(--vscode-panel-border);
}
.device-select {
  width: 140px;
  height: 24px;
  background-color: var(--vscode-dropdown-background);
  color: var(--vscode-dropdown-foreground);
  border: 1px solid var(--vscode-dropdown-border);
}
.simulator-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.simulator-status-bar {
  height: 24px;
  background-color: var(--vscode-panel-background);
}
.simulator-content {
  flex: 1;
  overflow: auto;
  position: relative;
}
.simulator-navigation-bar {
  height: 44px;
  background-color: var(--vscode-panel-background);
}
</style>
