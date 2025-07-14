import { useMutation, useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';

import { useAuthStore } from '@/store/authStore';

const refreshToken = async () => {
    const res = await axios.post('/auth/refresh-token');
    return res.data;
};

export const useRefreshToken = () => {
    return useMutation({
        mutationFn: refreshToken,
        onSuccess: (authRes) => {
            console.log('authRes', authRes);
        },
        onError: (err) => {
            console.log('error');
            console.log(err);
        },
    });
};
