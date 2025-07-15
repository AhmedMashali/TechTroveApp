import { refreshToken } from '@/hooks/auth/useRefreshToken';
import { getAccessToken, setAccessToken } from '@/store/auth';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { toast } from 'sonner';

export const PresistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                const res = await refreshToken();
                setAccessToken(res.data.accessToken);
            } catch (error) {
                toast('Something went wrong while renewing your session');
            } finally {
                setIsLoading(false);
            }
        };
        /* eslint-disable */
        !getAccessToken() ? verifyRefreshToken() : setIsLoading(false);
    }, []);

    return <>{isLoading ? <></> : <Outlet />}</>;
};
export default PresistLogin;
