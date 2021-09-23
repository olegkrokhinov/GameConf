import React, { useEffect, useState } from "react";

import { authUser } from "../userAuth.js";

import {
  addAuthStateListener,
  removeAuthStateListener,
} from "../userAuthListeners";

export default function AuthWrap({ authenticated, children }) {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(
    Boolean(authUser?.userAccessToken)
  );
  useEffect(() => {
    addAuthStateListener(setUserIsAuthenticated);
    return () => removeAuthStateListener(setUserIsAuthenticated);
  }, []);

  return (
    <>
      {authenticated && userIsAuthenticated && children}
      {!authenticated && !userIsAuthenticated && children}
    </>
  );
}
