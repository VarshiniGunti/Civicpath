// localStorage helpers

const PREFIX = 'votesathi_';

export const storage = {
  get: (key, fallback = null) => {
    try {
      const val = localStorage.getItem(PREFIX + key);
      return val !== null ? JSON.parse(val) : fallback;
    } catch {
      return fallback;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      // Ignore
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(PREFIX + key);
    } catch {
      // Ignore
    }
  },
  toggle: (key, id) => {
    const set = new Set(storage.get(key, []));
    set.has(id) ? set.delete(id) : set.add(id);
    storage.set(key, [...set]);
    return set.has(id);
  },
  has: (key, id) => {
    return new Set(storage.get(key, [])).has(id);
  },
};
