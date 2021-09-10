import { tokenHasExpired, getTokenExpiresAfter } from './JWTUtils'
import { setAuthState } from './userAuthListeners'
import { checkHtppError } from './HttpError';

import {
  HOST
} from './config'

const URL_AUTH = "/auth";

export const authUser = {};

const emptyUser = {
  userid: '',
  userName: '',
  userLogin: '',
  userRoles: [],
  userAccessToken: ''
};

Object.assign(authUser, emptyUser)

let tokenRefreshTimerDelta = 60000;
let tokenRefreshTimerId = "";

loadUserFromLocalStorage();
refreshAccessTokenFromServer(true);

export function loadUserFromLocalStorage() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && !tokenHasExpired(user.userAccessToken)) {
    Object.assign(authUser, user);
    setAuthState(true);
    return;
  }
  resetUser();
}

function saveUserToLocalStorage(user) {
  if (user.userAccessToken) {
    localStorage.setItem("user", JSON.stringify(user));
  }
}

function resetUser() {
  Object.assign(authUser, emptyUser);
  localStorage.removeItem("user");
  clearTimeout(tokenRefreshTimerId);
  setAuthState(false);
}

export function login(userLogin, userPassword) {
  const body = {
    userLogin: userLogin,
    userPassword: userPassword,
  };

  return new Promise((resolve, reject) => {
    fetch(HOST + URL_AUTH + '/login', {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => checkHtppError(res))
      .then(res => res.json())
      .then(user => {
        saveUserToLocalStorage(user);
        Object.assign(authUser, user);
        setAuthState(true);
        startTokenRefreshTimer();
        resolve(user);
      })
      .catch(reject);
  });

}

export function register(userLogin, userPassword) {
  const body = {
    userLogin: userLogin,
    userPassword: userPassword,
  };

  return new Promise((resolve, reject) => {
    fetch(HOST + URL_AUTH + '/signup', {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(user => {
        resolve(user);
      })
      .catch(reject);
  });
}

export function logOut() {
  return new Promise((resolve, reject) => {
    fetch(HOST + URL_AUTH + "/logout", {
      method: "POST",
      body: "",
      headers: {
        "Content-Type": "application/json",
        Authorization: authUser.userAccessToken,
      },
    })
      .then(() => {
        resetUser();
        resolve();
      })
      .catch(reject);
  });
}

export function refreshAccessTokenFromServer(autoupdate = false) {
  if (!tokenHasExpired(authUser.userAccessToken)) {
    return new Promise((resolve, reject) => {
      fetch(HOST + URL_AUTH + "/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authUser.userAccessToken,
        },
      })
        .then(res => res.json())
        .then(user => {
          saveUserToLocalStorage(user);
          Object.assign(authUser, user);
          setAuthState(true);

          if (autoupdate) {
            startTokenRefreshTimer();
          }
          resolve(user);
        })
        .catch(reject);
    });
  }
}

function startTokenRefreshTimer() {
  clearTimeout(tokenRefreshTimerId);
  tokenRefreshTimerId = setTimeout(
    () => refreshAccessTokenFromServer(true),
    getTokenExpiresAfter(authUser.userAccessToken) -
    tokenRefreshTimerDelta
  );
}