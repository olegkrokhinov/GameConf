import { Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import urljoin from 'url-join';
import ItemActionHeader from '../ItemActionHeader';
import { getItemFromDb } from '../itemFetch';
import ItemImage from '../ItemImage';

const URL_HOME = "http://localhost:4000/";

const useStyles = makeStyles((theme) => ({

  textField:{
    width: '50ch',
  },
  img:{
    width: 450,
    height: 450,
    borderRadius: 5
  }
}));

export default function ViewItem(props) {
  
  const [itemName, setItemName] = useState(''); 
  const [itemDescription, setItemDescription] = useState(''); 
  const [itemUploadedImagePath, setItemUploadedImagePath] = useState('');

  const classes = useStyles();

  useEffect(()=>{
    getItemFromDb(props.selectedItemId)
    .then (item => {
      setItemName(item.name);
      setItemDescription(item.description);
      setItemUploadedImagePath(urljoin(URL_HOME, item.imageUploadPath));

    })
    .catch(err => {
    })  
  }, [props.selectedItemId]);

  return (
    <>    
      <Grid container 
        spacing={3}  
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
      >

        <Grid item>
          <ItemActionHeader {...props}
            itemName={itemName}
            itemDescription={itemDescription}
          />
        </Grid>

        <Grid item>  
          <TextField
            className={classes.textField}
            id="item-name"
            label="Item name"
            value={itemName}
            variant="outlined"
            size="small"
          />            
        </Grid>

        <Grid item>
          <TextField
            className={classes.textField}
            id="item-description"
            label="Item description"
            multiline
            rows={5}
            value={itemDescription}
            variant="outlined"
            size="small"
          />            
        </Grid>

        <Grid item>
          <ItemImage {...props} itemUploadedImagePath={itemUploadedImagePath} onlyImage/>
        </Grid>      

      </Grid>     
    </>
  );
  
};
 