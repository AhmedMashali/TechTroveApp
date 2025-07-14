import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';
import { Toaster } from '@/components/ui/sonner';

const mainLayout = () => {
    return (
        <>
            <div className='flex grow flex-col'>
                <Toaster />
                <Navbar />
                <div className='container mx-auto grow px-15 py-6'>
                    <Outlet />
                </div>
            </div>
        </>
    );
};
export default mainLayout;
