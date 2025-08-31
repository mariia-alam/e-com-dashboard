import { NavLink } from "react-router-dom";
import { FiHome, FiBox, FiShoppingCart, FiUsers, FiBarChart2, FiFileText, FiSettings, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { t } from "i18next";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const menuItems = [
        { name: t("dashboard.dashboard"), icon: <FiHome size={20} />, path: "/dashboard" },
        { name: t("dashboard.products"), icon: <FiBox size={20}/>, path: "/products" },
        { name: t("dashboard.orders"), icon: <FiShoppingCart size={20}/>, path: "/orders" },
        { name: t("dashboard.customers"), icon: <FiUsers size={20}/>, path: "/customers" },
        { name: t("dashboard.analytics"), icon: <FiBarChart2 size={20}/>, path: "/analytics" },
        { name: t("dashboard.reports"), icon: <FiFileText size={20}/>, path: "/reports" },
        { name: t("dashboard.settings"), icon: <FiSettings size={20}/>, path: "/settings" },
    ];

    return (
        <aside className={cn("bg-gray-900 text-gray-300 min-h-screen flex flex-col transition-all duration-300", isOpen ? "w-64" : "w-20")}>
            {/* -----------------------logo & toggle button------------------------- */}
            <div className=" px-5 py-2 flex items-center justify-between border-b-gray-200/40 border-b-2">
                <div className={cn("flex items-center", !isOpen && "justify-center w-full")}>
                    {/* <img src={logo} className="w-10 h-10" alt="" /> */}
                    {isOpen && (
                        <div className="p-5 flex flex-col gap-1">
                            <div className="text-white font-bold text-xl">{t("dashboard.admin")}</div>
                            <div className="text-gray-400 text-sm">{t("dashboard.dashboard")}</div>
                        </div>
                    )}
                </div>
                <button onClick={toggleSidebar} className="text-white p-2 rounded-full hover:bg-gray-800  cursor-pointer">
                    {isOpen ? <FiChevronsLeft size={20} /> : <FiChevronsRight size={20} />}
                </button>
            </div>

            {/* -----------------------menu------------------------- */}
            <nav className="flex-1 flex flex-col px-3">
                {menuItems.map((item) => (
                    <NavLink
                        to={item.path}
                        key={item.name}
                        className={({ isActive }) =>
                            cn(
                                `flex items-center gap-3 p-3 m-1 cursor-pointer rounded-lg transition-colors duration-200`,
                                "hover:bg-gray-800",
                                isActive ? "bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-600 hover:to-orange-400 text-white" : ""
                            )
                        }
                    >
                        {item.icon} 
                        {isOpen && <span className="transition-opacity duration-300">{item.name}</span>}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}