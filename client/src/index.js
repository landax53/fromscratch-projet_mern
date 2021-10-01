import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk"; //IMPORTANT , sorte de middleware permettant d'exécuter des req async avec Redux
import rootReducer from "./reducers"; //va aller chercher 'combineReducers' dans le fichier 'index.js' du dossier 'reducers'

//dev tools (utiliser l'un des deux suffit)
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { getUsers } from "./actions/users.actions";
import { getPosts } from "./actions/post.actions";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

store.dispatch(getUsers());
store.dispatch(getPosts());

ReactDOM.render(
  <Provider store={store}>
    {" "}
    {/*store de Redux*/}
    <App />
  </Provider>,

  document.getElementById("root")
);
