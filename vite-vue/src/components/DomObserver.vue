<template>
  <div class="dom-observer">
    <h2>DOM 元素创建监听示例</h2>
    <button @click="addNewElement">添加新元素</button>
    <div id="target-container">
      <!-- 这里将动态添加元素 -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

// 创建 MutationObserver 实例
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) { // 确保是元素节点
          console.log('新元素被创建:', node)
          // 这里可以对新创建的元素进行操作
          node.style.backgroundColor = '#e0e0e0'
        }
      })
    }
  })
})

// 添加新元素的函数
const addNewElement = () => {
  const container = document.getElementById('target-container')
  const newElement = document.createElement('div')
  newElement.textContent = '新创建的元素'
  newElement.className = 'new-element'
  container.appendChild(newElement)
}

onMounted(() => {
  // 开始观察目标容器
  const targetContainer = document.getElementById('target-container')
  observer.observe(targetContainer, {
    childList: true, // 观察子节点的添加或删除
    subtree: true    // 观察所有后代节点
  })
})

onUnmounted(() => {
  // 组件卸载时停止观察
  observer.disconnect()
})
</script>

<style scoped>
.dom-observer {
  padding: 20px;
}

button {
  margin-bottom: 20px;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

#target-container {
  border: 1px solid #ccc;
  padding: 20px;
  min-height: 100px;
}

.new-element {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style> 