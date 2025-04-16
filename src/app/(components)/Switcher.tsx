import { Switch } from "@nextui-org/react";
import { tv } from "tailwind-variants";

export function Switcher({
  label,
  desc,
  isSelected,
  onValueChange,
}: {
  label: string;
  desc: string;
  isSelected: boolean;
  onValueChange: (v?: boolean) => void;
}) {
  return (
    <Switch
      isSelected={isSelected}
      onValueChange={onValueChange}
      classNames={{
        base: switchV({ state: isSelected ? "checked" : "unchecked" }),
      }}
    >
      <div className={labelV({ state: isSelected ? "checked" : "unchecked" })}>
        {label}
      </div>
      <div className={descV({ state: isSelected ? "checked" : "unchecked" })}>
        {desc}
      </div>
    </Switch>
  );
}

const switchV = tv({
  base: "flex items-center transition-all justify-between max-w-none w-full flex-row-reverse p-5 rounded-md border-[1.5px] bg-content1/70 hover:bg-content1 rounded-lg",
  variants: {
    state: {
      checked: "border-primary/70 ",
      unchecked: "border-foreground/20 ",
    },
  },
});

const descV = tv({
  base: "text-sm text-foreground/40",
  variants: {
    state: {
      checked: "text-foreground/50",
      unchecked: "text-foreground/40",
    },
  },
});

const labelV = tv({
  base: " text-lg font-medium",
  variants: {
    state: {
      checked: "text-foreground/90",
      unchecked: "text-foreground/60",
    },
  },
});
