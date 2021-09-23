import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
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

export default function ItemAction({ selectedItem, submitItemAction }) {
  const classes = useStyles();

  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [localImageFile, setLocalImageFile] = useState("");

  useEffect(() => {
    setItemName(selectedItem ? selectedItem.name : "");
    setItemDescription(selectedItem ? selectedItem.description : "");
    setLocalImageFile(selectedItem ? selectedItem.localImageFile : "");
  }, [selectedItem]);

  const handleNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setItemDescription(event.target.value);
  };

  const saveItem = () => {
    let item = {
      _id: selectedItem?._id,
      name: itemName,
      description: itemDescription,
      localImageFile: localImageFile,
    };
    submitItemAction(item);
  };

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
            setLocalImageFile={setLocalImageFile}
            imageUploadPath={selectedItem?.imageUploadPath}
          />
        </Grid>

        <Grid item>
          <Button
            startIcon={<SaveIcon />}
            onClick={saveItem}
            variant="outlined"
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
