import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

type UserStoreState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
