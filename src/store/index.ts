import { create } from 'zustand';

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}
const token = localStorage.getItem("authToken");

const useAuthStore = create<AuthState>((set) => ({
  token: token,
  isLoggedIn: token ? true : false,

  login: (token: string) => {
    localStorage.setItem('authToken', token);
    set({ token, isLoggedIn: true });
  },
  logout: () => {
    localStorage.removeItem('authToken');
    set({ token: null, isLoggedIn: false });
  }
}));

export default useAuthStore;
