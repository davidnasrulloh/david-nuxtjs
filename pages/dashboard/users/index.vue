<script setup lang="ts">
definePageMeta({
	middleware: "auth",
});
</script>

<template>
	<header>
		<nav>
			<ul>
				<li><NuxtLink to="/">Home</NuxtLink></li>
				<li><NuxtLink to="/dashboard/users/1">Post 1</NuxtLink></li>
				<li><NuxtLink to="/dashboard/users/2">Post 2</NuxtLink></li>
			</ul>
		</nav>
	</header>
</template>
