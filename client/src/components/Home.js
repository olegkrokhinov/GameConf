import React from "react";

import { authUser } from "../userAuth";
import AuthWrap from "./AuthWrap";

export default function Home({ setAppBarTitle, ...props }) {

  return (
    <div>
      <h3>Home page</h3>
      <AuthWrap authenticated>
        <div>
          <div>Hello, {authUser.userLogin}!</div>
          <div>User roles: </div>
          {authUser.userRoles.map((role, index) => {
            return <div key={index}>{role.name}</div>;
          })}
        </div>
      </AuthWrap>
      <AuthWrap>
        <div>Hello Guest! To have acces to items please login.</div>
      </AuthWrap>
    </div>
  );
}
