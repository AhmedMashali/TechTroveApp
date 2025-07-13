// src/components/Navbar.jsx
import { NavigationMenu, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import HomeIcon from "remixicon-react/Home2LineIcon";
import WrittIcon from "remixicon-react/QuillPenLineIcon";
import ArticleIcon from "remixicon-react/ArticleLineIcon";
import AboutIcon from "remixicon-react/InformationLineIcon";
import useCurrentTab from "@/hooks/useCurrentTab";

const Navbar = () => {
    const activeTab = useCurrentTab();

    return (
        <>
            <nav className="bg-white-800 text-white px-6 py-4">
            <div className="max-w-6xl mx-auto flex justify-between">
                <Link to="/">
                <img src="src/assets/logo2.png" alt="Logo" className="h-8 inline-block mr-2" />
                </Link>
                <NavigationMenu className="space-x-1">
                    <NavigationMenuItem>
                        <Link to="/articles" className={`text-black hover:text-gray-500 text-md ${activeTab === 'articles' ? 'font-bold' : ''}`}>
                            <HomeIcon size={22} className="inline-block pb-1 mr-1" />
                            Home
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link to="/my-articles" className={`text-black hover:text-gray-500 text-md ${activeTab === 'my-articles' ? 'font-bold' : ''}`}>
                            <ArticleIcon size={22} className="inline-block pb-1 mr-1" />
                            My Articles
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link to="/about" className={`text-black hover:text-gray-500 text-md ${activeTab === 'about' ? 'font-bold' : ''}`}>
                            <AboutIcon size={22} className="inline-block pb-1 mr-1" />
                            About
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenu>

                <NavigationMenu className="space-x-4 flex items-center">
                    <NavigationMenuItem>
                        <Link to="/create" className={`text-black hover:text-gray-500 text-md ${activeTab === 'create' ? 'font-bold' : ''}`}>
                            <WrittIcon size={22} className="inline-block pb-1 mr-1" />
                            Write
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenu>
            </div>
        </nav>
        <hr />
        </>
    );
};

export default Navbar;
