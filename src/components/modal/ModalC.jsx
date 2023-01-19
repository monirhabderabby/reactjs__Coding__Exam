import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const ModalC = ({ modalCisOpen, setModalCisOpen, modalCContent, openModal }) => {
    return (
        <Modal show={modalCisOpen} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">Contact Details of {modalCContent?.phone}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <p>Country: {modalCContent?.country?.name}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => {
                        openModal("allContacts");
                        setModalCisOpen(false);
                    }}
                    style={{ backgroundColor: "#46139f" }}
                >
                    All Contacts
                </Button>
                <Button
                    onClick={() => {
                        openModal("usContacts");
                        setModalCisOpen(false);
                    }}
                    style={{ backgroundColor: "#ff7f50" }}
                >
                    US Contacts
                </Button>
                <Button onClick={() => setModalCisOpen(false)} style={{ backgroundColor: "#46139f" }}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
