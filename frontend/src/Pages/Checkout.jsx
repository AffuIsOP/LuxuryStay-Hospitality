import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Checkout = () => {

    const [activePayment, setActivePayment] = useState('direct-bank-transfer'); // state to track the active payment option

    const togglePayment = (paymentType) => {
      setActivePayment(paymentType); // update the active payment option
    };
  return (
    <> {/* Page Header */}
    <section className="page-header">
      <div
        className="page-header__bg"
        style={{ backgroundImage: 'url(assets/images/backgrounds/header-bg.jpg)' }}
      ></div>
      <div className="container">
        <img
          src="assets/images/shapes/page-header-s-1.png"
          alt="Checkout"
          className="page-header__shape"
        />
        <h2 className="page-header__title">Checkout</h2>
        <ul className="solinom-breadcrumb list-unstyled">
          <li>
            <a href="index.html">Home</a>
          </li>
          <li>
            <span>Rooms</span>
          </li>
        </ul>
      </div>
    </section>

    {/* Checkout Start */}
    <section className="checkout-page">
      <div className="container">
        <div className="row">
          {/* Billing Details */}
          <div className="col-xl-6 col-lg-6">
            <div className="checkout-page__billing-address">
              <h2 className="checkout-page__billing-address__title">Billing Details</h2>
              <form className="checkout-page__form">
                <div className="row bs-gutter-x-20">
                  <div className="col-xl-6">
                    <div className="checkout-page__input-box">
                      <input
                        type="text"
                        name="first-name"
                        placeholder="First Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="checkout-page__input-box">
                      <input
                        type="text"
                        name="last-name"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="checkout-page__input-box">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="checkout-page__input-box">
                      <input
                        type="tel"
                        name="form-phone"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        required
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-12">
                    <div className="checkout-page__input-box">
                      <input
                        type="text"
                        name="company-name"
                        placeholder="Company"
                      />
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="checkout-page__input-box">
                      <input
                        type="text"
                        name="address"
                        placeholder="Address"
                      />
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="checkout-page__input-box">
                      <input
                        type="text"
                        name="company-name"
                        placeholder="Apartment, Unit, etc(optional)"
                      />
                    </div>
                  </div>
                </div>
                <div className="row bs-gutter-x-20">
                  <div className="col-xl-6">
                    <div className="checkout-page__input-box">
                      <input
                        type="text"
                        name="state"
                        placeholder="Town/City"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="checkout-page__input-box">
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="checkout-page__input-box">
                      <input
                        name="form_zip"
                        type="text"
                        pattern="[0-9]*"
                        placeholder="Zip Code"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="checkout-page__input-box">
                      <input
                        name="country"
                        type="text"
                        placeholder="Country"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Additional Information */}
          <div className="col-xl-6 col-lg-6">
            <div className="checkout-page__shipping-address">
              <h2 className="checkout-page__shipping-address__title">Additional Information</h2>
              <form className="checkout-page__form">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="checkout-page__input-box">
                      <textarea
                        placeholder="Write a Message"
                        name="message"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Shipping Details */}
        <div className="checkout-page__details">
          <h2 className="checkout-page__details__title">Shipping Details</h2>
          <div className="checkout-page__details__check-box">
            <input type="checkbox" name="skipper4" id="skipper4" checked />
            <label for="skipper4">
              Same as Billing Details<span></span>
            </label>
          </div>
        </div>

        {/* Your Order */}
        <div className="checkout-page__your-order">
          <h2 className="checkout-page__your-order__title">Your Order</h2>
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <table className="checkout-page__order-table">
                <thead className="order_table_head">
                  <tr>
                    <th>Product</th>
                    <th className="right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="pro__title">Product Name</td>
                    <td className="pro__price">$10.33</td>
                  </tr>
                  <tr>
                    <td className="pro__title">Subtotal</td>
                    <td className="pro__price">$10.33</td>
                  </tr>
                  <tr>
                    <td className="pro__title">Shipping</td>
                    <td className="pro__price">$0.00</td>
                  </tr>
                  <tr>
                    <td className="pro__title">Total</td>
                    <td className="pro__price">$20.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-lg-6">
      <div className="checkout-page__payment">
        <div
          className={`checkout-page__payment__item ${activePayment === 'direct-bank-transfer' ? 'checkout-page__payment__item--active' : ''}`}
        >
          <h3
            className="checkout-page__payment__title"
            onClick={() => togglePayment('direct-bank-transfer')}
          >
            Direct Bank Transfer
          </h3>
          {activePayment === 'direct-bank-transfer' && (
            <div className="checkout-page__payment__content">
              Make your payment directly into our bank account. Please use your Order ID
              as the payment reference. Your order won't be shipped until the funds have
              cleared.
            </div>
          )}
        </div>
        <div
          className={`checkout-page__payment__item ${activePayment === 'cash-on-delivery' ? 'checkout-page__payment__item--active' : ''}`}
        >
          <h3
            className="checkout-page__payment__title"
            onClick={() => togglePayment('cash-on-delivery')}
          >
            Cash on Delivery
          </h3>
          {activePayment === 'cash-on-delivery' && (
            <div className="checkout-page__payment__content">
              Make your payment directly into our bank account. Please use your Order ID
              as the payment reference. Your order won't be shipped until the funds have
              cleared.
            </div>
          )}
        </div>
      </div>

      {/* Order Button */}
      <div className="text-right d-flex justify-content-start">
        <Link to="/checkout" className="solinom-btn solinom-btn--base">
          Place Your Order
        </Link>
      </div>
    </div>
          </div>
        </div>
      </div>
    </section>
    {/* Checkout End */}
</>
  )
}

export default Checkout