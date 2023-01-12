import React, {Suspense, useState, useEffect} from 'react';
import {View} from 'react-native';
import {AppContainer} from './src/navigation';
import {Provider} from 'react-redux';
import {store} from './src/app/store';
import {NativeBaseProvider} from 'native-base';
import {I18nextProvider} from 'react-i18next';
import I18n from './src/common/i18n/i18n';
import theme from './src/theme/theme';
import {dialogLoadingRef, dialogRef} from './src/until/dialogHolder';
import DialogLoading from './src/library/components/processDialog/Dialog';

export const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <I18nextProvider i18n={I18n}>
          <Suspense fallback={<View />}>
            <AppContainer />
            {/*<Dialog ref={dialogRef} />*/}
            <DialogLoading ref={dialogLoadingRef} />
          </Suspense>
        </I18nextProvider>
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
