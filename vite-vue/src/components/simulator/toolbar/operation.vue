<template>
	<n-dropdown trigger="click" :options="options" @select="handleSelect">
		<n-icon size="20">
			<PhoneTablet20Regular />
		</n-icon>
		<!-- <n-button type="primary" size="tiny">找个地方休息</n-button> -->
	</n-dropdown>
</template>

<script setup lang="ts">
import { NDropdown, NIcon } from "naive-ui";
import { PhoneTablet20Regular } from "@vicons/fluent";

const options = [
	{
		label: "滨海湾金沙，新加坡",
		key: "marina bay sands",
		disabled: true,
	},
	{
		label: "布朗酒店，伦敦",
		key: "brown's hotel, london",
	},
	{
		label: "亚特兰蒂斯巴哈马，拿骚",
		key: "atlantis nahamas, nassau",
	},
	{
		label: "比佛利山庄酒店，洛杉矶",
		key: "the beverly hills hotel, los angeles",
	},
];

const handleSelect = (key: string) => {
	console.log(key);
};
</script>
