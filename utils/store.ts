import { create } from "zustand";
import { Role } from "@/types/CandidateTypes";

interface ProfileState {
  username: string;
  role: Role;
  image: string | null;

  setUsername: (username: string) => void;
  setRole: (role: Role) => void;
  setImage: (image: string | null) => void;

  reset: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  username: "",
  role: "USER",
  image: null,

  setUsername: (username) => set({ username }),

  setRole: (role) => set({ role }),

  setImage: (image) => set({ image }),

  reset: () =>
    set({
      username: "",
      role: "USER",
      image: null,
    }),
}));
