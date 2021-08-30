import React, { useEffect, useState } from 'react'
import Item from './Item';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import EditItem from './EditItem';
import AddItem from './AddItem';
import { getItemsList } from './itemFetch';

const useStyles = makeStyles((theme) => (
  {
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
    }
  }
));

export default function Items({ ...props }) {
  const [list, setList] = useState([]);
  const [itemListModifyed, setItemlistModifyed] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [itemAction, setItemAction] = useState('');

  const classes = useStyles();

  useEffect(() => {
    getItemsList()
      .then(list => {
        setList(list);
      })
      .catch(err => err.message)
  }, [itemListModifyed]);

  const handleAddItem = (event) => {
    setSelectedItemId('');
    setItemAction('add');
  };
  const handleRefreshItemsList = (event) => {
    setItemlistModifyed((value) => !value);
  };

  return (
    <>
      <div className={classes.root}>
        <Grid container
          spacing={1}
          direction='row'
          alignItems='stretch'
        >
          <Grid item container
            direction='column'
            className={classes.itemsLeft}
            alignItems='flex-start'
          >
            <Grid item
              container
              direction='column'
              alignItems='stretch'
              className={classes.itemsList}
            >
              
              {list.map( (item, index)=>
                <Item {...props}
                  key={index}
                  item={item}
                  selectedItemId={selectedItemId}
                  setSelectedItemId={setSelectedItemId}
                  setItemAction={setItemAction}
                />
              )}
            </Grid>

            <Grid item container xs spacing={1} >
              <Grid item>
                <Button onClick={handleAddItem} variant="outlined" className={classes.button}>
                  Add item
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={handleRefreshItemsList} variant="outlined" className={classes.button}>
                  Refresh
                </Button>
              </Grid>
            </Grid>

          </Grid>

          <Grid item xs className={classes.action}>

            {(itemAction === 'add') &&
              <AddItem  {...props}
                setSelectedItemId={setSelectedItemId}
                setItemlistModifyed={setItemlistModifyed}
                setItemAction={setItemAction}
              />
            }
            {(itemAction === 'edit') &&
              <EditItem {...props}
                selectedItemId={selectedItemId}
                setItemlistModifyed={setItemlistModifyed}
              />
            }

          </Grid>

        </Grid>
      </div>
    </>
  )
}