import { InMemoryCache } from "@apollo/client/cache";
import { CachePersistor, LocalStorageWrapper } from "apollo3-cache-persist";
import { persistenceMapper } from "./persistence/persistenceMapper";

const SCHEMA_VERSION = "1"; // Must be a string.
const SCHEMA_VERSION_KEY = "apollo-schema-version";

interface ReadArgProps {
  page: number;
  rowsPerPage: number;
}

interface UserDefinedTypesArgProps {
  category: string;
}

/**
 * This is the cache configuration for persisting of the cache using InMemoryCache.
 * In here, you can define actions to take for specific things, like queries.
 * See here for more information: https://www.apollographql.com/docs/react/caching/advanced-topics/#persisting-the-cache
 * @type {InMemoryCache}
 */
export const cache = new InMemoryCache();

export const getPersistedCache = async () => {
  // Read the current schema version from AsyncStorage.
  const currentVersion = localStorage.getItem(SCHEMA_VERSION_KEY);

  const cachePersistorOptions = {
    cache,
    storage: new LocalStorageWrapper(localStorage),
    persistenceMapper: async (data: string) => persistenceMapper(data),
  };

  const persistor = new CachePersistor(cachePersistorOptions);

  if (currentVersion === SCHEMA_VERSION) {
    try {
      await persistor.restore();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to load apollo cache due to error:", err);
      await persistor.purge();
    }
  } else {
    await persistor.purge();
    localStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION);
  }

  return cache;
};

export const resetCache = () => {
  void cache.reset().then(() => {});
};
