// import PropTypes from "prop-types";
import { Component } from "react";
import { createPortal } from 'react-dom';
import { Overlay, ModalContainer, Image } from "./Modal.styled";

const modalRoot = document.querySelector("#modal-root");

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
        <Overlay onClick={this.handleOverlayClick}>
            <ModalContainer>
                <Image src={this.props.largeImageURL} alt=""/>
            </ModalContainer>
      </Overlay>,
      modalRoot,
    );
  }
}
