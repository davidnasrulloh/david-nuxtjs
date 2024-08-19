<script setup lang="ts">
import CustomButton from "~/components/common/CustomButton.vue";
import Navbar from "~/components/common/Navbar.vue";

definePageMeta({
	middleware: "auth",
});

const router = useRouter();

function handletoListUser() {
	router.push("/dashboard/users");
}
</script>

<template>
	<Navbar />
	<section class="flex flex-row min-h-screen sm:px-16 md:px-32 lg:px-44 px-12 md:py-44 py-16 w-full justify-center items-center">
		<div class="xl:w-1/4 lg:w-1/2 mt-10">
			<CustomButton
				:handleClick="handletoListUser"
				title="View List User"
				textStyle="text-2xl font-semibold"
				containerStyle="w-full !text-blue-500 bg-transparant border-2 border-blue-400 hover:bg-blue-100"
				btnType="submit"
			/>
		</div>
	</section>
</template>
