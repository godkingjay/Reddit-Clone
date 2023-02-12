/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"brand-100": "#ff3c00",
			},
			screens: {
				xs: "480px",
			},
		},
	},
	plugins: [],
};
