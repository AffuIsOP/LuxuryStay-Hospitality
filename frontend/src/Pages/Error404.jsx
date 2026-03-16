import React from "react";

const Error404 = () => {
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
            alt="404 Error"
            className="page-header__shape"
          />
          <h2 className="page-header__title">404 Error</h2>
          <ul className="solinom-breadcrumb list-unstyled">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <span>404 Error</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Error Section */}
      <section className="error-404">
        <div className="container">
          <div className="error-404__inner">
            <div className="error-404__thumb">
              <img src="assets/images/shapes/error-tree.png" alt="Error Tree" />
            </div>
            <div className="error-404__brid">
              <img src="assets/images/shapes/error-bird.png" alt="Error Bird" />
            </div>
          </div>
          <h3 className="error-404__sub-title">Oops! Page not found</h3>
          <p className="error-404__text">
            The page you are looking for does not exist.
          </p>
          <div className="error-404__btns">
            <a
              href="/"
              className="solinom-btn solinom-btn--base error-404__btn"
            >
              Back to Home
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error404;
