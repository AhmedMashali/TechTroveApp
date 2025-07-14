import { create } from "zustand";

interface User {
  _id: string;
  username: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoggedIn: () => boolean; // computed logic
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,

  login: (token, user) =>
    set({
      token,
      user,
    }),

  logout: () =>
    set({
      token: null,
      user: null,
    }),

  isLoggedIn: () => {
    console.log(get().token);
    return !!get().token;
  },
}));
