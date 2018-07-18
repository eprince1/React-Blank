import React from 'react';
import {Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import LandingPage from '../components/LandingPage';

import SettingsPage from '../components/SettingsPage';


export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LandingPage} exact={true} />
                <PrivateRoute path="/dashboard" component={DashboardPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;