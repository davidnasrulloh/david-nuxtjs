<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRoute } from "vue-router";
import davidImg from "~/assets/images/img_david.jpg"; // Adjust import paths if necessary
import { styles } from "#imports"; // Adjust import paths if necessary
import { isAuthenticated } from "~/middleware/auth";
import CustomButton from "./CustomButton.vue";
import { removeCredential } from "~/service/cookies";

const props = defineProps({
	backgroundStyle: String,
});

const nav = ref(false);
const route = useRoute();

const openNavHandler = () => {
	nav.value = !nav.value;
};

const scrollToTop = () => {
	window.scrollTo(0, 0);
};

function handleClickIfNotLogin(event: Event) {
	event.preventDefault();
	alert("Need login!");
}
</script>

<template>
	<nav>
		<!-- Mobile Navbar -->
		<section :class="['mobile-navbar', nav ? 'open-nav' : '', 'px-28']">
			<div class="flex flex-row justify-center w-full mb-10">
				<div class="flex flex-row mr-10">
					<img :src="davidImg" class="w-20 rounded-full mr-3" />
					<p class="my-auto text-3xl sm:text-[20px] font-semibold">David Nasrulloh</p>
				</div>
				<div @click="openNavHandler" class="my-auto">
					<Icon icon="ri:close-line" class="text-4xl text-blue-500" />
				</div>
			</div>
			<ul class="mobile-navbar_links sm:w-1/2 w-full">
				<li v-if="!isAuthenticated()" class="w-full">
					<NuxtLink to="/login" :class="{ 'font-bold': $route.path === '/login' }">Login</NuxtLink>
				</li>
				<li class="w-full">
					<NuxtLink v-if="isAuthenticated()" to="/dashboard" :class="{ 'font-bold': $route.path === '/dashboard' }"> Dashboard </NuxtLink>
					<NuxtLink v-if="!isAuthenticated()" @click.prevent="handleClickIfNotLogin" class="cursor-pointer text-blue-500"> Dashboard </NuxtLink>
				</li>
				<li class="w-full">
					<NuxtLink to="https://github.com/davidnasrulloh" target="_blank">My Github</NuxtLink>
				</li>
			</ul>
			<div v-if="isAuthenticated()" @click="removeCredential">
				<CustomButton title="Logout" textStyle="text-2xl font-semibold" containerStyle="w-full bg-red-500 hover:bg-red-400" btnType="submit" />
			</div>
		</section>

		<!-- Desktop View -->
		<div :class="['navbar', backgroundStyle, styles.paddingX]">
			<router-link to="/" @click.native="scrollToTop">
				<div class="flex flex-row">
					<img :src="davidImg" class="w-20 rounded-full mr-4 md:mr-8" />
					<p class="my-auto text-[24px] md:text-[28px] text-blue-900"><span class="font-bold">David</span> Nasrulloh</p>
				</div>
			</router-link>
			<ul class="navbar_links text-2xl xl:w-3/5 2xl:w-2/3 gap-10 font-medium md:pl-0 pl-10">
				<li v-if="!isAuthenticated()" class="mr-10">
					<NuxtLink to="/login" :class="{ 'font-bold': $route.path === '/login' }">Login</NuxtLink>
				</li>
				<li class="mr-10">
					<NuxtLink v-if="isAuthenticated()" to="/dashboard" :class="{ 'font-bold': $route.path === '/dashboard' }"> Dashboard </NuxtLink>
					<NuxtLink v-if="!isAuthenticated()" @click.prevent="handleClickIfNotLogin" class="cursor-pointer text-blue-500"> Dashboard </NuxtLink>
				</li>
				<li class="mr-10">
					<NuxtLink to="https://github.com/davidnasrulloh" target="_blank">My Github</NuxtLink>
				</li>
			</ul>

			<div v-if="isAuthenticated()" @click="removeCredential">
				<CustomButton title="Logout" textStyle="text-2xl font-semibold" containerStyle="w-full bg-red-500 hover:bg-red-400" btnType="submit" />
			</div>

			<div class="mobile-hamb" @click="openNavHandler">
				<Icon icon="ep:menu" class="text-4xl text-blue-500" />
			</div>
		</div>
	</nav>
</template>
