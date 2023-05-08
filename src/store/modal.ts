import { create } from "zustand";

type State = {
  isOpen: boolean;
  id?: number;
  openAndSetId: (id?: number) => void;
  close: () => void;
};

const INITIAL_STATE = {
  isOpen: false,
  id: undefined,
};

export const useModalStore = create<State>((set) => ({
  isOpen: false,
  id: undefined,
  close: () => set(() => INITIAL_STATE),
  openAndSetId: (id) => set(() => ({ isOpen: true, id })),
}));
