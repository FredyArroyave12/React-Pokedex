import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import store from './redux/store';
import PokemonList from './components/pokemonList';
import HomePage from './components/homePage';
import PageNotFound from './components/pageNotFound';

const App = () => (
  <Provider store={store}>
    <HashRouter basename="/">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/pokemons" component={PokemonList} />
        <Route path="*" exact component={PageNotFound} />
      </Switch>
    </HashRouter>
  </Provider>
);

export default App;
