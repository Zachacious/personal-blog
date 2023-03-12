import type { ValueNotifierStore } from "./valueNotifierStore";
import createValueNotifierStore, { StorageType } from "./valueNotifierStore";

const initialState = {
  open: false,
  search: "",
};

let store = <ValueNotifierStore<typeof initialState>>{};

const useSearchStore = () => {
  if (Object.keys(store).length === 0) {
    store = createValueNotifierStore(
      "search",
      initialState,
      initialState,
      StorageType.ephemeral
    );
  }

  const toggleSearchModal = () => {
    const state = store.get();
    state.open = !state.open;
    store.set(state);
  };

  const setSearchModel = (search: string) => {
    const state = store.get();
    state.search = search;
    store.set(state);
  };

  return {
    toggleSearchModal,
    setSearchModel,
    value: store,
  };
};

export default useSearchStore;
