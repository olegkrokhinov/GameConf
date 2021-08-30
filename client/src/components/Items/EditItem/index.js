import { Button, Grid, makeStyles, TextField}from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import urljoin from 'url-join';
import { getItemFromDb, saveItemToDb} from '../itemFetch';
import ItemImage from '../ItemImage';
import SaveIcon from '@material-ui/icons/Save';
import ItemActionHeader from '../ItemActionHeader';

const URL_HOME = "http://localhost:4000/";

const useStyles = makeStyles((theme) => ({
  textField:{
    width: '50ch',
  }
}));

export default function EditItem(props) {
  
  const classes = useStyles();    

  const [itemName, setItemName] = useState(''); 
  const [itemDescription, setItemDescription] = useState(''); 
  const [itemUploadedImagePath, setItemUploadedImagePath] = useState('');
  const [localImageFile, setLocalImageFile] = useState('');
  const [saveItemResultMessage, setSaveItemResultMessage] = useState(''); 

  useEffect(()=>{
    getItemFromDb(props.selectedItemId)
    .then (item => {
      setItemName(item.name);
      setItemDescription(item.description);
      setItemUploadedImagePath(urljoin(URL_HOME, item.imageUploadPath));
      //console.log(itemUploadedImagePath)
    })
    .catch(err => {
    
    })  
  }, [props.selectedItemId]);

  function handleNameChange(event) {
    setItemName(event.target.value);
  }
  
  function handleDescriptionChange(event) {
    setItemDescription(event.target.value);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    saveItemToDb(props.selectedItemId, itemName, itemDescription, localImageFile)
    .then((item)=>{
     props.setItemlistModifyed((value)=>(!value));
      props.setItemAction('view');
    })
    .catch(error => {
      setSaveItemResultMessage('Save item catch error: '+ error.message);
    })
  }

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
            itemName = {itemName}
            itemDescription= {itemDescription}
          />
        </Grid>
        
        <Grid item>  
          <TextField
            className={classes.textField}
            id="item-name"
            label="Item name"
            value={itemName}
            placeholder="Enter item name here"
            onChange={handleNameChange}
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
            placeholder="Enter item description here"
            onChange={handleDescriptionChange}
            variant="outlined"
            size="small"
          />            
        </Grid>

        <Grid item>           
            <ItemImage {...props} itemUploadedImagePath={itemUploadedImagePath} setLocalImageFile={setLocalImageFile}/>
        </Grid>      

        <Grid item>
          <Button startIcon={<SaveIcon />} onClick={handleSubmit} variant="outlined" >
            Save
          </Button>
        </Grid>

      </Grid>     

      {saveItemResultMessage &&  
        <div>
          {saveItemResultMessage}
        </div>
      }
    </>
  );
  
};


 