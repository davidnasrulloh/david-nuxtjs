<script setup lang="ts">
import Navbar from "~/components/common/Navbar.vue";

definePageMeta({
	middleware: "auth",
});
</script>

<template>
	<Navbar />
	<!-- <h1>Welcome to your dashboard</h1> -->
</template>
