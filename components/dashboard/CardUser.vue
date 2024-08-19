<script setup lang="ts">
import type { UserItem } from "~/types/users";

const props = defineProps({
	user: {
		type: Object as () => UserItem,
		required: true,
	},
});
</script>

<template>
	<li class="w-full flex flex-row items-center">
		<div class="w-[12rem]">
			<img :src="user.avatar" alt="User Avatar" />
		</div>
		<NuxtLink
			:to="`/dashboard/users/${user.id}`"
			class="h-full p-8 flex flex-row items-center border cursor-pointer border-gray-200 text-xl lg:text-3xl rounded-md hover:bg-gray-100 w-full text-start"
		>
			{{ user.first_name }} {{ user.last_name }} - {{ user.email }}
		</NuxtLink>
	</li>
</template>
