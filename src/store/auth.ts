import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Role, User } from '../types';

interface AuthState {
  user: User | null;
  login: (username: string, password: string, role: Role) => boolean;
  logout: () => void;
}

// Dummy users for demonstration
const USERS: User[] = [
  { id: '1', username: 'admin', password: 'admin123', role: Role.ADMIN },
  { id: '2', username: 'operator', password: 'operator123', role: Role.OPERATOR },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (username, password, role) => {
        const user = USERS.find(
          (u) => u.username === username && u.password === password && u.role === role
        );
        if (user) {
          set({ user });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);