import React from "react";
import { Contaier, Overlay } from "./Modal.styled";

const Modal = () => {
  return (
    <Overlay>
      <Contaier>
        <img
          src="https://pixabay.com/get/g2e3b8179202cad343f8b76cc88a5edd8c560581695e97a3e9564760c5ebf17bd3de630437c71687548dccb4284564c7eeb2d39705f85b03804719389901ed4a1_1280.jpg"
          alt=""
        />
      </Contaier>
    </Overlay>
  );
};

export default Modal;
