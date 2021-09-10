let authListeners = [];

export function addAuthStateListener(listener) {
  authListeners.push(listener);
}

export function removeAuthStateListener(listener) {
  let index = authListeners.indexOf(listener);
  if (index > -1) {
    authListeners.splice(index, 1);
  }
}

export function setAuthState(authenticated) {
  authListeners.forEach((listener) => listener(authenticated));
}