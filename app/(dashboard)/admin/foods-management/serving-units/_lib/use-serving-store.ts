import { createStore } from '@/lib/createStore';

type State = {
  selectedServingUnitId: number | null;
  servingUnitDialogOpen: boolean;
};

type Actions = {
  updateSelectedServingUnitId: (id: State['selectedServingUnitId']) => void;
  updateServingUnitDialogOpen: (isOpen: State['servingUnitDialogOpen']) => void;
};

type Store = State & Actions;

export const useServingUnitStore = createStore<Store>(
  (set) => ({
    selectedServingUnitId: null,
    servingUnitDialogOpen: false,
    updateSelectedServingUnitId: (id) =>
      set((state) => {
        state.selectedServingUnitId = id;
      }),
    updateServingUnitDialogOpen: (isOpen) =>
      set((state) => {
        state.servingUnitDialogOpen = isOpen;
      }),
  }),
  {
    name: 'serving-units-store',
  }
);
