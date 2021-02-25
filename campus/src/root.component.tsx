import React from "react";
import "./configs/i18n.ts";
import Bus from "./bus/Bus";
import RoomFinder from "./room/RoomFinder"
// import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Root(props) {
  return (
    <section>
      <RoomFinder />
      <Bus />
    </section>
  );
}
