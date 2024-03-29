import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './slice/userSlice'
import gmReducer from './slice/gmSlice'
import wmReducer from './slice/wmSlice'
import omReducer from './slice/omSlice'
import weReducer from './slice/weSlice'
import oeReducer from './slice/oeSlice'
import transactionReducer from './slice/transactionSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  user: userReducer,
  gm: gmReducer,
  wm: wmReducer,
  om: omReducer,
  we: weReducer,
  oe: oeReducer,
  transaction: transactionReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) => 
    getDefault({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store);