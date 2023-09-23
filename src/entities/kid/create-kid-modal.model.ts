import { create } from "zustand";

type Props = {
  open: boolean;
  toggleOpen: () => void;
};

export const createModal = create<Props>()((set, get) => ({
  open: false,
  toggleOpen: () => {
    set({ open: !get().open });
  },
}));
