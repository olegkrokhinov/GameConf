import {
  authUser
} from "../../userAuth";
import {
  HOST
} from '../../config'
import { checkHtppError } from "../../HttpError";
const URL_ITEMS = "/items";

export function addItemToDb(itemName, itemDescription, itemLocalImageFile) {
  const formData = new FormData();
  formData.append("itemName", itemName);
  formData.append("itemDescription", itemDescription);
  formData.append("itemLocalImageFile", itemLocalImageFile);

  const options = {
    method: "POST",
    body: formData,
    headers: {
      Authorization: authUser.userAccessToken,
    },
  };

  return fetchItem(options);
}

export function saveItemToDb(
  itemId,
  itemName,
  itemDescription,
  itemLocalImageFile
) {
  const formData = new FormData();
  formData.append("itemId", itemId);
  formData.append("itemName", itemName);
  formData.append("itemDescription", itemDescription);
  formData.append("itemLocalImageFile", itemLocalImageFile);
  formData.append("emptyImage", "false");

  const options = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: authUser.userAccessToken,
    },
  };
  return fetchItem(options);
}

export function getItemFromDb(itemId) {
  const options = {
    method: "GET",
    headers: {
      Authorization: authUser.userAccessToken,
    },
  };
  return fetchItem(options, itemId);
}

export function deleteItemFromDb(itemId) {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: authUser.userAccessToken
    },
  };
  return fetchItem(options, itemId);
}

export function getItemListFromDb() {
  const options = {
    method: "GET",
    headers: {
      Authorization: authUser.userAccessToken
    },
  };
  return fetchItem(options);
}

function fetchItem(options, itemId = "") {
  return new Promise((resolve, reject) => {
    fetch(HOST + URL_ITEMS + '/' + itemId, options)
      .then(res => checkHtppError(res))
      .then(res => {
        return res.json()
      })
      .then(json => resolve(json))
      .catch(reject);
  });
}