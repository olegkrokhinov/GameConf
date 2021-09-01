import React, { useEffect, useState } from "react";
import Item from "./Item";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import EditItem from "./EditItem";
import AddItem from "./AddItem";
import {
  getItemListFromDb,
  getItemFromDb,
  deleteItemFromDb,
} from "./itemFetch";
import ItemActionHeader from "./ItemActionHeader";

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

export default function Items({ ...props }) {
  const [list, setList] = useState([]);
  const [itemListNeedUpdate, setItemListNeedUpdate] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [itemAction, setItemAction] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    itemListNeedUpdate &&
      getItemListFromDb()
        .then((list) => {
          setList(list);
          setItemListNeedUpdate(false);
        })
        .catch((err) => err.message);
  }, [itemListNeedUpdate]);

  useEffect(() => {
    if (itemAction === "add") {
    } else {
      getItemFromDb(selectedItemId)
        .then((item) => setSelectedItem(item))
        .catch((err) => {});
    }
  }, [selectedItemId]);

  function handleDeleteItem() {
    deleteItemFromDb(selectedItem.current._id)
      .then(() => {
        setItemListNeedUpdate(true);
        setSelectedItemId("");
        setItemAction("");
      })
      .catch();
  }

  const handleAddItem = (event) => {
    setItemAction("add");
    setSelectedItemId("");
    setSelectedItem(null);
  };
  const handleRefreshItemsList = (event) => {
    setItemListNeedUpdate(true);
  };

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={1} direction="row" alignItems="stretch">
          <Grid
            item
            container
            direction="column"
            className={classes.itemsLeft}
            alignItems="flex-start"
          >
            <Grid
              item
              container
              direction="column"
              alignItems="stretch"
              className={classes.itemsList}
            >
              {list.map((item, index) => (
                <Item
                  key={index}
                  item={item}
                  selectedItemId={selectedItemId}
                  setSelectedItemId={setSelectedItemId}
                  setItemAction={setItemAction}
                />
              ))}
            </Grid>

            <Grid item container xs spacing={1}>
              <Grid item>
                <Button
                  onClick={handleAddItem}
                  variant="outlined"
                  className={classes.button}
                >
                  Add item
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={handleRefreshItemsList}
                  variant="outlined"
                  className={classes.button}
                >
                  Refresh
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container xs className={classes.action}>
            <ItemActionHeader
              item={selectedItem}
              handleDeleteItem={handleDeleteItem}
            />

            {itemAction === "add" && (
              <AddItem
                setSelectedItemId={setSelectedItemId}
                setItemListNeedUpdate={setItemListNeedUpdate}
                setItemAction={setItemAction}
              />
            )}
            {itemAction === "edit" && (
              <EditItem
                item={selectedItem}
                setItemListNeedUpdate={setItemListNeedUpdate}
              />
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}
