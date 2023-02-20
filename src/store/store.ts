// quick and dirty notifier type store
// that stores data in local/session storage for persistance
// and uses a simple event emitter to notify subscribers

enum StorageType {
  Local,
  Session,
}

type NotifierStore<T> = {
  name: string;
  get: (key: string) => T;
  set: (key: string, value: T) => void;
  subscribe: (key: string, callback: (value: T) => void) => () => void;
  subscribeAny: (callback: (value: T) => void) => () => void;
  anySubs: Set<(value: T) => void>;
  subs: Record<string, Set<(value: T) => void>>;
};

const createNotifierStore = <T>(
  name: string,
  defaultValue: T,
  storageType: StorageType = StorageType.Local
): NotifierStore<T> => {
  const storage =
    storageType === StorageType.Local ? localStorage : sessionStorage;
  const subs: Record<string, Set<(value: T) => void>> = {};
  const anySubs: Set<(value: T) => void> = new Set();

  const get = (key: string) => {
    const value = storage.getItem(`${name}-${key}`);
    return value ? JSON.parse(value) : defaultValue;
  };

  const set = (key: string, value: T) => {
    storage.setItem(`${name}-${key}`, JSON.stringify(value));
    // notify all subscribers
    if (Object.hasOwn(subs, key)) {
      subs[key].forEach((cb) => cb(value));
    }

    anySubs.forEach((cb) => cb(value));
  };

  const subscribe = (key: string, callback: (value: T) => void) => {
    if (!Object.hasOwn(subs, key)) {
      subs[key] = new Set();
    }
    subs[key].add(callback);
    return () => {
      subs[key].delete(callback);
    };
  };

  const subscribeAny = (callback: (value: T) => void) => {
    anySubs.add(callback);
    return () => {
      anySubs.delete(callback);
    };
  };

  return {
    name,
    get,
    set,
    subscribe,
    subscribeAny,
    subs,
    anySubs,
  };
};

export default createNotifierStore;
