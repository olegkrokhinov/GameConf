
import {authenticatedUser} from '../../userAuth'
const URL_ITEMS = "http://localhost:4000/items/";

export function addItemToDb(itemName, itemDescription, itemLocalImageFile){    
  const formData = new FormData();
  formData.append('itemName', itemName);
  formData.append('itemDescription', itemDescription);
  formData.append('itemLocalImageFile', itemLocalImageFile);  
  
  const options = { 
      method: 'POST', 
      body : formData,
      headers: { 
        'Authorization': authenticatedUser.userAccessToken }, 
    }

    return fetchItem(options);
  }

  export function saveItemToDb(itemId, itemName, itemDescription, itemLocalImageFile){
    const formData = new FormData();
    console.log(itemId)
    formData.append('itemId', itemId);
    formData.append('itemName', itemName);
    formData.append('itemDescription', itemDescription);
    formData.append('itemLocalImageFile', itemLocalImageFile);
    formData.append('emptyImage', 'false');
    
    const options = { 
      method: 'PUT', 
      body: formData,
      headers: { 
        'Authorization': authenticatedUser.userAccessToken }, 
    }
    return fetchItem(options)
  }

  export function getItemFromDb(itemId){    
    const options = { 
      method: 'GET', 
      headers: { 
        'Authorization': authenticatedUser.userAccessToken }, 
    }
    return fetchItem(options, itemId)
  }

  export function deleteItemFromDb(itemId){
    const options = { 
      method: 'DELETE', 
      headers: {'Authorization': authenticatedUser.userAccessToken} 
    }
    return fetchItem(options, itemId);
  }

  export function getItemsList(){
    const options = { 
      method: 'GET', 
      headers: {'Authorization': authenticatedUser.userAccessToken} 
    }
    return fetchItem(options);
  }

  function fetchItem(options, itemId = ''){
    return new Promise((resolve, reject)=>{
      fetch(URL_ITEMS + itemId, options)
      .then(res => checkHtppError(res))
      .then(res => res.json())
      .then(json => resolve(json))        
      .catch(reject); 
    })
  }
  
  function checkHtppError(res){
    if (res.ok) {
      return res;
    } else {
      let message = `Error ${res.status}: ${res.statusText}`;
      throw new Error(message)
    }; 
  };