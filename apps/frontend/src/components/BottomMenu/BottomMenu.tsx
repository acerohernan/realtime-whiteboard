import {
  BookMarkedIcon,
  HelpCircleIcon,
  MenuIcon,
  MessagesSquareIcon,
  Settings2Icon,
  StickyNoteIcon,
  UserSquare2Icon,
  Users2Icon,
} from "lucide-react";
import { useState } from "react";
import {
  ButtonWrapper,
  Divider,
  IconButton,
  MenuItem,
  MenuWrapper,
  Wrapper,
} from "./styles";

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
  {
    label: "Settings",
    icon: <Settings2Icon />,
    component: <div>Settings</div>,
  },
  {
    label: "Help",
    icon: <HelpCircleIcon />,
    component: <div>Help</div>,
  },
];

const BottomMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Item>(menuItems[0]);

  const handleSelect = (item: Item) => () => {
    setSelectedOption(item);
    setOpenMenu(false);
  };

  return (
    <Wrapper>
      <div style={{ padding: "24px" }}>{selectedOption.component}</div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ButtonWrapper>
          <IconButton tabIndex={1}>{selectedOption.icon}</IconButton>
          <IconButton onClick={() => setOpenMenu(true)}>
            <MenuIcon />
          </IconButton>
        </ButtonWrapper>
        <MenuWrapper
          css={{
            transform: `translateY(${openMenu ? "0%" : "100%"})`,
          }}
        >
          {menuItems.map((item) => (
            <>
              {item.label === "Settings" && <Divider />}
              <MenuItem
                onClick={handleSelect(item)}
                status={
                  item.label === selectedOption.label ? "active" : undefined
                }
                key={item.label}
              >
                {item.icon}
                {item.label}
              </MenuItem>
            </>
          ))}
        </MenuWrapper>
      </div>
    </Wrapper>
  );
};

export default BottomMenu;
