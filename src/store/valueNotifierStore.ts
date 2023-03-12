// quick and dirty notifier type store
// that stores data in local/session storage for persistance
// and uses a simple event emitter to notify subscribers

enum StorageType {
  Local,
  Session,
  ephemeral,
}

type ValueNotifierStore<T> = {
  name: string;
  get: () => T;
  set: (value: T) => void;
  subscribe: (callback: (value: T) => void) => () => void;
  subs: Set<(value: T) => void>;
};

const ephemeralStorage = new Map<string, string>();

const createValueNotifierStore = <T>(
  name: string,
  defaultValue?: T,
  initialState?: T,
  storageType: StorageType = StorageType.Local
): ValueNotifierStore<T> => {
  const storage =
    storageType === StorageType.Local
      ? localStorage
      : storageType === StorageType.Session
      ? sessionStorage
      : null;

  const subs: Set<(value: T) => void> = new Set();

  // set initial state
  if (storageType === StorageType.ephemeral) {
    ephemeralStorage.set(name, JSON.stringify(initialState));
  } else if (initialState && !storage?.getItem(name)) {
    storage?.setItem(name, JSON.stringify(initialState));
  }

  const get = () => {
    const value = storage ? storage.getItem(name) : ephemeralStorage.get(name);
    return value ? JSON.parse(value) : defaultValue ?? undefined;
  };

  const set = (value: T) => {
    if (storage) storage.setItem(name, JSON.stringify(value));
    else ephemeralStorage.set(name, JSON.stringify(value));
    subs.forEach((cb) => cb(value));
  };

  const subscribe = (callback: (value: T) => void) => {
    subs.add(callback);
    return () => {
      subs.delete(callback);
    };
  };

  return {
    name,
    get,
    set,
    subscribe,
    subs,
  };
};

export default createValueNotifierStore;
export type { ValueNotifierStore };
