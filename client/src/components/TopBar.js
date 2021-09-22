import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { logOut, authUser } from "../userAuth.js";

import {
  addAuthStateListener,
  removeAuthStateListener,
} from "../userAuthListeners";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    title: {
      flexGrow: 1,
    },
  },
}));

export default function TopBar({ appBarTitle, setDrawer }) {
  const classes = useStyles();
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(true);
  // const [userIsAuthenticated, setUserIsAuthenticated] = useState(
  //   Boolean(authUser?.userAccessToken)
  // );
  // useEffect(() => {
  //   addAuthStateListener(setUserIsAuthenticated);
  //   return () => removeAuthStateListener(setUserIsAuthenticated);
  // }, []);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          onClick={() => setDrawer(true)}
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {appBarTitle}
        </Typography>

        {!userIsAuthenticated && (
          <>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </>
        )}
        {userIsAuthenticated && (
          <Button color="inherit" component={Link} to="/" onClick={logOut}>
            LogOut
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
