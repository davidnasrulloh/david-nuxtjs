<script setup lang="ts">
import { ref, onMounted } from "vue";
import Navbar from "~/components/common/Navbar.vue";
import { getUserById } from "~/service/usersApi";
import type { UserItem } from "~/types/users";

useSeoMeta({
	title: "Details user",
});

const router = useRoute();
const user = ref<UserItem | null>(null);
const isLoading = ref(true);
const errorMessage = ref<string | null>(null);

const fetchUser = async () => {
	try {
		const response = await getUserById(String(router.params.id));
		user.value = response.data;
	} catch (error) {
		errorMessage.value = "Failed to load user.";
		console.error("Error fetching user:", error);
	} finally {
		isLoading.value = false;
	}
};

watch(
	user,
	(newUser) => {
		if (newUser) {
			useSeoMeta({
				title: `Details User - ${newUser.first_name} ${newUser.last_name}`,
			});
		}
	},
	{ immediate: true }
);

onMounted(() => {
	fetchUser();
});
</script>

<template>
	<Navbar />
	<section class="flex flex-col min-h-screen sm:px-16 md:px-32 lg:px-44 px-12 md:py-40 py-16 w-full justify-center items-center">
		<div v-if="isLoading" class="text-center">Loading...</div>
		<div v-else-if="errorMessage" class="text-center text-red-500">
			{{ errorMessage }}
		</div>
		<div v-else v-if="user" class="flex flex-col items-center gap-8 w-full">
			<div class="w-[12rem] mb-4">
				<img :src="user.avatar" alt="User Avatar" class="rounded-full" />
			</div>
			<div class="text-center">
				<h1 class="text-3xl font-bold">{{ user.first_name }} {{ user.last_name }}</h1>
				<p class="text-xl">{{ user.email }}</p>
			</div>
			<NuxtLink :to="`/dashboard/users`" class="mt-4 p-4 border cursor-pointer border-gray-200 text-xl rounded-md hover:bg-gray-100"> Back </NuxtLink>
		</div>
	</section>
</template>
