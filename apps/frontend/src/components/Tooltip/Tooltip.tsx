import { styled } from "@/theme";
import * as RadixTooltip from "@radix-ui/react-tooltip";

interface Props extends React.PropsWithChildren {
  content?: React.ReactNode;
}

const TooltipContent = styled(RadixTooltip.Content, {
  padding: "8px",
  borderRadius: "16px",
  backgroundColor: "#3C4048",
  color: "White",
  fontSize: "0.875rem",
});

const Tooltip: React.FC<Props> = ({ children, content }) => {
  return (
    <RadixTooltip.Provider delayDuration={100}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <TooltipContent sideOffset={10} side="right">
            {content ? content : "Tooltip"}
          </TooltipContent>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default Tooltip;
