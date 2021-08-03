// import PropTypes from "prop-types";
import { useEffect } from "react";
import { createPortal } from 'react-dom';
import { Overlay, ModalContainer, Image } from "./Modal.styled";

const modalRoot = document.querySelector("#modal-root");

export function Modal ({largeImageURL, onClose}) {
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
        window.addEventListener("keydown", handleKeyDown)
        }
    })

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
    return createPortal(
        <Overlay onClick={handleOverlayClick}>
            <ModalContainer>
                <Image src={largeImageURL} alt=""/>
            </ModalContainer>
      </Overlay>,
      modalRoot,
    );
}
