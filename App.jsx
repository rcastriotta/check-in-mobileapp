import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

// NAVIGATOR
import MainNavigator from './navigation/Navigator';

// REDUX
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react'
import AsyncStorage from '@react-native-community/async-storage';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
// reducers
import authReducer from './store/reducers/auth';
import { NavigationContainer } from '@react-navigation/native';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const persistor = persistStore(store)

const fetchFonts = () => {
  return Font.loadAsync({
    'averta-bold': require('./assets/fonts/averta-bold.ttf'),
    'averta-regular': require('./assets/fonts/averta-regular.otf')
  });
};

export default function App() {
  /*
  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded) {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />
    );
  */

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
