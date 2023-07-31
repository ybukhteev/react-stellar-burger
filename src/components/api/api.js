import React from "react";

class Api extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = 'https://norma.nomoreparties.space/api';
    this.ingredientsEndPoint = "ingredients";
    this.orderEndPoint = "orders";
    this.headers = {
      "Content-Type": "application/json"
    };

  }

  getResources(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getIngredients = () => {
    return fetch(`${this.baseUrl}/${this.ingredientsEndPoint}`)
      .then(this.getResources);
  };

  getOrderNum = (ingredientsArray) => {
    return fetch(`${this.baseUrl}/${this.orderEndPoint}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        ingredients: ingredientsArray,
      }),
    }).then(this.getResources);
  }

}

export default Api;