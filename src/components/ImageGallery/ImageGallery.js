import PropTypes from "prop-types";
import { Gallery } from "./ImageGallery.styled";
import { GalleryItem } from "../ImageGalleryItem/ImageGalleryItem";

export function ImageGallery({ images, onImageSelect }) {
    // console.log(images)
    return (
        <Gallery>
            {images.map(image => (
                    <GalleryItem
                        key={image.id}
                        webformatURL={image.webformatURL}
                        tags={image.tags}
                        onImageClick={onImageSelect}
                        largeImageURL={image.largeImageURL}
                />
            ))}
        </Gallery>
    )
};
ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImageSelect: PropTypes.func.isRequired,
};