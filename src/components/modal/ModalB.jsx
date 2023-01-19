import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const ModalB = ({ modalOpen, closeModal, openModal, setModalCisOpen, setModalCContent }) => {
    const [allUSContacts, setAllUSContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [isEvenChecked, setIsEvenChecked] = useState(false);

    useEffect(() => {
        fetch("https://contact.mediusware.com/api/contacts/")
            .then(res => res.json())
            .then(data => {
                const allUSContacts = data?.results?.filter(contact => contact.country.name.includes("United States"));
                setAllUSContacts(allUSContacts);
            });
    }, []);

    useEffect(() => {
        if (!isEvenChecked) {
            setFilteredContacts(allUSContacts);
        } else if (isEvenChecked) {
            const data = allUSContacts.filter(contact => contact.id % 2 === 0);
            setFilteredContacts(data);
        }
    }, [isEvenChecked, allUSContacts]);

    const handleCheckBoxChange = e => {
        setIsEvenChecked(e.target.checked);
    };
    return (
        <Modal show={modalOpen === "usContacts"} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">US Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    {filteredContacts?.map(contact => {
                        return (
                            <div className="col-4 border g-col-4 p-2">
                                <p>{contact?.country?.name}</p>
                                <p>{contact?.phone}</p>
                                <button
                                    className="btn btn-info"
                                    onClick={() => {
                                        setModalCisOpen(true);
                                        setModalCContent(contact);
                                        closeModal();
                                    }}
                                >
                                    View
                                </button>
                            </div>
                        );
                    })}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={handleCheckBoxChange} />
                    <label class="form-check-label" for="flexCheckDefault">
                        Only Even
                    </label>
                </div>
                <Button onClick={() => openModal("allContacts")} style={{ backgroundColor: "#46139f" }}>
                    All Contacts
                </Button>
                <Button onClick={() => openModal("usContacts")} style={{ backgroundColor: "#ff7f50" }}>
                    US Contacts
                </Button>
                <Button onClick={closeModal} style={{ backgroundColor: "#46139f" }}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
