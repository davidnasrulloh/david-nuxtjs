<script setup>
import { defineProps, defineEmits } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
	name: String,
	inputStyle: String,
	handleChange: Function,
	inputType: String,
	placeholder: String,
	modelValue: [String, Number],
	labelStyle: String,
	leadingIcon: String,
	isDisabled: Boolean,
	color: String,
	iconStyle: String,
	label: String,
	error: Boolean,
	errorText: String,
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
	<div :class="color + ' mb-5'">
		<label :for="name" :class="labelStyle + ' block mb-0 text-xl font-medium'">{{ label }}</label>
		<div class="relative mb-2">
			<div :class="iconStyle + ' absolute flex items-center'">
				<Icon :icon="leadingIcon" style="font-size: 20px" class="text-blue-700 font-bold" />
			</div>
			<input
				:disabled="isDisabled"
				:value="modelValue"
				@input="
					(e) => {
						emit('update:modelValue', e.target.value);
						handleChange(e);
					}
				"
				:type="inputType"
				:name="name"
				:id="name"
				:class="inputStyle"
				:placeholder="placeholder"
			/>
		</div>
		<p v-if="error" class="text-2xl text-red-600 font-normal">
			{{ errorText }}
		</p>
	</div>
</template>
