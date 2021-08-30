import React, { useEffect, useState } from 'react'
import ItemsListElement from './ItemListElement'
import { getItemsList } from '../itemFetch'

export default function ItemsList(props) {
  
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(()=>{
    getItemsList()
    .then (list => {
      setList(list);
    })
    .catch(err => {
      setError(renderErrorMessage(err));
    })     
  }, [props.itemListModifyed]);
 
   
  function renderErrorMessage (err) {
    return (
      <>
        {err.message}
      </>
    );
  };

  return (
    <>
      { (!error)&& 
          list.map( (item, index)=>
            <ItemsListElement {...props} 
              key={index} 
              item={item}
            />
          )
      } 
      {error}
    </>
  );        
};

