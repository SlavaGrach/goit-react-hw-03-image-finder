import React from "react";

import PropTypes from "prop-types";
import { HeaderBar, SearchForm } from "./SearchBar.styled";

const SearchBar = ({ onSubmit }) => {
  return (
    <>
      <HeaderBar>
        <SearchForm
          // не используем контролируемый компонент чтобы небыло лишних рендеров
          onSubmit={(e) => {
            e.preventDefault();
            const value = e.target.elements.imageName.value.trim();
            if (!value) {
              return;
            }
            onSubmit(value);
            // console.log(e.target.elements.imageName.value);
          }}
        >
          <button type="submit">
            <span>Search</span>
          </button>

          <input
            type="text"
            name="imageName"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </HeaderBar>
    </>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchBar;
