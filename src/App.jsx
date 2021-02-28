import React, { memo } from "react";
import { AppContextProvider } from "./context/AppContext";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Game from "./pages/Game";
import Main from "./pages/Main";
import { Header } from "./components/header";

const App = memo(() => {
  return (
    <AppContextProvider>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            /* render={(props) => <Main {...props} />} */ component={Game}
          />
          <Route
            path="/game"
            /* render={(props) => <Game {...props} />} */ component={Main}
          />
        </Switch>
      </BrowserRouter>
    </AppContextProvider>
  );
});

export default App;
