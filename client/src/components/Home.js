import React, { useEffect, useState } from "react";

import { authUser } from "../userAuth";
import {
  addAuthStateListener,
  removeAuthStateListener,
} from "../userAuthListeners";

export default function Home(...props) {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(
    Boolean(authUser?.userAccessToken)
  );

  useEffect(() => {
    addAuthStateListener(setUserIsAuthenticated);
    return () => {
      removeAuthStateListener(setUserIsAuthenticated);
    };
  }, []);

  return (
    <div>
      <h3>Home page</h3>
      {userIsAuthenticated && (
        <div>
          <div>Hello, {authUser.userLogin}!</div>
          <div>User roles: </div>
          {authUser.userRoles.map((role, index) => {
            return <div key={index}>{role.name}</div>;
          })}
        </div>
      )}
      {!userIsAuthenticated && (
        <div>Hello Guest! To have acces to items please login.</div>
      )}
    </div>
  );
}
