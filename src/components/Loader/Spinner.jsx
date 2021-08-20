import Loader from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import React from "react";
import { Container } from "./Container.styled";

export const Spinner = () => {
  return (
    <>
      <Container>
        <Loader
          type="Oval"
          color="#3f51b5"
          height={100}
          width={100}
          timeout={2000}
        />
      </Container>
    </>
  );
};
