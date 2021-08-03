import PropTypes from 'prop-types';
import { Btn } from "./Button.styled";

export function LoadBtn({ onClick }) {
    return (
    <Btn type="button" onClick={onClick}>
      Load more
    </Btn>
  );
};

LoadBtn.prototypes = {
  onClick: PropTypes.func.isRequired,
};