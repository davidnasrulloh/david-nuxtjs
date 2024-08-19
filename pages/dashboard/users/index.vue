<script setup lang="ts">
import { ref, onMounted } from "vue";
import Navbar from "~/components/common/Navbar.vue";
import { getUserList } from "~/service/usersApi";
import type { IListUser } from "~/types/users";

definePageMeta({
	middleware: "auth",
});

const users = ref<IListUser>();
const isLoading = ref(true);
const page = ref(1);
const errorMessage = ref<string | null>(null);

const fetchUsers = async () => {
	try {
		const response = await getUserList(page.value);
		users.value = response;
	} catch (error) {
		errorMessage.value = "Failed to load users.";
		console.error("Error fetching users:", error);
	} finally {
		isLoading.value = false;
	}
};

onMounted(() => {
	fetchUsers();
});
</script>

<template>
	<Navbar />
	<section class="flex flex-col min-h-screen sm:px-16 md:px-32 lg:px-44 px-12 md:py-40 py-16 w-full justify-center items-center">
		<div v-if="errorMessage">
			<p>{{ errorMessage }}</p>
		</div>
		<div class="flex flex-wrap w-full justify-center gap-12 md:gap-20 my-16">
			<!-- Menampilkan pesan loading atau error jika diperlukan -->
			<div v-if="isLoading" class="text-center">Loading...</div>
			<div v-else-if="errorMessage" class="text-center text-red-500">
				{{ errorMessage }}
			</div>
			<!-- Menampilkan daftar pengguna jika ada -->
			<ul class="w-full list-none p-0 flex flex-col items-center gap-8">
				<li class="w-full flex flex-row items-center" v-for="user in users?.data" :key="user.id">
					<div class="w-[12rem]">
						<img :src="user.avatar" alt="" />
					</div>
					<NuxtLink
						:to="`/dashboard/users/${user.id}`"
						class="h-full p-8 flex flex-row items-center border cursor-pointer border-gray-200 text-xl lg:text-3xl rounded-md hover:bg-gray-100 w-full text-start"
					>
						{{ user.first_name }} {{ user.last_name }} - {{ user.email }}
					</NuxtLink>
				</li>
			</ul>
		</div>
	</section>
</template>
