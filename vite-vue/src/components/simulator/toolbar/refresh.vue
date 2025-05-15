<template>  
    <n-icon size="20" @click="handleClick"> 
        <ArrowClockwise16Regular />
    </n-icon>
</template>

<script setup lang="ts">
import { NIcon } from "naive-ui";
import { ArrowClockwise16Regular } from "@vicons/fluent";

const handleClick = () => {
    console.log("refresh");
};
</script>