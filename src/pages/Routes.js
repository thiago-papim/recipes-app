import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import Meals from './Meals';
import Drinks from './Drinks';
import Profile from './Profile';
import DoneRecipes from './DoneRecipes';
import FavoriteRecipes from './FavoriteRecipes';

function Routes() {
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      {/*       <Route exact path="" component={} />
      <Route exact path="" component={} />
      <Route exact path="" component={} />
      <Route exact path="" component={} /> */}
    </Switch>
  </BrowserRouter>;
}

export default Routes;
