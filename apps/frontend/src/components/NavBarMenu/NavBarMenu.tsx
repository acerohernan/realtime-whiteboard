import { styled } from "@/theme";
import { Tooltip } from "@/components/Tooltip";
import {
  BookMarkedIcon,
  MessagesSquareIcon,
  StickyNoteIcon,
  UserSquare2Icon,
  Users2Icon,
} from "lucide-react";
import React, { useState } from "react";

type Item = {
  icon: React.ReactNode;
  label: string;
  component: React.ReactNode;
};

const menuItems: Array<Item> = [
  {
    label: "Messages",
    icon: <MessagesSquareIcon />,
    component: <div>Messages</div>,
  },
  {
    label: "Participants",
    icon: <Users2Icon />,
    component: <div>Participants</div>,
  },
  {
    label: "Rooms",
    icon: <UserSquare2Icon />,
    component: <div>Rooms</div>,
  },

  {
    label: "Notes",
    icon: <StickyNoteIcon />,
    component: <div>Notes</div>,
  },
  {
    label: "Library",
    icon: <BookMarkedIcon />,
    component: <div>Library</div>,
  },
  /*   {
    label: "Settings",
    icon: <Settings2Icon />,
    component: <div>Settings</div>,
  },
  {
    label: "Help",
    icon: <HelpCircleIcon />,
    component: <div>Help</div>,
  }, */
];

const Wrapper = styled("div", {
  display: "none",

  "@bp2": {
    display: "flex",
  },
});

const MenuWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderRight: "1px solid #eeeeee",
});

const MenuContainer = styled("div", {
  padding: "4px",
  display: "grid",
  gap: "8px",
});

const MenuItem = styled("button", {
  display: "flex",
  padding: "16px",
  borderRadius: "50%",
  position: "relative",
  transition: "0.2s all ease-in-out",
  color: "SlateGray",

  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },

  "&::after": {
    content: "",
    position: "absolute",
    height: "100%",
    backgroundColor: "Black",
    left: -4,
    top: 0,
  },

  variants: {
    status: {
      active: {
        color: "Black",
        "&::after": {
          width: "3px",
        },
      },
    },
  },
});

const ContentWrapper = styled("div", {
  width: "100%",
  padding: "24px",
});

const NavBarMenu = () => {
  const [selectedItem, setSelectedItem] = useState<Item>(menuItems[0]);

  const handleSelect = (item: Item) => () => {
    setSelectedItem(item);
  };

  return (
    <Wrapper>
      <MenuWrapper>
        <MenuContainer>
          {menuItems.map((item) => (
            <Tooltip content={item.label} key={item.label}>
              <MenuItem
                onClick={handleSelect(item)}
                status={
                  selectedItem.label === item.label ? "active" : undefined
                }
              >
                {item.icon}
              </MenuItem>
            </Tooltip>
          ))}
        </MenuContainer>
      </MenuWrapper>
      <ContentWrapper>{selectedItem.component}</ContentWrapper>
    </Wrapper>
  );
};

export default NavBarMenu;
