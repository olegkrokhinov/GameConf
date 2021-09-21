import {
  authUser
} from "../../userAuth";
import {
  HOST
} from '../../config'
import { checkHtppError } from "../../HttpError";
const URL_ITEMS = "/items";

export function addItemToDb(item) {
  const formData = new FormData();
  formData.append("itemName", item.name);
  formData.append("itemDescription", item.description);
  formData.append("itemLocalImageFile", item.localImageFile);

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
  item
) {
  const formData = new FormData();
  formData.append("itemId", item._id);
  formData.append("itemName", item.name);
  formData.append("itemDescription", item.description);
  formData.append("itemLocalImageFile", item.localImageFile);
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

export function getItemFromDb(item) {
  const options = {
    method: "GET",
    headers: {
      Authorization: authUser.userAccessToken,
    },
  };
  return fetchItem(options, item._id);
}

export function deleteItemFromDb(item) {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: authUser.userAccessToken
    },
  };
  return fetchItem(options, item._id);
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