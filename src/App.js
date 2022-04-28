import React, { Suspense, lazy } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import getSvg from "./svg/getSvg";

const Home = lazy(() => import("./pages/Home/Home"));
const PDP = lazy(() => import("./pages/ProductDisplay/pdpgraphql"));
const Header = lazy(() => import("./components/Header/header"));
const Cart = lazy(() => import("./pages/Cart/Cart"));

const link = from([new HttpLink({ uri:  process.env.REACT_APP_GRAPHQL_ENDPOINT || "http://localhost:4000" })]);

const client = new ApolloClient({
  cache: new InMemoryCache({
    dataIdFromObject: (o) => (o._id ? `${o.__typename}:${o._id}` : null),
  }),
  link: link,
});

class App extends React.Component {
  render() {
    return (
      <Suspense fallback={<img src={getSvg.loader} />}>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <BrowserRouter>
              <Header />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/cart">
                  <Cart />
                </Route>
                <Route exact path="/:product">
                  <Home />
                </Route>

                <Route exact path="/:category/:productId">
                  <PDP />
                </Route>
              </Switch>
            </BrowserRouter>
          </Provider>
        </ApolloProvider>
      </Suspense>
    );
  }
}

export default App;
