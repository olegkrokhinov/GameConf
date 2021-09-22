import React, { useState } from "react";
import Content from "./components/Content.js";
import LeftBar from "./components/LeftBar.js";
import TopBar from "./components/TopBar.js";

export default function App() {
  const [drawer, setDrawer] = useState(false);
  const [appBarTitle, setAppBarTitle] = useState("Game");

  return (
    <>
      <TopBar appBarTitle={appBarTitle} setDrawer={setDrawer} />
      <LeftBar drawer={drawer} setDrawer={setDrawer} />
      <Content setAppBarTitle={setAppBarTitle} />
    </>
  );
}
