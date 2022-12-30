import React, { Fragment, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer } from "react-toastify";
import { RootState, storeConfig } from "./app/Redux/storeConfigurations";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "./theme/theme";
import Navbar from "./app/ui-componets/Navbar";
import Authentication from "./app/Core/Authentication";
import Routes, { RoutesProps } from "./app/Core/Routes";

const Cart = React.lazy(() => import("./app/Components/Cart/Cart"));

const LoginPage = React.lazy(
  () => import("./app/Components/LoginPage/LoginPage")
);

const Home = React.lazy(() => import("./app/Components/Home/Home"));

export const store = storeConfig();
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

function AppRouter() {
  const theme = useSelector((state: RootState) => state.theme);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme.darkTheme ? lightTheme : darkTheme}>
        <CssBaseline enableColorScheme />
        <HashRouter>
          <Navbar />
          <Suspense fallback={<CircularProgress />}>
            <ToastContainer className="unselectable" />
            <Switch>
              <Route path="/" component={LoginPage} exact={true} />
              <Route path="/signup" component={LoginPage} exact={true} />
              <NestedSwitch />
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </HashRouter>
      </ThemeProvider>
    </React.Fragment>
  );
}

const NestedSwitch = () => {
  const routes: RoutesProps["routes"] = [
    {
      path: "/cart",
      component: Cart,
      exact: true,
    },
  ];

  return (
    <>
      <Authentication type="error">
        <span className="root">
          <span>
            <main className="app-main">
              <Suspense fallback={<CircularProgress />}>
                <Route
                  path="/landing"
                  render={(props) => (
                    <Fragment>
                      <Home {...props} />
                    </Fragment>
                  )}
                  exact={true}
                />
                <Routes routes={routes} redirectTo="/landing" />
              </Suspense>
            </main>
          </span>
        </span>
      </Authentication>
    </>
  );
};

export default AppRouter;
