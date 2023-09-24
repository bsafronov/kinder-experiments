import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../lib/utils";
import { LucideIcon } from "lucide-react";

const variants = cva("flex items-center justify-center", {
  variants: {
    variant: {
      default: "text-slate-500 hover:text-slate-600",
      success: "text-emerald-500 hover:text-emerald-600",
      destructive: "text-rose-500 hover:text-rose-600",
    },
    size: {
      default: "w-4 h-4",
      md: "w-6 h-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type VariantsProps = VariantProps<typeof variants>;

type IconBadgeProps = VariantsProps & {
  icon: LucideIcon;
};

export function IconButton({ icon: Icon, size, variant }: IconBadgeProps) {
  return (
    <button className={cn(variants({ variant }))}>
      <Icon className={cn(variants({ size }))} />
    </button>
  );
}
