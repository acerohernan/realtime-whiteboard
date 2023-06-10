import { createStitches } from "@stitches/react";

export const { styled, css, globalCss, keyframes, createTheme } =
  createStitches({
    theme: {
      colors: {
        gray400: "gainsboro",
        gray500: "lightgray",
      },
    },
    media: {
      bp2: "(min-width: 840px)",
    },
  });
