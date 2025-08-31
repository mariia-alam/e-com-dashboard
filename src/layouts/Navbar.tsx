import { useState } from "react";
import { FiChevronDown, FiUser, FiLogOut } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import logo from '@/assets/images/logo.png';
import { cn } from "@/lib/utils"; // Assuming you have this utility function
import useAuthStore from "@/store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Navbar() {
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const handleLogout = () => {
      logout();
    navigate("/")
    toast.success(t("auth.success.logout"), {
        style: {
            borderRadius: '12px',
            fontWeight: '600',
        }
    });

  };

  return (
    <nav className="relative flex items-center justify-between p-4 bg-white shadow-sm border-b border-gray-200">
      {/* -----------------------Left Side------------------------- */}
      <div className="flex items-center gap-2">
        <img src={logo} className="w-8 h-8 rounded-full" alt="Company Logo" />
        <h1 className="text-gray-800">{t("Admin Dashboard")}</h1>
      </div>

      {/* -----------------------Right Side------------------------- */}
      <div className="relative flex items-center gap-2 cursor-pointer" onClick={toggleDropdown}>
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
          <FiUser size={20}/>
        </div>
        <div className="flex flex-col text-sm justify-start">
          <span className="font-semibold text-gray-800">Maria</span>
          <span className="text-gray-500">maria@company.com</span>
        </div>
        <FiChevronDown size={20} className="text-gray-500 transition-transform duration-300" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />

        {/* -----------------------Dropdown Menu------------------------- */}
        <div
          className={cn(
            "absolute top-full right-0 mt-2 w-48 border-gray-200 border-[1px] bg-white rounded-md shadow-xl p-1 z-10 transition-all duration-300 transform origin-top-right",
            isDropdownOpen
              ? "opacity-100 scale-100 visible"
              : "opacity-0 scale-95 invisible"
          )}
        >
          <button
            onClick={handleLogout}
            className=" cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-sm flex items-center gap-2"
          >
            <FiLogOut size={16} />
            <span>{t("logout")}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
