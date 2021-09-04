import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ModalComponent = ({ show, onClose, item }) => {
  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className={"modal"}
      overlayClassName={"overlay"}
    >
      <div className={"close-btn-ctn"}>
        <h1 style={{ flex: "1 90%" }}>{item.title}</h1>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>
      <div>
        <h2>Description</h2>
        <p>{item.content}</p>
        <h2>Status</h2>
        <p>
          {item.icon}{" "}
          {`${item.board.charAt(0).toUpperCase()}${item.board.slice(1)}`}
        </p>
      </div>
    </Modal>
  );
};

export default ModalComponent;
