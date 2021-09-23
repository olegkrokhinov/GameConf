import { Container } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home.js";
import Items from "./Items";
import UserLogin from "./UserLogin";
import UserRegister from "./UserRegister.js";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: theme.spacing(9),
  },
}));

export default function Content({ setAppBarTitle }) {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.content}>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <Home setAppBarTitle={setAppBarTitle} {...props} />
          )}
        ></Route>
        <Route
          exact
          path="/login"
          render={(props) => (
            <UserLogin setAppBarTitle={setAppBarTitle} {...props} />
          )}
        ></Route>
        <Route
          exact
          path="/register"
          render={(props) => (
            <UserRegister setAppBarTitle={setAppBarTitle} {...props} />
          )}
        ></Route>
        <Route
          exact
          path="/Items"
          render={(props) => (
            <Items setAppBarTitle={setAppBarTitle} {...props} />
          )}
        ></Route>
      </Switch>
    </Container>
  );
}
