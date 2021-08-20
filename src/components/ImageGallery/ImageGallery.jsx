import React from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import { List } from "./ImageGallery.styled";

const ImageGallery = ({ images, onSelect }) => {
  return (
    <div>
      <List>
        {images.map((image) => {
          const { id, webformatURL, tags, largeImageURL } = image;
          return (
            <ImageGalleryItem
              onSelect={onSelect}
              key={id}
              src={webformatURL}
              alt={tags}
              largeImageURL={largeImageURL}
            />
          );
        })}
      </List>
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array,
};

export default ImageGallery;
