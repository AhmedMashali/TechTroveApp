import { useMutation } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { useAuthStore } from '@/store/auth';

export const refreshToken = async () => {
    const res = await axios.post('/auth/refresh-token');
    return res.data;
};

export const useRefreshToken = () => {
    return useMutation({
        mutationFn: () => refreshToken(),
        onSuccess: (authRes) => {
            const accessToken = authRes.data.accessToken;
            const user = authRes.data.user;
            useAuthStore.getState().setAccessToken(accessToken);
            useAuthStore.getState().setUser(user);
        },
    });
};
