import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { logOut } from "../userAuth.js";
import AuthWrap from "./AuthWrap.js";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function TopBar({ appBarTitle, setDrawer }) {
  const classes = useStyles();
 
  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolBar}>
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

        <AuthWrap>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
        </AuthWrap>
        <AuthWrap authenticated>
          <Button color="inherit" component={Link} to="/" onClick={logOut}>
            LogOut
          </Button>
        </AuthWrap>
      </Toolbar>
    </AppBar>
  );
}
