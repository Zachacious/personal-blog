import type { ValueNotifierStore } from "./valueNotifierStore";
import createValueNotifierStore from "./valueNotifierStore";

const state = {
  theme: "light",
};

let store = <ValueNotifierStore<typeof state>>{};

const useThemeStore = () => {
  // if store is empty, initialize it
  if (Object.keys(store).length === 0) {
    store = createValueNotifierStore("theme");
  }

  return store;
};

export default useThemeStore;
