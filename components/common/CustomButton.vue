<script setup>
import { defineProps } from "vue";
import { buttonStyle } from "#imports"; // Adjust import path if necessary

const props = defineProps({
	title: String,
	containerStyle: String,
	handleClick: Function,
	btnType: String,
	textStyle: String,
	rightIcon: [String, Object], // Assumes rightIcon can be a string or a component
});
</script>

<template>
	<div whileHover="{ scale: 1.05, x: 0 }" transition="{ type: 'spring', stiffness: 400, damping: 10 }">
		<button
			class="flex py-5 px-16 text-xl text-white font-medium rounded-full text-center transition-all"
			:disabled="false"
			:type="btnType || 'button'"
			:class="containerStyle"
			@click="handleClick"
		>
			<span :class="['flex-1', textStyle]">
				{{ title }}
			</span>

			<div v-if="rightIcon" :class="[textStyle, 'my-auto ml-4']">
				<component :is="rightIcon" />
			</div>
		</button>
	</div>
</template>
