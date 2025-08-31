import Navbar from "@/layouts/Navbar";
import Sidebar from "@/layouts/SideBar";
import useAuthStore from "@/store";
import { Navigate } from "react-router-dom";

function DashboardLayout({ children }: { children: React.ReactNode }) {

    const {isLoggedIn, token} = useAuthStore(state => state);

    if(!isLoggedIn && !token){
        return <Navigate to="/login"/>
    }

    return (
        <div className="flex h-screen w-full">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar/>
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
    }

export default DashboardLayout;