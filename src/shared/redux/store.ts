import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import createSagaMiddleware from '@redux-saga/core'
import { all } from 'redux-saga/effects'

import settingsSlice from './settingsSlice'

const sagas = createSagaMiddleware()

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
  settings: settingsSlice,
})

const persistedReducer = persistReducer(persistConfig, reducers)

const middleWares = [sagas]

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    ...middleWares,
  ],
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

function* rootSaga() {
  yield all([])
}

sagas.run(rootSaga)

export const persistor = persistStore(store)

export default store
