import { getToken } from "~/service/cookies";

export function isAuthenticated(): boolean {
	if (import.meta.client) {
		const token = getToken();
		return !!token;
	}
	return false;
}

export default defineNuxtRouteMiddleware((to, from) => {
	if (import.meta.client) {
		if (isAuthenticated()) {
			if (to.path === "/login") {
				return navigateTo("/dashboard");
			}
		} else {
			if (to.path !== "/login") {
				return navigateTo("/login");
			}
		}
	} else {
		console.warn("Middleware executed on server-side");
	}
});
