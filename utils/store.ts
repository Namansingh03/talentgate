import { create } from "zustand";
import { persist } from "zustand/middleware";

type SessionStore = {
  username?: string | null;
  image: string | null;

  setUser: (data: { username?: string | null; image?: string | null }) => void;

  clearUser: () => void;
};

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      username: null,
      image: null,

      setUser: ({ username, image }) =>
        set({
          username,
          image: image ?? null,
        }),

      clearUser: () =>
        set({
          username: null,
          image: null,
        }),
    }),
    {
      name: "talentgate-user-store",
    },
  ),
);
