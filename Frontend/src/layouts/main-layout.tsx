import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { Toaster } from "@/components/ui/sonner";

const mainLayout = () => {
    return (
        <>
<<<<<<< Updated upstream
            <Navbar />
            <Toaster />
            <div className="container mx-auto px-15 py-6">
                <Outlet />
=======
            <div className="flex flex-col grow">
                <Toaster />
                <Navbar />
                <div className="container mx-auto px-15 py-6 grow">
                    <Outlet />
                </div>
                <Footer />
>>>>>>> Stashed changes
            </div>
        </>
    );
};
export default mainLayout;