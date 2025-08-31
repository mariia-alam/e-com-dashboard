import { useState } from "react";
import { FiList } from "react-icons/fi";
import { cn } from "@/lib/utils";

export default function ViewToggler() {
    const [viewMode, setViewMode] = useState("list");

    return (
        <div className="flex gap-0 rounded-lg w-fit border-muted-foreground/40 border-[1px] overflow-hidden">
            {/* -----------------------Grid View Button--------------------------- */}
            {/* <div 
                onClick={() => setViewMode("grid")}
                className={cn(
                    "py-2 px-3 cursor-pointer transition-colors duration-200",
                    viewMode === "grid"
                        ? "gradient-bg text-primary-foreground"
                        : "bg-transparent text-foreground"
                )}
            >
                <FiTable size={20} />
            </div> */}
            {/* -----------------------List View Button--------------------------- */}
            <div 
                onClick={() => setViewMode("list")}
                className={cn(
                    "py-2 px-3 cursor-pointer transition-colors duration-200",
                    viewMode === "list"
                        ? "gradient-bg text-primary-foreground"
                        : "bg-transparent text-foreground"
                )}
            >
                <FiList size={20} />
            </div>
        </div>
    );
}
