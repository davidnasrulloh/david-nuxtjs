<script setup lang="ts">
import { ref, onMounted, computed, Suspense } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import Loading from "@/components/Loading.vue";
import HelmetComponent from "@/components/HelmetComponent.vue";
import CustomEmptyResult from "@/components/emptystate/CustomEmptyResult.vue";
import CardUser from "@/components/CardUser.vue";
import Navbar from "../common/Navbar.vue";

const store = useStore();
const router = useRouter();
const isOnline = useOnlineStatus();

const status = computed(() => store.state.users.status);
const dataUserList = computed(() => store.state.users.data);
const { data: users, page, total_pages: totalPages } = dataUserList.value;

const pageNumber = ref(page || 1);

onMounted(() => {
	if (isOnline.value && status.value === "idle") {
		fetchUsers(pageNumber.value);
	}
});

const fetchUsers = async (page: number) => {
	try {
		await store.dispatch("fetchUsers", page);
	} catch (error) {
		console.error("Error fetching users:", error);
	}
};

const handlePageChange = (newPage: number) => {
	pageNumber.value = newPage;
	fetchUsers(newPage);
};

const buttonTryAgainClick = () => {
	router.push("/users");
	window.location.reload();
};
</script>

<template>
	<div>
		<div class="flex flex-wrap w-full justify-center gap-10 mt-52">
			<div class="flex flex-row gap-10">
				<button
					v-for="index in totalPages"
					:key="index"
					@click="handlePageChange(index)"
					:disabled="pageNumber === index"
					class="text-3xl text-gray-700 font-medium p-4 bg-gray-100 border-4 border-gray-100 w-20 h-20 rounded-full disabled:bg-blue-100 disabled:border-blue-200 hover:border-gray-200"
				>
					{{ index }}
				</button>
			</div>
		</div>

		<Loading v-if="status === 'loading'" />

		<div v-if="status === 'success'" class="flex flex-wrap w-full justify-center gap-12 md:gap-20 my-16">
			<Suspense>
				<template #default>
					<CardUser v-for="user in users" :key="user.id" :user="user" />
				</template>
				<template #fallback>
					<Loading />
				</template>
			</Suspense>
		</div>

		<CustomEmptyResult v-if="!isOnline" title="Lost Your Connection" @buttonClick="buttonTryAgainClick" />
	</div>
</template>
