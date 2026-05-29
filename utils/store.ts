import { create } from "zustand";

type Roles = "admin" | "candidate" | "recruiter";

type userSession = {
  image?: string | null;
  username: string | null;
  role: Roles | null;
};

type UserStore = {
  image?: string | null;
  username: string | null;
  role: Roles | null;

  setUser: (data: userSession) => void;
  clearUserStore: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  username: null,
  image: null,
  headline: null,
  role: null,

  setUser: (data: userSession) =>
    set({
      image: data.image,
      username: data.username,
      role: data.role,
    }),

  clearUserStore: () =>
    set({
      image: null,
      username: null,
      role: null,
    }),
}));
