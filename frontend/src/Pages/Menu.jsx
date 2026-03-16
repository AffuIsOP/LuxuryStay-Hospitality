import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/dashboard/menu"
        );
        const activeMenuItems = response.data.filter(
          (item) => item.status === "available"
        );
        setMenuItems(activeMenuItems);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  // Combine category and search filtering
  useEffect(() => {
    let filtered = menuItems;

    // Filter by category if not 'all'
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (item) =>
          item.foodcategory.menucategoryname.toLowerCase() === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.foodname.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [selectedCategory, searchQuery, menuItems]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.toLowerCase());
  };

  return (
    <div>
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
            alt="products right sidebar"
            className="page-header__shape"
          />
          <h2 className="page-header__title">Menu</h2>
          <ul className="solinom-breadcrumb list-unstyled">
            <li>
              <a href="/restaurant">Restaurant</a>
            </li>
            <li>
              <span>Menu</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="product-one product-one--page">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="row gutter-y-30">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <div className="col-md-6 col-lg-4" key={item._id}>
                      <div
                        className="product__item wow fadeInUp"
                        data-wow-duration="1500ms"
                      >
                        <div className="product__item__img">
                          <div
                            className="product__item__img__item"
                            style={{
                              width: "125px",
                              height: "125px",
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
                              alt={item.foodname || "Food Image"}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <div className="product__item__btn">
                            <a href="cart.html">
                              <i className="far fa-heart"></i>
                            </a>
                            <a href="product-details.html">
                              <i className="fas fa-eye"></i>
                            </a>
                          </div>
                        </div>
                        <div className="product__item__content">
                          <h4 className="product__item__title">
                            <Link to="/product-details">{item.foodname}</Link>
                          </h4>
                          <div className="product__item__price">
                            {item.foodprice} rs
                          </div>
                          <a
                            href="cart.html"
                            className="solinom-btn product__item__link"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>
                    No items found for the selected category and search query.
                  </p>
                )}
              </div>
            </div>

            <div className="col-lg-3">
              <div className="product__sidebar product__sidebar-right">
                <div
                  className="product__search wow fadeInUp"
                  data-wow-delay="500ms"
                >
                  <form action="#" className="product__sidebar__search">
                    <button type="submit" aria-label="search submit">
                      <span>
                        <i className="icon-search"></i>
                      </span>
                    </button>
                    <input
                      type="text"
                      placeholder="Search by food name"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </form>
                </div>

                <div
                  className="product__categories wow fadeInUp"
                  data-wow-delay="900ms"
                >
                  <h3 className="product__categories__title">Categories</h3>
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        onClick={() => handleCategoryClick("Breakfast")}
                        className={
                          selectedCategory === "breakfast" ? "active" : ""
                        }
                      >
                        <i className="icon-right-arrow2"></i>Breakfast
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => handleCategoryClick("Lunch")}
                        className={selectedCategory === "lunch" ? "active" : ""}
                      >
                        <i className="icon-right-arrow2"></i>Lunch
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => handleCategoryClick("Dinner")}
                        className={
                          selectedCategory === "dinner" ? "active" : ""
                        }
                      >
                        <i className="icon-right-arrow2"></i>Dinner
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
