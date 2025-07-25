import axios from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth';

const registerUser = async (data: any) => {
    const res = await axios.post('/auth/register', data);
    return res.data;
};

export const useRegister = () => {
    return useMutation({
        mutationFn: registerUser,
        onSuccess: (authRes) => {
            const accessToken = authRes.data.accessToken;
            const user = authRes.data.user;
            useAuthStore.getState().setAccessToken(accessToken);
            useAuthStore.getState().setUser(user);
        },
    });
};
