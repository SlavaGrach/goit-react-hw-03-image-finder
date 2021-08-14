import React from "react";
import PropTypes from "prop-types";
import { Item } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({ id, src, alt }) => {
  return (
    <>
      <Item>
        <img src={src} alt={alt} />
      </Item>
    </>
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
