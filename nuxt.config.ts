import type { NuxtPage } from "nuxt/schema";

export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	css: ["~/assets/css/main.css"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	hooks: {
		"pages:extend"(pages) {
			function setMiddleware(pages: NuxtPage[]) {
				for (const page of pages) {
					// Hanya tambahkan middleware untuk halaman di bawah rute dashboard
					if (page.path?.startsWith("/dashboard")) {
						page.meta ||= {};

						page.meta.middleware = ["auth"];

						if (page.children) {
							setMiddleware(page.children);
						}
					}
				}
			}
			setMiddleware(pages);
		},
	},
});
