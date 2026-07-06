import { create } from "zustand";

type userSession = {
  image?: string | null;
  username?: string | null;
  role?: string | null;
};

type UserStore = userSession & {
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

type adminType = {
  image?: string | null;
  username?: string | null;
  email?: string | null;
  companySlug: string | null;
  companyName: string | null;
};

type adminStore = adminType & {
  setAdmin: (data: adminType) => void;
  clearAdminStore: () => void;
};

export const useAdminStore = create<adminStore>((set) => ({
  companyName: null,
  companySlug: null,
  image: null,
  username: null,
  email: null,

  setAdmin: (data: adminType) =>
    set({
      image: data.image,
      username: data.username,
      companyName: data.companyName,
      companySlug: data.companySlug,
      email: data.email,
    }),

  clearAdminStore: () =>
    set({
      image: null,
      username: null,
      companyName: null,
      companySlug: null,
      email: null,
    }),
}));
