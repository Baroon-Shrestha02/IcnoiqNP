import typography from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            lineHeight: "1.75", // improves line spacing
            letterSpacing: "0.02em", // subtle letter spacing
            color: theme("colors.gray.800"),
            p: {
              marginTop: "1.2em",
              marginBottom: "1.2em",
            },
            h1: {
              fontSize: theme("fontSize.4xl")[0],
              fontWeight: "700",
              lineHeight: "1.3",
              marginTop: "2.5rem",
              marginBottom: "1.5rem",
              letterSpacing: "0.01em",
            },
            h2: {
              fontSize: theme("fontSize.3xl")[0],
              fontWeight: "600",
              marginTop: "2rem",
              marginBottom: "1rem",
              letterSpacing: "0.01em",
            },
            h3: {
              marginTop: "1.8rem",
              marginBottom: "0.8rem",
            },
            li: {
              marginTop: "0.5em",
              marginBottom: "0.5em",
            },
            strong: {
              fontWeight: "700",
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
