import { writable } from "svelte/store";

function createEventStore() {
  const { subscribe, set, update } = writable({ isOpen: false, date: "" });

  return {
    subscribe,
    show: (date: string) => set({ isOpen: true, date }),
    hide: () => set({ isOpen: false, date: "" }),
  };
}

function viewEventStore() {
  const { subscribe, set, update } = writable({ isOpen: false, event: null });

  return {
    subscribe,
    show: (event: any) => set({ isOpen: true, event }),
    hide: () => set({ isOpen: false, event: null }),
  };
}

export const createEventModal = createEventStore();
export const viewEventModal = viewEventStore();
