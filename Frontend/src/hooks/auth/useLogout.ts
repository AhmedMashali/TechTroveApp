import { useMutation } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { useAuthStore } from '@/store/auth';

const logoutUser = async () => {
    await axios.post('/auth/logout');
};

export const useLogout = () =>
    useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            useAuthStore.getState().clearAuth();
        },
    });
