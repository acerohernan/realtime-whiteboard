import { globalCss } from ".";

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif",
  },
  button: {
    border: "none",
    outline: "none",
    background: "transparent",
    cursor: "pointer",
  },
});
