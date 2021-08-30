import { Avatar, Grid, makeStyles, Typography} from '@material-ui/core';

import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme)=>({
  selectedItem: {
    backgroundColor: '#e8eaf6'
  },
  content: {
    marginLeft: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    margin: theme.spacing(1),
  }
}));

export default function Item(props){

  const classes = useStyles();
  const [mouseOver, setMouseOver] = useState(false); 
  const [selected, setSelected] = useState(false);
  
  useEffect(()=> {
    setSelected((props.selectedItemId === props.item._id));
  }, [props.selectedItemId, props.item._id]);

  function handleClick(event) {
    props.setSelectedItemId(props.item._id);
    props.setItemAction('edit');
  }

  return (
    <Grid item container 
      onClick={handleClick}  
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave ={() => setMouseOver(false)}
      className={(selected||(mouseOver))? classes.selectedItem : ''}>

      <Grid item>
        <Avatar
          className={classes.avatar}
          variant='rounded'
          alt= ''
          src={props.item.imageUploadPath} 
        >
          Empty
        </Avatar>
      </Grid>
      <Grid item container xs 
        direction='column' 
        alignContent='flex-start' 
        justifyContent='center'
      >
        <Grid item className={classes.content}>
          <Typography variant='h6'>
            {props.item.name}
          </Typography>
        </Grid>
        <Grid item className={classes.content}>
          <Typography >
            {props.item.description}
          </Typography>
        </Grid>
      </Grid>
      
    </Grid>
  );
};