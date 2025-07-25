import {
    NavigationMenu,
    NavigationMenuItem,
} from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';
import HomeIcon from 'remixicon-react/Home2LineIcon';
import WrittIcon from 'remixicon-react/QuillPenLineIcon';
import AboutIcon from 'remixicon-react/InformationLineIcon';
import useCurrentTab from '@/hooks/useCurrentTab';
import { isLoggedIn } from '@/store/auth';
import { Button } from '../ui/button';
import { useLogout } from '@/hooks/auth/useLogout';

const Navbar = () => {
    const activeTab = useCurrentTab();
    const { mutate: logout, isPending: isLoggingout } = useLogout();

    return (
        <>
            <nav className='bg-white-800 px-6 py-4 text-white'>
                <div className='mx-auto flex max-w-6xl justify-between'>
                    <Link to='/'>
                        <img
                            src='src/assets/logo2.png'
                            alt='Logo'
                            className='mr-2 inline-block h-8'
                        />
                    </Link>
                    <NavigationMenu className='space-x-1'>
                        <NavigationMenuItem>
                            <Link
                                to='/articles'
                                className={`text-md text-black hover:text-gray-500 ${activeTab === 'articles' ? 'font-bold' : ''}`}
                            >
                                <HomeIcon
                                    size={22}
                                    className='mr-1 inline-block pb-1'
                                />
                                Home
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link
                                to='/about'
                                className={`text-md text-black hover:text-gray-500 ${activeTab === 'about' ? 'font-bold' : ''}`}
                            >
                                <AboutIcon
                                    size={22}
                                    className='mr-1 inline-block pb-1'
                                />
                                About
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenu>

                    <NavigationMenu className='flex items-center space-x-4'>
                        {!isLoggedIn() ? (
                            <>
                                <NavigationMenuItem>
                                    <Link
                                        to='/login'
                                        className={`text-md text-black hover:text-gray-500 ${activeTab === 'login' ? 'font-bold' : ''}`}
                                    >
                                        Sign In
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link
                                        to='/register'
                                        className={`text-md text-black hover:text-gray-500 ${activeTab === 'register' ? 'font-bold' : ''}`}
                                    >
                                        <Button className='cursor-pointer'>
                                            Sign Up
                                        </Button>
                                    </Link>
                                </NavigationMenuItem>
                            </>
                        ) : (
                            <>
                                <NavigationMenuItem>
                                    <Link
                                        to='/create'
                                        className={`text-md text-black hover:text-gray-500 ${activeTab === 'create' ? 'font-bold' : ''}`}
                                    >
                                        <WrittIcon
                                            size={22}
                                            className='mr-1 inline-block pb-1'
                                        />
                                        Write
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Button
                                        className='cursor-pointer'
                                        onClick={async () => await logout()}
                                        disabled={isLoggingout}
                                    >
                                        Log out
                                    </Button>
                                </NavigationMenuItem>
                            </>
                        )}
                    </NavigationMenu>
                </div>
            </nav>
            <hr />
        </>
    );
};

export default Navbar;
