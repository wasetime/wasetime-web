import React from "react";
import { Popup } from "semantic-ui-react";
import styled from "styled-components";
import wechat from "../../../img/aboutus/socialmediaicon/wechat.png";
import facebook from "../../../img/aboutus/socialmediaicon/facebook.png";

const MediaIcon = styled("img")`
  // width:100%;
  width: 1.3em;
  margin: 4px;
  // text-align:center;
`;

const qrcode = styled("img")`
  width: 2em;
`;
const WeChatQRcode = ({ qrcode }) => (
  <Popup
    on="click"
    trigger={
      <button>
        <MediaIcon src={facebook}></MediaIcon>
      </button>
    }
  >
    <Popup.Content>
      <img src={qrcode} />
    </Popup.Content>
  </Popup>
);
export default WeChatQRcode;
