import { create } from "zustand";
import { supabase } from "../index"; 

export const useUserStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));