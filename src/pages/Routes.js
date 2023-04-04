import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Meals from './Meals';
import Drinks from './Drinks';
import Profile from './Profile';
import DoneRecipes from './DoneRecipes';
import FavoriteRecipes from './FavoriteRecipes';
import DetailsRecipe from './DetailsRecipe';

function Routes() {
  return (

    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/meals:id" component={ DetailsRecipe } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/drinks:id" component={ DetailsRecipe } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default Routes;
