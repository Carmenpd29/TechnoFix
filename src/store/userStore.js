import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "../index"; 

export const useUserStore = create(persist(
  (set) => ({
    user: null,
    login: (user) => set({ user }),
    logout: async () => {
      await supabase.auth.signOut();
      set({ user: null });
    },
  }),
  {
    name: "user-storage",
    partialize: (state) => ({ user: state.user }),
  }
));