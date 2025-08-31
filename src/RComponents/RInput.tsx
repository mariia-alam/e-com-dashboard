import { useState, forwardRef } from "react";
import { FiLoader, FiEye, FiEyeOff } from "react-icons/fi";
import type { RInputProps } from "@/types";
import { useLang } from "@/hooks/use-lang";
import { cn } from "@/lib/utils";
import type { IconType } from "react-icons";

const RInput = forwardRef<HTMLInputElement, RInputProps>(
    (
        {
        className,
        inputClassName,
        isLoading,
        inputError,
        icon,
        type,
        iconPosition = "right",
        ...props
        },
        ref
    ) => {
        const { lang } = useLang();
        const [showPassword, setShowPassword] = useState(false);

        const isPassword = type === "password";

        const renderIcon = () => {
        if (isLoading) {
            return <FiLoader className="size-4 animate-spin" />;
        }

        if (isPassword) {
            return (
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={cn(
                "text-gray-300 cursor-pointer hover:text-primary transition-colors duration-500"
                )}
            >
                {showPassword ? (
                <FiEyeOff className="size-4" />
                ) : (
                <FiEye className="size-4" />
                )}
            </button>
            );
        }

        if (icon) {
            if (typeof icon === "string") {
            return <i className={`${icon} size-4`} />;
            }
            if (typeof icon === "function") {
            const IconComp = icon as IconType;
            return (
                <IconComp
                className={cn("size-4", lang === "ar" && "rtl:scale-x-[-1]")}
                />
            );
            }
            return icon; // ReactNode
        }

        return null;
        };

        const hasIcon = isLoading || isPassword || !!icon;

        const iconPositionClasses = {
        left: "rtl:left-auto rtl:right-3 ltr:left-3 ltr:right-auto",
        right: "ltr:right-3 rtl:left-3",
        };

        return (
        <div
            dir={lang === "ar" ? "rtl" : "ltr"}
            className={cn("flex items-center", className)}
        >
            <div className="relative w-full">
            <input
                ref={ref}
                {...props}
                type={isPassword && !showPassword ? "password" : "text"}
                className={cn(
                "flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs outline-none disabled:pointer-events-none md:text-sm",
                "text-muted-foreground placeholder:text-muted-foreground/70 selection:bg-secondary",
                hasIcon &&
                    (iconPosition === "right"
                    ? "ltr:pr-10 rtl:pl-10"
                    : "ltr:pl-10 rtl:pr-10"),
                inputError &&
                    "shadow-[0px_0px_5px_0px_#dd0000] focus:border-0 focus:ring-0",
                inputClassName
                )}
            />

            {hasIcon && (
                <span
                className={cn(
                    "absolute top-1/2 -translate-y-1/2 text-muted-foreground",
                    iconPositionClasses[iconPosition]
                )}
                >
                {renderIcon()}
                </span>
            )}
            </div>
        </div>
        );
    }
);

RInput.displayName = "RInput";

export default RInput;
