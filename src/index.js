import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { firebase } from './firebase/firebase';
import database from './firebase/firebase';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import AppRouter, { history } from './routes/AppRouter';
import LoadingPage from './components/LoadingPage';


const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('root'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('root'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        renderApp();
    } else {
        store.dispatch(logout());
        renderApp();
    }
});

registerServiceWorker();