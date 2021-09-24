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
  const [itemType, setItemType] = useState("");
  const [itemColor, setItemColor] = useState("");
  const [itemShape, setItemShape] = useState("");
  const [localImageFile, setLocalImageFile] = useState("");

  useEffect(() => {
    setItemName(selectedItem ? selectedItem.name : "");
    setItemDescription(selectedItem ? selectedItem.description : "");
    setItemType(selectedItem ? selectedItem.type : "");
    setItemColor(selectedItem ? selectedItem.color : "");
    setItemShape(selectedItem ? selectedItem.shape : "");
    setLocalImageFile("");
  }, [selectedItem]);

  const handleNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setItemDescription(event.target.value);
  };

  const handleTypeChange = (event) => {
    setItemType(event.target.value);
  };

  const handleColorChange = (event) => {
    setItemColor(event.target.value);
  };

  const handleShapeChange = (event) => {
    setItemShape(event.target.value);
  };

  const fieldsForRender = [
    {
      label: "Type",
      value: itemType,
      placeholder: "Enter item type here",
      onChange: handleTypeChange,
    },
    {
      label: "Color",
      value: itemColor,
      placeholder: "Enter item color here",
      onChange: handleColorChange,
    },
    {
      label: "Shape",
      value: itemShape,
      placeholder: "Enter item shape here",
      onChange: handleShapeChange,
    },
    {
      label: "Name",
      value: itemName,
      placeholder: "Enter item name here",
      onChange: handleNameChange,
    },
    {
      label: "Description",
      value: itemDescription,
      placeholder: "Enter item description here",
      onChange: handleDescriptionChange,
    },
  ];

  const saveItem = () => {
    let item = {
      _id: selectedItem?._id,
      name: itemName,
      description: itemDescription,
      type: itemType,
      color: itemColor,
      shape: itemShape,
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
        {fieldsForRender.map((field, index) => (
          <Grid item>
            <TextField
              className={classes.textField}
              label={field.label}
              value={[field.value]}
              placeholder={field.placeholder}
              onChange={field.onChange}
              variant="outlined"
              size="small"
            />
          </Grid>
        ))}

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
