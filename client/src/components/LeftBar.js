import { ListItem, ListItemText, SwipeableDrawer } from "@material-ui/core";
import { ListItemIcon } from "@material-ui/core";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ListRoundedIcon from "@material-ui/icons/ListRounded";

import React from "react";
import { Link } from "react-router-dom";

import AuthWrap from "./AuthWrap";

export default function LeftBar({ drawer, setDrawer }) {
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

      <AuthWrap authenticated>
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
      </AuthWrap>
    </SwipeableDrawer>
  );
}
