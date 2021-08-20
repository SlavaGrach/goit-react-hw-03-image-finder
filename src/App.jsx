import "./App.css";
import React, { Component } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SearchBar from "./components/Searchbar/SearchBar";
import { Api } from "./services/api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { Button } from "./components/Button/Button";
import { Spinner } from "./components/Loader/Spinner";
import Modal from "./components/Modal/Modal";

export default class App extends Component {
  state = {
    imageName: null,
    images: [],
    page: 1,
    reqStatus: "idle", // idle, pending, resolved, rejected
    selectedImage: null,
  };

  async componentDidUpdate(_, prevState) {
    //асиннхронный вызов
    const { imageName, page, selectedImage } = this.state;
    if (prevState.imageName !== imageName || prevState.page !== page) {
      try {
        this.setState({ reqStatus: "pending" });
        const images = await Api.getImages(imageName, page);
        if (!images.length) {
          throw new Error();
        }
        const reqStatus = "resolved";
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          reqStatus: reqStatus,
        }));
      } catch (error) {
        this.setState({
          status: "rejected",
        });
        toast.warning(`Not Found any images by query: ${imageName}`);
      }
      page > 1 && // если больше одной страницы, то скролим
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
    }
    selectedImage && window.addEventListener("keydown", this.handlerPressKey);
  }

  // получаем имя изображения из формы и записываем в state
  hendleFormSubmit = (imageName) => {
    this.resetState(); //очистка состояния перед запросом
    this.setState({ imageName });
  };

  // действие при выборе изображения в галерее, в стате передаем ссылку на большое изображение
  handleSelectImage = (imageURL) => {
    this.setState({ selectedImage: imageURL });
  };

  handleCloseModal = (e) => {
    if (e.target.nodeName === "IMG") {
      return;
    }
    this.setState({ selectedImage: null });
  };

  handlerPressKey = (e) => {
    if (e.key === "Escape") {
      this.setState({ selectedImage: null });
    }
  };

  // действие по нажалию кнопки "LOAD MORE" с стайте увеличиваем значение page на 1
  handleLoadMoreClick = () => {
    this.setState({ page: this.state.page + 1 });
  };

  // сброс state перед новым запросом
  resetState = () => {
    this.setState({
      imageName: null,
      images: [],
      page: 1,
      reqStatus: "idle",
      modalIsOpen: false,
    });
  };

  render() {
    const { reqStatus, images, selectedImage } = this.state;

    return (
      <div className="App">
        <SearchBar onSubmit={this.hendleFormSubmit} />
        {reqStatus === "pending" && <Spinner />}
        <ImageGallery
          images={images}
          // onClick={this.handleSelectImage}
          onSelect={this.handleSelectImage}
        />
        {selectedImage && (
          <Modal closeModal={this.handleCloseModal} src={selectedImage} />
        )}
        {images.length > 0 && <Button onClick={this.handleLoadMoreClick} />}
        <ToastContainer />
      </div>
    );
  }
}
