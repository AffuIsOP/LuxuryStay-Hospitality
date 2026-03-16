import React from 'react'

const About = () => {
  return (
    <>
    
    <div className="page-header">
  <div
    className="page-header__bg"
    style={{ backgroundImage: "url(assets/images/backgrounds/header-bg.jpg)" }}
  ></div>
  <div className="container">
    <img
      src="assets/images/shapes/page-header-s-1.png"
      alt="About Us"
      className="page-header__shape"
    />
    <h2 className="page-header__title">About Us</h2>
    <ul className="solinom-breadcrumb list-unstyled">
      <li>
        <a href="index.html">Home</a>
      </li>
      <li>
        <span>About</span>
      </li>
    </ul>
  </div>
</div>

<div className="about-one">
  <div className="container">
    <div className="row">
      <div className="col-lg-6">
        <div className="about-one__thumb">
          <div className="about-one__thumb__item">
            <img
              src="assets/images/about/about-1-1.jpg"
              alt="solinom about"
            />
            <div className="about-one__thumb__item__element">
              <img
                src="assets/images/shapes/about-shape-1-1.png"
                alt=""
              />
            </div>
          </div>
          <div className="about-one__thumb__line">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="about-one__thumb__element">
            <div className="about-one__thumb__shape">
              <img
                src="assets/images/about/about-s-1-1.png"
                alt="error"
              />
            </div>
            <div className="about-one__thumb__shape-two">
              <img
                src="assets/images/shapes/about-shape-1-2.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="about-one__content">
          <div className="sec-title text-start">
            <img
              src="assets/images/shapes/sec-title-s-1.png"
              alt="WELCOME TO HOTEL"
              className="sec-title__img"
            />
            <h6 className="sec-title__tagline bw-split-in-right">
              WELCOME TO HOTEL
            </h6>
            <h3 className="sec-title__title bw-split-in-up">
              The Best Hotel on the Beach Side
            </h3>
          </div>
          <p className="about-one__content__text">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The
            point of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters
          </p>
          <div className="about-one__feature">
            <div className="about-one__feature__item">
              <div className="about-one__feature__left">
                <div className="about-one__feature__icon">
                  <i className="icon-booking-1"></i>
                </div>
                <h4 className="about-one__feature__title">
                  <a href="room-details-2.html">Easy & Quick Booking</a>
                </h4>
              </div>
              <p className="about-one__feature__text">
                Lorem Ipsum is simply dummy text of the printing.
              </p>
            </div>
            <div className="about-one__feature__item">
              <div className="about-one__feature__left">
                <div className="about-one__feature__icon">
                  <i className="icon-hotel-1"></i>
                </div>
                <h4 className="about-one__feature__title">
                  <a href="room-details-2.html">Best Room Selection</a>
                </h4>
              </div>
              <p className="about-one__feature__text">
                Lorem Ipsum is simply dummy text of the printing.
              </p>
            </div>
          </div>
          <a
            href="about.html"
            className="about-one__btn solinom-btn solinom-btn--base"
          >
            Discover More
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<section className="advantages-one">
  <div
    className="advantages-one__bg"
    style={{
      backgroundImage: "url(assets/images/resources/advantage-bg-1-1.png)",
    }}
  ></div>
  <div className="container">
    <div className="row">
      <div className="col-lg-6"></div>
      <div className="col-lg-6">
        <div className="sec-title text-start">
          <img
            src="assets/images/shapes/sec-title-s-1.png"
            alt="OUR Advantages"
            className="sec-title__img"
          />
          <h6 className="sec-title__tagline bw-split-in-right">OUR Advantages</h6>
          <h3 className="sec-title__title bw-split-in-up">
            Hotel Amenities & Features
          </h3>
        </div>
      </div>
    </div>
    <div className="row gutter-y-20 gutter-x-20">
      <div className="col-md-6">
        <div className="advantages-one__item">
          <div className="advantages-one__item__top">
            <div className="advantages-one__item__icon">
              <i className="icon-spa-1"></i>
            </div>
            <h4 className="advantages-one__item__title">
              <a href="room-details-2.html">Spa & <br /> Wellness</a>
            </h4>
          </div>
          <p className="advantages-one__item__text">
            It is a long established fact that a reader will be distracted by the of readi
            toablie content of a page when the of readi toablie
          </p>
          <div className="advantages-one__item__element">
            <img
              src="assets/images/shapes/advantages-card-shape-1-1.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="advantages-one__item">
          <div className="advantages-one__item__top">
            <div className="advantages-one__item__icon">
              <i className="icon-fast-food-1"></i>
            </div>
            <h4 className="advantages-one__item__title">
              <a href="deluxe-room-details.html">Food & <br /> Beverages</a>
            </h4>
          </div>
          <p className="advantages-one__item__text">
            It is a long established fact that a reader will be distracted by the of readi
            toablie content of a page when the of readi toablie
          </p>
          <div className="advantages-one__item__element">
            <img
              src="assets/images/shapes/advantages-card-shape-1-1.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="advantages-one__item">
          <div className="advantages-one__item__top">
            <div className="advantages-one__item__icon">
              <i className="icon-sun-umbrella-1"></i>
            </div>
            <h4 className="advantages-one__item__title">
              <a href="room-details-3.html">Beach <br /> Location</a>
            </h4>
          </div>
          <p className="advantages-one__item__text">
            It is a long established fact that a reader will be distracted by the of readi
            toablie content of a page when the of readi toablie
          </p>
          <div className="advantages-one__item__element">
            <img
              src="assets/images/shapes/advantages-card-shape-1-1.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="advantages-one__item">
          <div className="advantages-one__item__top">
            <div className="advantages-one__item__icon">
              <i className="icon-wedding-1"></i>
            </div>
            <h4 className="advantages-one__item__title">
              <a href="room-details-3.html">Destination <br /> Wedding</a>
            </h4>
          </div>
          <p className="advantages-one__item__text">
            It is a long established fact that a reader will be distracted by the of readi
            toablie content of a page when the of readi toablie
          </p>
          <div className="advantages-one__item__element">
            <img
              src="assets/images/shapes/advantages-card-shape-1-1.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="advantages-one__element">
    <img
      src="assets/images/shapes/advantages-shape-1-1.png"
      alt=""
    />
  </div>
  <div className="advantages-one__man">
    <img
      src="assets/images/resources/about-man.png"
      alt=""
    />
  </div>
</section>


    
    </>
  )
}

export default About