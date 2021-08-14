import "./App.css";
import React, { Component } from "react";
import SearchBar from "./components/Searchbar/SearchBar";

import { Api } from "./services/api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { Button } from "./components/Button/Button";
import { Spinner } from "./components/Loader/Spinner";

export default class App extends Component {
  state = {
    imageName: null,
    images: [],
    page: 1,
    reqStatus: "idle", // idle, pending, resolved, rejected
  };

  async componentDidUpdate(_, prevState) {
    //асиннхронный вызов
    const { imageName, page } = this.state;
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
      }
      page > 1 && // если больше одной страницы, то скролим
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
    }
  }

  // получаем имя изображения из формы и записываем в state
  hendleFormSubmit = (imageName) => {
    this.resetState(); //очистка состояния перед запросом
    this.setState({ imageName });
  };

  // действие по нажалию кнопки "LOAD MORE" с стайте увеличиваем значение page на 1
  handleLoadMoreClick = () => {
    this.setState({ page: this.state.page + 1 });
  };

  resetState = () => {
    this.setState({
      imageName: null,
      images: [],
      page: 1,
      reqStatus: "idle",
    });
  };

  render() {
    const { reqStatus, images } = this.state;

    return (
      <div className="App">
        <SearchBar onSubmit={this.hendleFormSubmit} />
        {reqStatus === "pending" && <Spinner />}
        <ImageGallery images={images} />
        {images.length > 0 && <Button onClick={this.handleLoadMoreClick} />}
      </div>
    );
  }
}
