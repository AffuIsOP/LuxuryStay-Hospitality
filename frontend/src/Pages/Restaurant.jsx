import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Restaurant = () => {
  const [menuItems, setMenuItems] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  });

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/dashboard/menu"
        );

        const filteredItems = {
          breakfast: [],
          lunch: [],
          dinner: [],
        };

        response.data.forEach((item) => {
          if (item.status === "available") {
            if (item.foodcategory.menucategoryname === "Breakfast") {
              filteredItems.breakfast.push(item);
            } else if (item.foodcategory.menucategoryname === "Lunch") {
              filteredItems.lunch.push(item);
            } else if (item.foodcategory.menucategoryname === "Dinner") {
              filteredItems.dinner.push(item);
            }
          }
        });
        setMenuItems(filteredItems);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);
  return (
    <>
      <section className="page-header">
        <div
          className="page-header__bg"
          style={{
            backgroundImage: "url(assets/images/backgrounds/header-bg.jpg)",
          }}
        ></div>
        <div className="container">
          <img
            src="assets/images/shapes/page-header-s-1.png"
            alt="Restaurant"
            className="page-header__shape"
          />
          <h2 className="page-header__title">Restaurant</h2>
          <ul className="solinom-breadcrumb list-unstyled">
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>
              <span>Restaurant</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="resturant-one">
        <div className="container">
          <div className="row gutter-y-30">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="resturent-card wow fadeInUp"
                data-wow-duration="1500ms"
                data-wow-delay="200ms"
              >
                <div className="resturent-card__image">
                  <img
                    src="assets/images/resturent/card-1-1.jpg"
                    alt="Best Hotel Service"
                  />
                  <div className="resturent-card__image__group">
                    <span className="resturent-card__image__hover resturent-card__image__hover--1"></span>
                    <span className="resturent-card__image__hover resturent-card__image__hover--2"></span>
                    <span className="resturent-card__image__hover resturent-card__image__hover--3"></span>
                    <span className="resturent-card__image__hover resturent-card__image__hover--4"></span>
                    <span className="resturent-card__image__hover resturent-card__image__hover--5"></span>
                  </div>
                </div>
                <div className="resturent-card__content">
                  <div className="resturent-card__icon">
                    <i className="icon-tray"></i>
                  </div>
                  <h3 className="resturent-card__title">
                    <a href="blog-details-right.html">Best Hotel Service</a>
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="resturent-card wow fadeInUp"
                data-wow-duration="1500ms"
                data-wow-delay="400ms"
              >
                <div className="resturent-card__image">
                  <img
                    src="assets/images/resturent/card-1-2.jpg"
                    alt="Unforgettable Culinary"
                  />
                  <div className="resturent-card__image__group">
                    <span className="resturent-card__image__hover resturent-card__image__hover--1"></span>
                    <span className="resturent-card__image__hover resturent-card__image__hover--2"></span>
                    <span className="resturent-card__image__hover resturent-card__image__hover--3"></span>
                    <span className="resturent-card__image__hover resturent-card__image__hover--4"></span>
                    <span className="resturent-card__image__hover resturent-card__image__hover--5"></span>
                  </div>
                </div>
                <div className="resturent-card__content">
                  <div className="resturent-card__icon">
                    <i className="icon-food"></i>
                  </div>
                  <h3 className="resturent-card__title">
                    <a href="blog-details-right.html">Unforgettable Culinary</a>
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="resturent-card wow fadeInUp"
                data-wow-duration="1500ms"
                data-wow-delay="600ms"
              >
                <div className="resturent-card__image">
                  <img
                    src="assets/images/resturent/card-1-3.jpg"
                    alt="Best Flavors Presented"
                  />
                  <div className="resturent-card__image__group">
                    <span className="resturent-card__image__hover resturent-card__image__hover--1"></span>
                    <span className="resturent-card__image__hover resturent-card__image__hover--2"></span>
                    <span className="resturent-card__image__hover resturent-card__image__hover--3"></span>
                    <span className="resturent-card__image__hover resturent-card__image__hover--4"></span>
                    <span className="resturent-card__image__hover resturent-card__image__hover--5"></span>
                  </div>
                </div>
                <div className="resturent-card__content">
                  <div className="resturent-card__icon">
                    <i className="icon-store"></i>
                  </div>
                  <h3 className="resturent-card__title">
                    <a href="blog-details-right.html">Best Flavors Presented</a>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lunch-menu">
        <div className="container">
          {["breakfast", "lunch", "dinner"].map((category) => {
            const title = category.charAt(0).toUpperCase() + category.slice(1);
            return (
              <div className="row gutter-y-30 padding-top" key={category}>
                <div className="col-lg-6">
                  <div className="lunch-menu__left">
                    <Link to={"/menu"}>
                      <h3
                        className="lunch-menu__title wow fadeInUp"
                        data-wow-duration="1500ms"
                        data-wow-delay="300ms"
                      >
                        {title} Menu
                      </h3>
                    </Link>
                    <div className="lunch-menu__inner">
                      {menuItems[category]
                        .filter((item) => item.status === "available")
                        .slice(0, 3)
                        .map((item) => (
                          <div
                            className="lunch-menu__item wow fadeInUp"
                            data-wow-duration="1500ms"
                            data-wow-delay="300ms"
                            key={item._id}
                          >
                            <div className="lunch-menu__content">
                              <h4 className="lunch-menu__content__title">
                                {item.foodname}
                              </h4>
                              <p className="lunch-menu__content__text">
                                {item.fooddescription}
                              </p>
                            </div>
                            <div className="lunch-menu__price">
                              <div
                                className="lunch-menu__price__thumb"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  src={
                                    item.foodimage ||
                                    "assets/images/resturent/dish-1-1.png"
                                  }
                                  alt="error"
                                  style={{
                                    width: "150px",
                                    height: "150px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    display: "block",
                                  }}
                                />
                              </div>

                              <span className="lunch-menu__price__item">
                                {item.foodprice} rs
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="lunch-menu__right">
                    <div
                      className="lunch-menu__thumb wow fadeInRight"
                      data-wow-duration="1500ms"
                      data-wow-delay="300ms"
                    >
                      <img
                        src="assets/images/resturent/set-1-1.jpg"
                        alt="error"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div
        className="error-404__btns padding-top padding-bottom"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Link
          to={"/menu"}
          className="solinom-btn solinom-btn--base error-404__btn"
          style={{ textAlign: "center" }}
        >
          Check Our Menu
        </Link>
      </div>
    </>
  );
};

export default Restaurant;

/* <div className="row gutter-y-30 flex-lg-row-reverse padding-top"> */
