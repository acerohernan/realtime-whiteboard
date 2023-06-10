import { styled } from "@/theme";

export const Wrapper = styled("div", {
  backgroundColor: "white",
  width: "100%",
  height: "65vh",
  display: "grid",
  gridTemplateRows: "1fr 60px",
  position: "relative",
  overflowY: "hidden",

  "@bp2": {
    display: "none",
  },
});

export const ButtonWrapper = styled("div", {
  borderTop: "1px solid rgba(235, 235, 235, 1)",
  padding: "8px 16px",
  width: "100%",
  display: "flex",
  gap: "4px",
});

export const IconButton = styled("button", {
  transition: "0.15s all ease-in-out",
  padding: "8px",
  borderRadius: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  "&:focus": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  "& svg": {
    width: "22px",
    height: "22px",
  },
});

export const MenuWrapper = styled("div", {
  position: "absolute",
  backgroundColor: "white",
  width: "100%",
  height: "100%",
  top: 0,
  transition: "0.3s all ease-in-out",
});

export const MenuItem = styled("button", {
  display: "flex",
  alignItems: "center",
  gap: "24px",
  padding: "16px 24px",
  fontWeight: "400",
  fontSize: "0.875rem",
  color: "SlateGray",
  transition: "0.2s all ease-in-out",
  "&:hover": {
    color: "black",
  },
  "& svg": {
    width: "22px",
    height: "22px",
  },

  variants: {
    status: {
      active: {
        color: "Black",
      },
    },
  },
});

export const Divider = styled("div", {
  width: "100%",
  height: "1px",
  borderTop: "1px solid rgba(235, 235, 235, 1)",
  margin: "16px 0",
});
