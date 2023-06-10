import { BottomMenu } from "@/components/BottomMenu";
import { NavBarMenu } from "@/components/NavBarMenu";
import { Whiteboard } from "@/components/Whiteboard";
import { styled } from "@/theme";

const Wrapper = styled("div", {
  display: "grid",

  "@bp2": {
    gridTemplateColumns: "380px 1fr",
  },
});

const HomeView = () => {
  return (
    <Wrapper>
      <NavBarMenu />
      <Whiteboard />
      <BottomMenu />
    </Wrapper>
  );
};

export default HomeView;
