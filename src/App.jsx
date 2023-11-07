import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import logo from "./assets/images/logo-teal.svg";
// import star from "./assets/icons/fonts/";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [basketContent, setBasketContent] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3100/");
    // je dois remplacer par mon URL Northflank (aller dans PORTS etc., ouvrir le lien et copier l'url complète) dès que je l'ai
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("useEffect executed");
  }, [basketContent]);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <header>
        <div className="TopBar">
          <div className="TopBar--center">
            <img className="Logo" src={logo} alt="logo teal deliveroo" />
          </div>
        </div>
        <div className="RestaurantInfos">
          <div className="RestaurantInfos--center">
            <div className="RestaurantInfos--texts">
              <h1>{data.restaurant.name}</h1>
              <p>{data.restaurant.description}</p>
            </div>
            <img
              className="RestaurantInfos--cover"
              src={data.restaurant.picture}
              alt="Image du restaurant"
            />
          </div>
        </div>
      </header>
      <div className="Content">
        <div className="Content--center">
          <div className="Menu">
            <div className="MenuItems">
              {data.categories.map((category) => {
                if (category.meals.length !== 0) {
                  return (
                    <section key={category.name}>
                      <h2>{category.name}</h2>
                      <div className="MenuItems--items">
                        {category.meals.map((meal) => {
                          return (
                            <div
                              key={meal.id}
                              onClick={() => {
                                console.log(meal);
                                basketContent.push(meal);
                              }}
                              className="MenuItem"
                            >
                              <div className="MenuItem--card">
                                <div className="MenuItem--texts">
                                  <h3>{meal.title}</h3>
                                  <p>{meal.description}</p>
                                  <div className="MenuItem--infos">
                                    <span className="MenuItem--price">
                                      {meal.price} €
                                    </span>
                                    {meal.popular && (
                                      // <img src="" alt="star" />
                                      <span className="MenuItem--popular">
                                        Populaire
                                      </span>
                                    )}
                                  </div>
                                </div>
                                {meal.picture && (
                                  <div className="MenuItem--picture">
                                    <img
                                      src={meal.picture}
                                      alt="meal picture"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  );
                } else return null;
              })}
            </div>
          </div>
          <div className="Cart">
            <div className="Cart--card">
              <div className="Cart--validate">Valider mon panier</div>
              <div className="Cart-minus-cart-container">
                <div className="Cart--items">
                  {basketContent.map((item) => {
                    return (
                      <div key="id" className="Cart--line">
                        <div className="Cart--counter">
                          <span>-</span>
                          <span>2</span>
                          <span>+</span>
                        </div>
                        <span className="Cart--item-name">{item.title}</span>
                        <span className="Cart--amount">{item.price}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="Cart--results">
                  <div className="Cart--result-line">
                    <span className="Cart--result-name">Sous-total</span>
                    <span className="Cart--amount">70.80€</span>
                  </div>
                  <div className="Cart--result-line">
                    <span className="Cart--result-name">
                      Frais de livraison
                    </span>
                    <span className="Cart--amount">2.50€</span>
                  </div>
                </div>
                <div className="Cart--total">
                  <span className="Cart--result-name">Total</span>
                  <span className="Cart--amount">73.30€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
