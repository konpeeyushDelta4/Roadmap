import { cn } from "../../../utils/helpers";
import type {} from "tailwindcss/types";
export default function BoardChip({
  color,
  name,
  sx,
}: {
  color: string;
  name: string;
  sx?: React.ComponentProps<"div">["className"];
}) {
  if (!name) return <></>;
  return (
    <div
      style={{
        background: color + "50",
        color: color,
      }}
      className={cn(
        `rounded-full text-sm self-stretch h-full px-3 py-1 w-fit`,
        sx
      )}
    >
      {name}
    </div>
  );
}
