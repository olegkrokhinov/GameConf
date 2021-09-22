import { ListItem, ListItemText, SwipeableDrawer } from "@material-ui/core";
import { ListItemIcon } from "@material-ui/core";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ListRoundedIcon from "@material-ui/icons/ListRounded";
import { makeStyles } from "@material-ui/core/styles";

import React, { useState } from "react";
import { Link } from "react-router-dom";

import { logOut, authUser } from "../userAuth";

import {
  addAuthStateListener,
  removeAuthStateListener,
} from "../userAuthListeners";

const useStyles = makeStyles((theme) => ({}));

export default function LeftBar({ drawer, setDrawer }) {
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
    <SwipeableDrawer
      anchor="left"
      open={drawer}
      onClose={() => setDrawer(false)}
      onOpen={() => setDrawer(true)}
    >
      <ListItem
        button
        key={1}
        component={Link}
        to="/"
        onClick={() => setDrawer(false)}
      >
        <ListItemIcon>
          <HomeRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      {userIsAuthenticated && (
        <ListItem
          button
          key={2}
          component={Link}
          to="/items"
          onClick={() => setDrawer(false)}
        >
          <ListItemIcon>
            <ListRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Items" />
        </ListItem>
      )}
    </SwipeableDrawer>
  );
}
