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

export default function ItemAction({
  item,
  setItem,
  submitItemAction,
}) {
  const classes = useStyles();

  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');


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
            item = {item}
          />
        </Grid>

        <Grid item>
          <Button
            startIcon={<SaveIcon />}
            onClick={() => submitItemAction(item)}
            variant="outlined"
          >
            Save
          </Button>
        </Grid>
      </Grid>

    </>
  );
}
