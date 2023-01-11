import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/es/storage';
import rootReducer from '../reducers';

const persistedReducer = persistReducer(
  { key: 'root', storage: localStorage, blacklist: [''] },
  rootReducer
);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
