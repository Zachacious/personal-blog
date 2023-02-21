import type { ValueNotifierStore } from "./valueNotifierStore";
import createValueNotifierStore from "./valueNotifierStore";

const initialState = {
  theme: "light",
};

let store = <ValueNotifierStore<typeof initialState>>{};

const useThemeStore = () => {
  // system theme
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

  if (darkThemeMq.matches) {
    initialState.theme = "dark";
  }

  // if store is empty, initialize it
  if (Object.keys(store).length === 0) {
    store = createValueNotifierStore("theme", initialState, initialState);
  }

  const toggleTheme = () => {
    const state = store.get();
    console.log("state", state);
    state.theme = state.theme === "light" ? "dark" : "light";
    store.set(state);
  };

  return {
    toggleTheme,
    value: store,
  };
};

export default useThemeStore;
