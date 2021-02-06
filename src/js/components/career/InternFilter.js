import React from "react";
import {
  Header,
  Checkbox,
  Dropdown,
  Segment,
  Divider,
} from "semantic-ui-react";

const PaymentOptions = [
  { text: "Over 1000 yen", value: 0 },
  { text: "Over 2000 yen", value: 1 },
  { text: "Over 3000 yen", value: 2 },
  { text: "Others", value: 3 },
];

const InternFilter = () => {
  return (
    <Segment
      style={{
        width: "25em",
        position: "fixed",
        left: "1000px",
        // right: 10,
        overflow: "visible",
      }}
    >
      <div>
        <Header as="h2">Field</Header>
        <Checkbox
          style={{
            width: "40px",
            marginLeft: "0.5em",
            marginRight: "3.5em",
            marginBottom: "1em",
            transform: "scale(1.2)",
          }}
          label={<label>&nbsp;Maker</label>}
        />
        <Checkbox
          style={{
            width: "40px",
            marginLeft: "2.5em",
            transform: "scale(1.2)",
          }}
          label={<label>&nbsp;Service</label>}
        />
        <br />
        <Checkbox
          style={{
            width: "40px",
            marginLeft: "0.5em",
            marginRight: "3.5em",
            marginBottom: "1em",
            transform: "scale(1.2)",
          }}
          label={<label>&nbsp;Finance</label>}
        />
        <Checkbox
          style={{
            width: "40px",
            marginLeft: "2.5em",
            transform: "scale(1.2)",
          }}
          label={<label>&nbsp;Office</label>}
        />
        <br />
        <Checkbox
          style={{
            width: "40px",
            marginLeft: "0.5em",
            marginRight: "3.5em",
            transform: "scale(1.2)",
          }}
          label={<label>&nbsp;IT</label>}
        />
        <Checkbox
          style={{
            marginLeft: "2.5em",
            transform: "scale(1.2)",
            width: "40px",
          }}
          label={<label>&nbsp;Consulting</label>}
        />
        <Divider />
        <Header as="h2">Language</Header>
        <Checkbox
          style={{
            marginLeft: "0.5em",
            marginRight: "3.5em",
            marginBottom: "1em",
            transform: "scale(1.2)",
            width: "40px",
          }}
          label={<label>&nbsp;JP</label>}
        />
        <Checkbox
          style={{
            marginLeft: "2.5em",
            transform: "scale(1.2)",
            width: "40px",
          }}
          label={<label>&nbsp;EN</label>}
        />
        <br />
        <Checkbox
          style={{
            marginLeft: "0.5em",
            transform: "scale(1.2)",
            width: "40px",
          }}
          label={<label>&nbsp;Bilingual</label>}
        />
        <Divider />
        <Header as="h2">Payment</Header>
        <Dropdown
          placeholder="Payment"
          fluid
          selection
          options={PaymentOptions}
        />
      </div>
    </Segment>
  );
};

export default InternFilter;
