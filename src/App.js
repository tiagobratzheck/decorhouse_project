import React, { Component } from 'react';
import Login from './view/login';
import Cadastro from './view/cadastro';
import Descricao from './view/descricao';
import IncluirAmbiente from './view/incluir-ambiente'
import Home from './view/home/';
import Recuperar from './view/recuperar/';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { store, persistor } from '../src/store/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route path="/decoracoes/:parametro" component={Home} />
            <Route exact path="/cadastro" component={Cadastro} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/recuperar" component={Recuperar} />
            <Route exact path="/adicionar" component={IncluirAmbiente} />
            <Route path="/descricao/:id" component={Descricao} />
            <Route path="/editardecoracao/:id" component={IncluirAmbiente} />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
