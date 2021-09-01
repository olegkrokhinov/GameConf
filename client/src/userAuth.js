const URL_AUTH = "auth/";

export const authenticatedUser = {
  // userid: '',
  // userName: '',
  // userLogin: '',
  // userRoles: [],
  // userAccessToken: ''
};

let tokenRefreshTimerDelta = 60000;
let tokenRefreshTimerId = "";

let userIsAuthentificatedListeners = [];

loadUserFromLocalStorage();
refreshAccessTokenFromServer(true);

export function addListenerToUserIsAuthentificated(listenerCallback) {
  userIsAuthentificatedListeners.push(listenerCallback);
}

export function removeListenerFromUserIsAuthentificated(listenerCallback) {
  let index = userIsAuthentificatedListeners.indexOf(listenerCallback);
  if (index > -1) {
    userIsAuthentificatedListeners.splice(index, 1);
  }
}

function notifyListenersUserIsAuthenticated(authenticated) {
  userIsAuthentificatedListeners.forEach((listener) => listener(authenticated));
}

export function loadUserFromLocalStorage() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && !tokenHasExpired(user.userAccessToken)) {
    Object.assign(authenticatedUser, user);
    notifyListenersUserIsAuthenticated(true);
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
  notifyListenersUserIsAuthenticated(false);
  Object.assign(authenticatedUser, {});
  localStorage.removeItem("user");
  clearTimeout(tokenRefreshTimerId);
}

export function login(userLogin, userPassword) {
  const body = {
    userLogin: userLogin,
    userPassword: userPassword,
  };
  return postUser("login", body, true);
}

export function register(userLogin, userPassword) {
  const body = {
    userLogin: userLogin,
    userPassword: userPassword,
  };
  return postUser("signup", body);
}

export function logOut() {
  return new Promise((resolve, reject) => {
    fetch(URL_AUTH + "logout", {
      method: "POST",
      body: "",
      headers: {
        "Content-Type": "application/json",
        Authorization: authenticatedUser.userAccessToken,
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
  if (!tokenHasExpired(authenticatedUser.userAccessToken)) {
    return new Promise((resolve, reject) => {
      fetch(URL_AUTH + "refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authenticatedUser.userAccessToken,
        },
      })
        .then((res) => res.json())
        .then((user) => {
          saveUserToLocalStorage(user);
          Object.assign(authenticatedUser, user);
          notifyListenersUserIsAuthenticated(true);

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
      const { exp: expires } = JSON.parse(window.atob(payload));
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
      const { exp: expires } = JSON.parse(window.atob(payload));
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
    getTokenExpiresAfter(authenticatedUser.userAccessToken) -
      tokenRefreshTimerDelta
  );
}

function postUser(authPath, authBody, saveToLocalStorage = false) {
  return new Promise((resolve, reject) => {
    fetch(URL_AUTH + authPath, {
      method: "POST",
      body: JSON.stringify(authBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((user) => {
        saveToLocalStorage && saveUserToLocalStorage(user);
        Object.assign(authenticatedUser, user);
        notifyListenersUserIsAuthenticated(true);
        startTokenRefreshTimer();
        resolve(user);
      })
      .catch(reject);
  });
}
