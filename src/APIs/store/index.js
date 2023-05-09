import rootSaga from 'APIs/sagas';
import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import reduxStorage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import rootReducer from '../reducers';

const persistedReducer = persistReducer(
  {
    transforms: [encryptTransform({ secretKey: process.env.REACT_APP_LOCAL_STORAGE_SCRET_KEY })],
    key: 'root',
    storage: reduxStorage,
    blacklist: ['']
  },
  rootReducer
);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

export { store, persistor };
