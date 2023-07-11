import React from "react";

class Api extends React.Component {
  constructor(props) {
    super(props);

    this.baseUrl = 'https://norma.nomoreparties.space/api/ingredients';
  }

  getResources = async (url) => {
    const res = await fetch(url);

    if (res.ok) {
      return await res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getIngredients = () => {
    return this.getResources(`${this.baseUrl}`)
  };
}

export default Api;