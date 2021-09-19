import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
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
  const [itemAction, setItemAction] = useState('');
  const [selectedItem, setSelectedItem] = useState({});
  const [saveItemResultMessage, setSaveItemResultMessage] = useState('');

  const classes = useStyles();

  useEffect(() => {
    refreshItemsList();
  }, [selectedItem]);


  function handleDeleteItem() {
    deleteItemFromDb(selectedItem)
      .then(() => {
        setSelectedItem({null);
        setItemAction("");
      })
      .catch();
  }

  const addItem = (event) => {
    setItemAction("add");
  };
  const refreshItemsList = () => {
    getItemListFromDb()
      .then((list) => {
        setList(list);
      })
      .catch((err) => err.message);
  };
  
  const listItemClick = (item) => {
    setSelectedItem(item)
    setItemAction('edit');
  };
  
  const submitItemAction = (item) => {
    (itemAction === 'add') && saveAddedItem(item);
    (itemAction === 'edit') && saveEditedItem(item);
  }

  const saveEditedItem = (item) => {
    saveItemToDb(item)
      .then((item) => {
        setSaveItemResultMessage("Item saved successfully!");
      })
      .catch((error) => {
        setSaveItemResultMessage("Save item catch error: " + error.message);
      });
  }


  const saveAddedItem = (item) =>{ 
    addItemToDb(item)
      .then((item) => {
        setItemAction('edit');
        setSaveItemResultMessage("Item saved successfully!");
      })
      .catch(error => {
        setSaveItemResultMessage('Save item catch error: ' + error.message);
      })
  }

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
                  setItemAction={setItemAction}
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

          <Grid item container xs className={classes.action}
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
          >
            <ItemActionHeader
              item={(itemAction === 'add') ? null : { selectedItem }}
              itemAction={itemAction}
              handleDeleteItem={handleDeleteItem}
            />
            <ItemAction
              item={(itemAction==='add')? null :{selectedItem}}
              setItem={setSelectedItem}
              submitItemAction = {submitItemAction}
            />

          </Grid>
        </Grid>
      </div>
    </>
  );
}


// useEffect(() => {
//   if (itemAction === "add") {
//   } else {
//     getItemFromDb(selectedItemId)
//       .then((item) => setSelectedItem(item))
//       .catch((err) => { });
//   }
// }, [selectedItemId, itemAction]);