
export function tokenHasExpired(jwtToken) {
  if (jwtToken) {
    try {
      const [, payload] = jwtToken.split(".");
      const {
        exp: expires
      } = JSON.parse(window.atob(payload));
      if (typeof expires === "number") {
        return Date.now() > expires * 1000;
      }
    } catch { }
  }
  return true;
}
export function getTokenExpiresAfter(jwtToken) {
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
    } catch { }
  }
  return null;
}