import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const ModalA = ({ modalOpen, closeModal, openModal, setModalCisOpen, setModalCContent }) => {
    // hook variable declaration
    const [inputValue, setInputValue] = useState("");
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [isEvenChecked, setIsEvenChecked] = useState(false);
    const [allContacts, setAllContacts] = useState([]);

    useEffect(() => {
        fetch("https://contact.mediusware.com/api/contacts/")
            .then(res => res.json())
            .then(data => setAllContacts(data?.results));
    }, []);

    useEffect(() => {
        if (!isEvenChecked) {
            setFilteredContacts(allContacts);
        } else if (isEvenChecked) {
            const data = allContacts.filter(contact => contact.id % 2 === 0);
            setFilteredContacts(data);
        }
    }, [isEvenChecked, allContacts]);

    const handleCheckBoxChange = e => {
        setIsEvenChecked(e.target.checked);
    };

    const handleInputChange = event => {
        const newValue = event.target.value;
        setTimeout(() => {
            setInputValue(newValue);
        }, 500);
    };

    console.log(filteredContacts);
    return (
        <Modal show={modalOpen === "allContacts"} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter" style={{ width: "286px" }}>
                    All Contacts
                </Modal.Title>
                <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">
                        @
                    </span>
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Type Countries"
                        aria-label="Username"
                        aria-describedby="addon-wrapping"
                        onChange={handleInputChange}
                    />
                </div>
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
