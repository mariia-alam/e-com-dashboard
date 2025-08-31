import { cn } from "@/lib/utils";
import type { RButtonProps } from "@/types";
import { Loader2 } from "lucide-react";

    export default function RButton({
    text,
    icon,
    iconRight,
    isLoading,
    className,
    disabled,
    ...props
    }: RButtonProps) {
    return (
        <button
            className={cn(
            "w-full py-3 rounded-lg font-medium text-foreground bg-white flex items-center justify-center gap-2",
            "transition-all duration-300 shadow-md cursor-pointer",
            (disabled || isLoading) && "opacity-70 cursor-not-allowed",
            className
        )}
        disabled={disabled || isLoading}
        {...props}
        >
        {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
            <>
            {!iconRight && icon}
            {text}
            {iconRight && icon}
            </>
        )}
        </button>
    );
}
