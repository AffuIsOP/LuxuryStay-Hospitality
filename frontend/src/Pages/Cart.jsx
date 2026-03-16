import React from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <>
      {/* Page Header */}
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
            alt="Cart"
            className="page-header__shape"
          />
          <h2 className="page-header__title">Cart</h2>
          <ul className="solinom-breadcrumb list-unstyled">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <span>Rooms</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Cart Section */}
      <section className="cart-page">
        <div className="container">
          <div className="table-responsive">
            <table className="table cart-page__table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="cart-page__table__meta">
                      <div className="cart-page__table__meta-img">
                        <img
                          src="assets/images/products/cart-1-1.jpg"
                          alt="Office Chair"
                        />
                      </div>
                      <h3 className="cart-page__table__meta-title">
                        <a href="product-details.html">Office Chair</a>
                      </h3>
                    </div>
                  </td>
                  <td>$10.99</td>
                  <td>
                    <div className="product-details__quantity">
                      <div className="quantity-box">
                        <button type="button" className="sub">
                          <i className="fa fa-minus"></i>
                        </button>
                        <input type="text" value="1" readOnly />
                        <button type="button" className="add">
                          <i className="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>$10.99</td>
                  <td>
                    <Link className="table cart-page__table__remove">
                      <span className="fa fa-times"></span>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Cart Totals */}
          <div className="row">
            <div className="col-xl-4 col-lg-5 offset-xl-8 offset-lg-7">
              <ul className="cart-page__cart-total list-unstyled">
                <li>
                  <span>Subtotal</span>
                  <span className="cart-page__cart-total-amount">$20.33</span>
                </li>
                <li>
                  <span>Shipping</span>
                  <span className="cart-page__cart-total-amount">$0.00</span>
                </li>
                <li>
                  <span>Total</span>
                  <span className="cart-page__cart-total-amount">$20.33</span>
                </li>
              </ul>
              <div className="cart-page__buttons">
                <Link href="#" className="solinom-btn">
                  Update
                </Link>
                <a href="/checkout" className="solinom-btn solinom-btn--base">
                  Checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
