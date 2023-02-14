/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"brand-100": "rgb(255, 60, 0)",
				"brand-200": "rgb(200, 50, 0)",
				"brand-300": "rgb(150, 40, 0)",
				"brand-400": "rgb(100, 30, 0)",
				"brand-500": "rgb(75, 20, 0)",
			},
			screens: {
				xs: "480px",
			},
		},
	},
	plugins: [],
};
