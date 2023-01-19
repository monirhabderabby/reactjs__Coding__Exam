import React, { useState } from "react";
import { ModalA } from "./modal/ModalA";
import { ModalB } from "./modal/ModalB";
import { ModalC } from "./modal/ModalC";

const Problem2 = () => {
    const [modalCisOpen, setModalCisOpen] = useState(false);
    const [modalCContent, setModalCContent] = useState("");
    const [modalOpen, setModalOpen] = useState("");

    const openModal = val => {
        setModalOpen(val);
    };
    const closeModal = () => {
        setModalOpen("");
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <button
                        type="button"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                        onClick={() => openModal("allContacts")}
                    >
                        All Contacts
                    </button>
                    <button
                        type="button"
                        class="btn btn-lg btn-outline-warning"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                        onClick={() => openModal("usContacts")}
                    >
                        US Contacts
                    </button>
                </div>
                {modalOpen === "allContacts" && <ModalA {...{ modalOpen, closeModal, openModal, setModalCisOpen, setModalCContent }} />}
                {modalOpen === "usContacts" && <ModalB {...{ modalOpen, closeModal, openModal, setModalCisOpen, setModalCContent }} />}
                {modalCisOpen && <ModalC {...{ setModalCisOpen, modalCisOpen, modalCContent, openModal }} />}
            </div>
        </div>
    );
};

export default Problem2;
