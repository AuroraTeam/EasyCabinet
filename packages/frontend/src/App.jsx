import { Route, Router } from "@solidjs/router";

import { createEffect, lazy } from "solid-js";

import { refresh } from "./api";

const Main = lazy(() => import("./layouts/main"));
const Page404 = lazy(() => import("./pages/404"));
const Index = lazy(() => import("./pages/index"));
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const ForgotPassword = lazy(() => import("./pages/forgot-password"));
const CahngePassword = lazy(() => import("./pages/change-password"));
const Profile = lazy(() => import("./pages/profile"));

export default function App() {
  createEffect(() => {
    refresh();
  });

  return (
    <Router root={Main}>
      <Route path="/" component={Index} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/change-password" component={CahngePassword} />
      <Route path="/profile" component={Profile} />
      <Route path="*404" component={Page404} />
    </Router>
  );
}
