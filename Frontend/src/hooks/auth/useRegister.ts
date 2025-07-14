import axios from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { useAuthStore } from '@/store/auth';

const loginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(8),
});

const registerSchema = loginSchema;

const loginUser = async (data: z.infer<typeof loginSchema>) => {
    const res = await axios.post('/auth/login', data);
    return res.data;
};

const registerUser = async (data: z.infer<typeof registerSchema>) => {
    const res = await axios.post('/auth/register', data);
    return res.data;
};

const logoutUser = async () => {
    await axios.post('/auth/logout');
};

export const useLogin = () =>
    useMutation({
        mutationFn: loginUser,
        onSuccess: (authRes) => {
            const accessToken = authRes.data.accessToken;
            const user = authRes.data.user;
            useAuthStore.getState().setAccessToken(accessToken);
            useAuthStore.getState().setUser(user);
        },
    });

export const useRegister = () =>
    useMutation({
        mutationFn: registerUser,
        onSuccess: (authRes) => {
            const accessToken = authRes.data.accessToken;
            const user = authRes.data.user;
            useAuthStore.getState().setAccessToken(accessToken);
            useAuthStore.getState().setUser(user);
        },
    });

export const useLogout = () =>
    useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            useAuthStore.getState().clearAuth();
        },
    });
