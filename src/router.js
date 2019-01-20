import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import PrizePage from './routes/PrizePage';
import DataPage from './routes/DataPage';

import Background from './components/Background';

function RouterConfig({ history }) {
  console.log(history)
  return (
    <Router history={history}>
      <Background>
        <div>
          <Switch>
            <Route path="/" exact component={IndexPage} />
            <Route path="/prize" component={PrizePage} />
            <Route path="/data" component={DataPage} />
          </Switch>
        </div>
      </Background>
    </Router>
  );
}

export default RouterConfig;
