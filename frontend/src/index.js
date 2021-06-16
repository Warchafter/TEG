import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App';
import reportWebVitals from './reportWebVitals';
import authReducer from './store/reducers/auth';
import snackbarReducer from './store/reducers/snackbar';
import interfaceReducer from './store/reducers/interface';
import corpoReducer from './store/reducers/corpo';
import productReducer from './store/reducers/product';
import supplierReducer from './store/reducers/supplier';
import { watchAuth, watchInterface, watchCorpo, watchProduct, watchSupplier } from './store/sagas';

// const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const rootReducer = combineReducers({
  auth: authReducer,
  snackbar: snackbarReducer,
  product: productReducer,
  supplier: supplierReducer,
  corpo: corpoReducer,
  interface: interfaceReducer,
});

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(sagaMiddleWare)
));

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#536162',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#f3f4ed',
      main: '#424642',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#c06014',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  }
});

sagaMiddleWare.run(watchAuth);
sagaMiddleWare.run(watchProduct);
sagaMiddleWare.run(watchSupplier);
sagaMiddleWare.run(watchCorpo);
sagaMiddleWare.run(watchInterface);

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <React.StrictMode>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </React.StrictMode>
      </BrowserRouter>
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();