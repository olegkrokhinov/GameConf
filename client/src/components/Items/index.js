import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import {
  getItemListFromDb,
  deleteItemFromDb,
  saveItemToDb,
  addItemToDb,
} from "./itemFetch";
import ItemActionHeader from "./ItemActionHeader";
import ItemAction from "./ItemAction";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1),
  },
  itemsLeft: {
    //      position: 'fixed',
    //      height: '100vh',
    maxWidth: 400,
    minWidth: 400,
  },
  itemsList: {
    //      height: '80vh',
    //      flexFlow: 'wrap row',
    //      overflow: 'hidden scroll'
  },
  action: {
    //      marginLeft: 400
  },
  button: {
    marginTop: theme.spacing(1),
  },
}));

export default function Items({ setAppBarTitle, ...props }) {
  const [list, setList] = useState([]);
  const [currentAction, setCurrentAction] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [saveItemResultMessage, setSaveItemResultMessage] = useState("");

  setAppBarTitle("Items");

  const classes = useStyles();

  useEffect(() => {
    refreshItemsList()
  }, []);

  const deleteItem = () => {
    deleteItemFromDb(selectedItem)
      .then(() => {
        setSelectedItem(null);
        setCurrentAction("");
        refreshItemsList();
      })
      .catch();
  };

  const addItem = (event) => {
    setCurrentAction("add");
  };
  const refreshItemsList = () => {
    getItemListFromDb()
      .then((list) => {
        setList(list);
        setSelectedItem((prev) => list.find((item) => item._id === prev?._id));
      })
      .catch((err) => err.message);
  };

  const listItemClick = (item) => {
    setSelectedItem(item);
    setCurrentAction("edit");
  };

  const saveEditedItem = (item) => {
    saveItemToDb(item)
      .then(() => {
        refreshItemsList();
        setSaveItemResultMessage("Item saved successfully!");
      })
      .catch((error) => {
        setSaveItemResultMessage("Save item catch error: " + error.message);
      });
  };

  const saveAddedItem = (item) => {
    addItemToDb(item)
      .then((item) => {
        setSelectedItem(item);

        refreshItemsList();
        setCurrentAction("edit");
        setSaveItemResultMessage("Item saved successfully!");
      })
      .catch((error) => {
        setSaveItemResultMessage("Save item catch error: " + error.message);
      });
  };

  const submitItemAction = (item) => {
    currentAction === "add" && saveAddedItem(item);
    currentAction === "edit" && saveEditedItem(item);
  };

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={1} direction="row" alignItems="stretch">
          <Grid
            item
            container
            direction="column"
            alignItems="flex-start"
            className={classes.itemsLeft}
          >
            <Grid
              item
              container
              direction="column"
              alignItems="stretch"
              className={classes.itemsList}
            >
              {list.map((item, index) => (
                <ListItem
                  key={index}
                  item={item}
                  selectedItem={selectedItem}
                  listItemClick={listItemClick}
                  setCurrentAction={setCurrentAction}
                />
              ))}
            </Grid>

            <Grid item container xs spacing={1}>
              <Grid item>
                <Button
                  onClick={addItem}
                  variant="outlined"
                  className={classes.button}
                >
                  Add item
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={refreshItemsList}
                  variant="outlined"
                  className={classes.button}
                >
                  Refresh
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs
            className={classes.action}
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
          >
            {!(currentAction === "") && (
              <>
                <ItemActionHeader
                  selectedItem={currentAction === "add" ? null : selectedItem}
                  currentAction={currentAction}
                  deleteItem={deleteItem}
                />
                <ItemAction
                  selectedItem={currentAction === "add" ? null : selectedItem}
                  setItem={setSelectedItem}
                  submitItemAction={submitItemAction}
                />
              </>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}
