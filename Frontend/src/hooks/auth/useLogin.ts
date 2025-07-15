import axios from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth';

const loginUser = async (data: any) => {
    const res = await axios.post('/auth/login', data);
    return res.data;
};

export const useLogin = () => {
    return useMutation({
        mutationFn: loginUser,
        onSuccess: (authRes) => {
            const accessToken = authRes.data.accessToken;
            const user = authRes.data.user;
            useAuthStore.getState().setAccessToken(accessToken);
            useAuthStore.getState().setUser(user);
        },
    });
};
