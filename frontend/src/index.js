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
import { watchAuth } from './store/sagas';

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  snackbar: snackbarReducer
});

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(sagaMiddleWare)
));

const theme = createMuiTheme({
  palette: {
    type: "light",
  }
});

sagaMiddleWare.run(watchAuth);

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