/** @type {import('tailwindcss').Config} */
export default {
	content: ["./components/**/*.{js,vue,ts}", "./layouts/**/*.vue", "./pages/**/*.vue", "./plugins/**/*.{js,ts}", "./app.vue", "./error.vue"],
	theme: {
		extend: {
			screens: {
				xsm: "280px",

				sm: "640px",
				// => @media (min-width: 640px) { ... }

				md: "768px",
				// => @media (min-width: 768px) { ... }

				lg: "1024px",
				// => @media (min-width: 1024px) { ... }

				xl: "1280px",
				// => @media (min-width: 1280px) { ... }

				"2xl": "1520px",
				// => @media (min-width: 1536px) { ... }

				"3xl": "1720px",
			},
		},
	},
	plugins: [],
};
