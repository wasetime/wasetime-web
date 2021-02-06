import React from "react";
import {
  Button,
  Header,
  Radio,
  Modal,
  Checkbox,
  Form,
} from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FloatingActionButton } from "../../styled-components/Button";

const InternFilterModal = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <FloatingActionButton width="56px" borderRadius="30px">
          <FontAwesomeIcon
            onClick={() => setOpen(!open)}
            icon={open ? faTimes : faFilter}
            size="2x"
            transform="shrink-3"
          />
        </FloatingActionButton>
      }
    >
      <Modal.Content>
        <Header as="h2">Field</Header>
        <Checkbox
          style={{ marginRight: "3.5em" }}
          label={<label>&nbsp;Maker</label>}
        />
        <Checkbox
          style={{ marginRight: "3.5em" }}
          label={<label>&nbsp;Service</label>}
        />
        <Checkbox
          style={{ marginRight: "3.5em" }}
          label={<label>&nbsp;Finance</label>}
        />
        <Checkbox
          style={{ marginRight: "3.5em" }}
          label={<label>&nbsp;Office</label>}
        />
        <Checkbox
          style={{ marginRight: "3.5em" }}
          label={<label>&nbsp;IT</label>}
        />
        <Checkbox label={<label>&nbsp;Consulting</label>} />
        <Header as="h2">Language</Header>
        <Checkbox
          style={{
            marginRight: "3.5em",
          }}
          label={<label>&nbsp;JP</label>}
        />
        <Checkbox
          style={{
            marginRight: "3.5em",
          }}
          label={<label>&nbsp;EN</label>}
        />
        <Checkbox label={<label>&nbsp;Bilingual</label>} />
        <Header as="h2">Payment</Header>
        <Radio
          style={{
            marginRight: "3.5em",
          }}
          label={<label>&nbsp;Over 1000 yen</label>}
          value="a"
        />
        <Radio
          style={{
            marginRight: "3.5em",
          }}
          label={<label>&nbsp;Over 2000 yen</label>}
        />
        <Radio
          style={{
            marginRight: "3.5em",
          }}
          label={<label>&nbsp;Over 3000 yen</label>}
        />
        <Radio label={<label>&nbsp;Others</label>} value="d" />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Close</Button>
        <Button onClick={() => setOpen(false)} positive>
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default InternFilterModal;
