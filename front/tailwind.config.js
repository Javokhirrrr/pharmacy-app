/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Tailwind barcha React fayllarini skanerlash
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // asosiy ko‘k rang
        secondary: "#f3f4f6", // fon ranglari uchun
      },
      spacing: {
        18: "4.5rem", // qo‘shimcha spacing misol
      },
    },
  },
  plugins: [],
};
