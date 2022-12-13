import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

function ModalComponent(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Holiday
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="DD-MM-YYYY"
              aria-label="Date"
              aria-describedby="basic-addon1"
              onChange={(e) => props.addDateFn(e.target.value)}
            />
          </InputGroup>
        </div>
        <div>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Holiday Descripation"
              aria-label="Holiday Descripation"
              aria-describedby="basic-addon1"
              onChange={(e) => props.addDescFn(e.target.value)}
            />
          </InputGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.onAddHoliday()}>ADD</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;
