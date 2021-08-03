import PropTypes from "prop-types";
import { Item, Image } from "./ImageGalleryItem.styled";

export function GalleryItem({ webformatURL, tags, onImageClick, largeImageURL,}) {
  return (
    <Item onClick={() => onImageClick(largeImageURL)}>
      <Image src={webformatURL} alt={tags}
      />
    </Item>
  );
}

GalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};