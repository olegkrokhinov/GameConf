import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { HOST } from '../../../config';

const useStyles = makeStyles((theme) => ({
  selectedItem: {
    backgroundColor: "#e8eaf6",
  },
  content: {
    marginLeft: theme.spacing(1),
  },
  contentContainer: {
    direction: "column",
    alignContent: "flex-start",
    justifyContent: "center",
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    margin: theme.spacing(1),
  },
}));

export default function ListItem({
  item,
  selectedItem,
  listItemClick, 
}) {
  const classes = useStyles();
  const [mouseOver, setMouseOver] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(selectedItem?._id === item?._id);
  }, [selectedItem, item]);


  return (
    <Grid
      item
      container
      onClick={() => listItemClick(item)}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      className={selected || mouseOver ? classes.selectedItem : ""}
    >
      <Grid item>
        <Avatar
          className={classes.avatar}
          src={HOST + item.imageUploadPath}
          variant="rounded"
          alt=""
        >
          Empty
        </Avatar>
      </Grid>
      <Grid
        item
        container
        xs
        className={classes.contentContainer}
        direction="column"
        alignContent="flex-start"
        justifyContent="center"
      >
        <Grid item className={classes.content}>
          <Typography>Id: {item._id}</Typography>
        </Grid>
        <Grid item className={classes.content}>
          <Typography>Name: {item.name}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
