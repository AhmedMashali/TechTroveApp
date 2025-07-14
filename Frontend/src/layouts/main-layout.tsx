import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { Toaster } from "@/components/ui/sonner";

const mainLayout = () => {
    return (
        <>
            <Navbar />
            <Toaster />
            <div className="container mx-auto px-15 py-6">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};
export default mainLayout;