import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { saveItemToDb } from "../itemFetch";
import ItemImage from "../ItemImage";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 16,
  },
  textField: {
    width: "50ch",
  },
}));

export default function EditItem({
  item,
  setItemListNeedUpdate
}) {
  const classes = useStyles();

  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  const [localImageFile, setLocalImageFile] = useState('');
  const [saveItemResultMessage, setSaveItemResultMessage] = useState('');

  useEffect(() => {
    setItemName(item?.name);
    setItemDescription(item?.description);
  }, [item]);

  function handleNameChange(event) {
    setItemName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setItemDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    saveItemToDb(item._id, itemName, itemDescription, localImageFile)
      .then((item) => {
        setItemListNeedUpdate(true)
        setSaveItemResultMessage("Item saved successfully!");
      })
      .catch((error) => {
        setSaveItemResultMessage("Save item catch error: " + error.message);
      });
  }

  return (
    <>
      <Grid
        item
        container
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
          <ItemImage
            imageUploadPath={item?.imageUploadPath}
            setLocalImageFile={setLocalImageFile}
          />
        </Grid>

        <Grid item>
          <Button
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
            variant="outlined"
          >
            Save
          </Button>
        </Grid>
      </Grid>

      {saveItemResultMessage && <div>{saveItemResultMessage}</div>}
    </>
  );
}
