import React from "react";
import { Contaier, Overlay } from "./Modal.styled";

const Modal = ({ src, closeModal }) => {
  return (
    <Overlay onClick={closeModal}>
      <Contaier>
        <img src={src} alt="" />
      </Contaier>
    </Overlay>
  );
};

export default Modal;
