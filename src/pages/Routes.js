import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Meals from './Meals';
import Drinks from './Drinks';
import Profile from './Profile';
import DoneRecipes from './DoneRecipes';
import FavoriteRecipes from './FavoriteRecipes';
import RecipeDetails from './RecipeDetails';
import RecipeInProgress from './RecipeInProgress';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals/:id" component={ RecipeDetails } />
      <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default Routes;
