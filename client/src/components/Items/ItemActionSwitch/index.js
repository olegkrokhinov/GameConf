import React from 'react'
import AddItem from '../AddItem'
import EditItem from '../EditItem'
import ViewItem from '../ViewItem'

export default function ItemAction(props) {

  return (
    <>
      { (props.itemAction==='add' ) && <AddItem  { ...props}/> }
      { (props.itemAction==='edit') && <EditItem { ...props}/> }
      { (props.itemAction==='view') && <ViewItem { ...props}/> }
    </>
  );
}