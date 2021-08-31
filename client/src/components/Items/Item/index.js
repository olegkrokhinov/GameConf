import { Avatar, Grid, makeStyles, Typography } from '@material-ui/core';

import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  selectedItem: {
    backgroundColor: '#e8eaf6'
  },
  content: {
    marginLeft: theme.spacing(1),
  },
  contentContainer: {
    direction: 'column',
    alignContent: 'flex-start',
    justifyContent: 'center',
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    margin: theme.spacing(1),
  }
}));

export default function Item({ item, selectedItemId, setSelectedItemId, setItemAction }) {

  const classes = useStyles();
  const [mouseOver, setMouseOver] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected((selectedItemId === item._id));
  }, [selectedItemId, item._id]);

  function handleClick(event) {
    setSelectedItemId(item._id);
    setItemAction('edit');
  }

  return (
    <Grid item container
      onClick={handleClick}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      className={(selected || (mouseOver)) ? classes.selectedItem : ''}
    >
      <Grid item>
        <Avatar className={classes.avatar} src={item.imageUploadPath} variant='rounded' alt=''>
          Empty
        </Avatar>
      </Grid>
      <Grid item container xs className={classes.contentContainer} direction='column' alignContent='flex-start' justifyContent='center' >
        <Grid item className={classes.content}>
          <Typography variant='h6'>
            {item.name}
          </Typography>
        </Grid>
        <Grid item className={classes.content}>
          <Typography >
            {item.description}
          </Typography>
        </Grid>
        <Grid item className={classes.content}>
          <Typography >
            {item._id}
          </Typography>
        </Grid>
      </Grid>

    </Grid>
  );
};