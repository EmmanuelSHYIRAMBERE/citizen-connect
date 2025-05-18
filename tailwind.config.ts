const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Rwandan flag colors
        "rw-blue": "#00A1DE",
        "rw-yellow": "#FAD201",
        "rw-green": "#00A651",
        "rw-sun": "#FFD100",
        // Customizing the default palette
        primary: {
          DEFAULT: "#00A1DE", // Rwandan blue
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#FAD201", // Rwandan yellow
          foreground: "#000000",
        },
        accent: {
          DEFAULT: "#00A651", // Rwandan green
          foreground: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};

export default config;
