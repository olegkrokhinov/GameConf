import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { addItemToDb } from '../itemFetch';
import ItemImage from '../ItemImage';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 16,
  },
  textField: {
    width: '50ch',
  }
}));

export default function AddItem({
  setSelectedItemId,
  setItemAction,
  setItemListNeedUpdate
}) {

  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [localImageFile, setLocalImageFile] = useState('');
  const [saveItemResultMessage, setSaveItemResultMessage] = useState('');

  const classes = useStyles();

  function handleNameChange(event) {
    setItemName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setItemDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    addItemToDb(itemName, itemDescription, localImageFile)
      .then((item) => {
        setSelectedItemId(item._id);
        setItemListNeedUpdate(true);
        setItemAction('edit');
      })
      .catch(error => {
        setSaveItemResultMessage('Save item catch error: ' + error.message);
      })
  }

  return (
    <>
      <Grid item container
        spacing={3}
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        className={classes.root}
      >

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
          <ItemImage itemUploadedImagePath='' setLocalImageFile={setLocalImageFile} />
        </Grid>

        <Grid item>
          <Button startIcon={<SaveIcon />} onClick={handleSubmit} variant="outlined">
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


