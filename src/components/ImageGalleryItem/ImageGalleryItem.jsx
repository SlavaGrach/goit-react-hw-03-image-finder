import React from "react";
import PropTypes from "prop-types";
import { Item } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({ src, alt, largeImageURL, onSelect }) => {
  return (
    <Item
      onClick={() => {
        onSelect(largeImageURL);
      }}
    >
      <img src={src} alt={alt} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default ImageGalleryItem;

/*
id - уникальный идентификатор
webformatURL - ссылка на маленькое изображение для списка карточек
largeImageURL - ссылка на большое изображение для модального окна
*/
