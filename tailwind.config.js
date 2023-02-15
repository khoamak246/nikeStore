/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        login:
          "url('https://images.pexels.com/photos/1698359/pexels-photo-1698359.jpeg?auto=compress&cs=tinysrgb&w=600')",
        becomeMember:
          "url('https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1167,c_limit/5e4a0ef7-a2c9-483a-8e5b-45d8277db19d/nike-just-do-it.jpg')",
        becomeMember2:
          "url('https://static.nike.com/a/images/f_auto/dpr_1.5,cs_srgb/h_686,c_limit/cca8fe4e-29bd-4357-b3ba-c3b12618426f/nike-just-do-it.jpg')",
      },
      fontFamily: {
        lobster: ['"Lobster"', "cursive"],
      },
    },
    screens: {
      xxl: { max: "1280px" },
      xl: { max: "1200px" },
      lg: { max: "992px" },
      md: { max: "768px" },
      sm: { max: "551px" },
      xsm: { max: "376px" },
      xxsm: { max: "281px" },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
