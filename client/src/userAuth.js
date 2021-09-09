import {
  HOST
} from './config'

const URL_AUTH = "/auth";

export const authUser = {
  userid: '',
  userName: '',
  userLogin: '',
  userRoles: [],
  userAccessToken: ''
};

let tokenRefreshTimerDelta = 60000;
let tokenRefreshTimerId = "";

let authListeners = [];

loadUserFromLocalStorage();
refreshAccessTokenFromServer(true);

export function addAuthStateListener(listener) {
  authListeners.push(listener);
}

export function removeAuthStateListener(listener) {
  let index = authListeners.indexOf(listener);
  if (index > -1) {
    authListeners.splice(index, 1);
  }
}

function setAuthState(authenticated) {
  authListeners.forEach((listener) => listener(authenticated));
}

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
  setAuthState(false);
  Object.assign(authUser, {});
  localStorage.removeItem("user");
  clearTimeout(tokenRefreshTimerId);
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
      .then((res) => res.json())
      .then((user) => {
        console.log(user)
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
      .then((res) => res.json())
      .then((user) => {
        console.log(user)
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
        .then((res) => res.json())
        .then((user) => {
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

function tokenHasExpired(jwtToken) {
  if (jwtToken) {
    try {
      const [, payload] = jwtToken.split(".");
      const {
        exp: expires
      } = JSON.parse(window.atob(payload));
      if (typeof expires === "number") {
        return Date.now() > expires * 1000;
      }
    } catch {}
  }
  return true;
}

function getTokenExpiresAfter(jwtToken) {
  if (jwtToken) {
    try {
      const [, payload] = jwtToken.split(".");
      const {
        exp: expires
      } = JSON.parse(window.atob(payload));
      if (typeof expires === "number") {
        if (Date.now() < expires * 1000) {
          return expires * 1000 - Date.now();
        }
      }
    } catch {}
  }
  return null;
}

function startTokenRefreshTimer() {
  clearTimeout(tokenRefreshTimerId);
  tokenRefreshTimerId = setTimeout(
    () => refreshAccessTokenFromServer(true),
    getTokenExpiresAfter(authUser.userAccessToken) -
    tokenRefreshTimerDelta
  );
}