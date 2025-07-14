import { create } from 'zustand';

type AuthState = {
    accessToken: string | null;
    user: { _id: string; username: string } | null;
    setAccessToken: (token: string) => void;
    setUser: (user: AuthState['user']) => void;
    clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    user: null,
    setAccessToken: (token) => {
        return set({ accessToken: token });
    },
    setUser: (user) => set({ user }),
    clearAuth: () => set({ accessToken: null, user: null }),
}));

export const getAccessToken = (): string | null =>
    useAuthStore.getState().accessToken;
export const setAccessToken = (token: string) =>
    useAuthStore.getState().setAccessToken(token);
