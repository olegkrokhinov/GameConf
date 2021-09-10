import { Grid, IconButton, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => (
  {
    btn: {
      minWidth: 50,
      maxWidth: 50,
    },
    content: {
      marginLeft: theme.spacing(1),
    }
    ,
    itemActionHeader: {
      height: 70,
      backgroundColor: '#e8eaf6'
    }
  }));

export default function ItemActionHeader({ item, itemAction, handleDeleteItem }) {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl)

  function handleMenuOpen(event) {
    setAnchorEl(event.target)
  }

  function handleMenuClose(event) {
    setAnchorEl(null);
  }

  function handleDelete(event) {
    setAnchorEl(null);
    handleDeleteItem();
  }

  return (
    <>
      <Grid item container className={classes.itemActionHeader}>

        <Grid item xs container direction='column' alignContent='flex-start' justifyContent='center'>
          <Grid item className={classes.content}>
            <Typography variant='h6'>
              {item ? item.name : 'New item'}
            </Typography>
          </Grid>
          <Grid item className={classes.content}>
            <Typography >
              {item?.description}
            </Typography>
          </Grid>
        </Grid>

        <Grid item className={classes.btn} container alignContent='center'>
          {(itemAction === 'edit') &&
            <IconButton aria-label="item actions menu" onClick={handleMenuOpen}>
              <MoreVert id='menu-icon' />
            </IconButton>
          }
        </Grid>
      </Grid>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id='item-actions-menu'
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  )
};