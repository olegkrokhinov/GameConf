import {
  Grid,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import MoreVert from "@material-ui/icons/MoreVert";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  btn: {
    minWidth: 50,
    maxWidth: 50,
  },
  content: {
    marginLeft: theme.spacing(1),
  },
  itemActionHeader: {
    height: 70,
    backgroundColor: "#e8eaf6",
  },
}));

export default function ItemActionHeader({
  selectedItem,
  currentAction,
  deleteItem,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.target);
  };

  const handleMenuClose = (event) => {
    setAnchorEl(null);
  };

  const handleDelete = (event) => {
    setAnchorEl(null);
    deleteItem();
  };

  return (
    <>
      <Grid item container className={classes.itemActionHeader}>
        <Grid
          item
          xs
          container
          direction="column"
          alignContent="flex-start"
          justifyContent="center"
        >
          <Grid item className={classes.content}>
            <Typography variant="h6">
              {selectedItem ? selectedItem.name : "New item"}
            </Typography>
          </Grid>
          <Grid item className={classes.content}>
            <Typography>{selectedItem?.description}</Typography>
          </Grid>
        </Grid>

        <Grid item className={classes.btn} container alignContent="center">
          {currentAction === "edit" && (
            <IconButton aria-label="item actions menu" onClick={handleMenuOpen}>
              <MoreVert id="menu-icon" />
            </IconButton>
          )}
        </Grid>
      </Grid>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id="item-actions-menu"
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
}
