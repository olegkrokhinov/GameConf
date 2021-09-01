import React, { useEffect, useState } from "react";

import { authenticatedUser } from "../userAuth";
import {
  addListenerToUserIsAuthentificated,
  removeListenerFromUserIsAuthentificated,
} from "../userAuth";

export default function Home(...props) {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(
    Boolean(authenticatedUser?.userAccessToken)
  );
  console.log(userIsAuthenticated);
  addListenerToUserIsAuthentificated(setUserIsAuthenticated);

  useEffect(() => {
    return () => {
      removeListenerFromUserIsAuthentificated(setUserIsAuthenticated);
    };
  }, []);

  return (
    <div>
      <h3>Home page</h3>
      {userIsAuthenticated && (
        <div>
          <div>Hello, {authenticatedUser.userLogin}!</div>
          <div>User roles: </div>
          {authenticatedUser.userRoles.map((role, index) => {
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
