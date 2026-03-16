import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import WOW from "wow.js";
import "wow.js/css/libs/animate.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";
import "nouislider/dist/nouislider.css";
import "tiny-slider/dist/tiny-slider.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

const Header = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleAuthRedirect = (destination) => {
    if (!token) {
      navigate(destination);
    } else {
      toast.error("You are already logged in!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const isMobileNavInitialized = useRef(false);

  useEffect(() => {
    // Initialize WOW.js
    new WOW().init();

    // Function to toggle mobile navigation
    const toggleMobileNav = () => {
      $(".mobile-nav__wrapper").toggleClass("expanded");
      $("body").toggleClass("locked");
    };

    // Mobile nav toggler event
    $(".mobile-nav__toggler").on("click", toggleMobileNav);

    // Function to toggle search popup
    const toggleSearchPopup = () => {
      $(".search-popup").toggleClass("active");
    };

    // Search toggler event
    $(".search-toggler").on("click", toggleSearchPopup);

    // Initialize mobile navigation if it's not initialized yet
    if (
      !isMobileNavInitialized.current &&
      $(".main-menu").length &&
      $(".mobile-nav__container").length
    ) {
      let mobileNavContainer = document.querySelector(".mobile-nav__container");

      mobileNavContainer.innerHTML = "";

      let navContent = "";

      document.querySelectorAll(".main-menu").forEach((menu) => {
        navContent += menu.innerHTML;
      });

      mobileNavContainer.innerHTML = navContent;
      isMobileNavInitialized.current = true;
    }

    // Add dropdown functionality to mobile nav
    if ($(".mobile-nav__container .main-menu__list").length) {
      $(".mobile-nav__container .main-menu__list .dropdown > a").each(
        function () {
          const self = $(this);
          const toggleBtn = document.createElement("BUTTON");
          toggleBtn.setAttribute("aria-label", "dropdown toggler");
          toggleBtn.innerHTML = "<i className='fa fa-angle-left'></i>";
          self.append(toggleBtn);

          $(toggleBtn).on("click", function (e) {
            e.preventDefault();
            const parentLi = $(this).closest("li");
            parentLi.toggleClass("expanded");
            parentLi.find("> ul").slideToggle();
          });
        }
      );
    }

    // Sticky menu scroll function
    function stickyMenuUpScroll($targetMenu, $toggleClass) {
      let lastScrollTop = 0;
      let timer;

      window.addEventListener(
        "scroll",
        function () {
          let st = document.documentElement.scrollTop;

          if (st > 500) {
            if (st > lastScrollTop) {
              // downscroll code
              $targetMenu.removeClass($toggleClass);
            } else {
              // upscroll code
              $targetMenu.addClass($toggleClass);
            }
          } else {
            $targetMenu.removeClass($toggleClass);
          }

          // Remove active class after a delay for smoother transition
          clearTimeout(timer);
          timer = setTimeout(() => {
            if (st <= 500) {
              $targetMenu.removeClass($toggleClass);
            }
          }, 100); // Delay time for the class to stay active (in ms)

          lastScrollTop = st;
        },
        false
      );
    }

    stickyMenuUpScroll($(".sticky-header--cloned"), "active");

    // Clone the sticky header
    if ($(".sticky-header").length) {
      $(".sticky-header")
        .clone()
        .insertAfter(".sticky-header")
        .addClass("sticky-header--cloned");
    }

    return () => {
      $(".mobile-nav__toggler").off("click", toggleMobileNav);
      $(".search-toggler").off("click", toggleSearchPopup);
      $(".mobile-nav__container .main-menu__list .dropdown > a button").off(
        "click"
      );
    };
  }, []);

  return (
    <>
      <header className="main-header main-header--two sticky-header sticky-header--normal">
        <div className="container">
          <div className="main-header__inner">
            <div className="main-header__logo">
              <Link to="/">
                <img
                  src="/assets/images/logo-light.png"
                  alt="Logo"
                  width="110"
                  height="90"
                />
              </Link>
            </div>
            <div className="main-header__middle">
              <nav className="main-header__nav main-menu">
                <ul className="main-menu__list">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/room">Room</Link>
                  </li>
                  <li>
                    <Link to="/restaurant">Restaurant</Link>
                  </li>
                  <li>
                    <Link to="/gallery">Gallery</Link>
                  </li>
                  <li>
                    <Link to="/faq">FAQs</Link>
                  </li>
                </ul>
              </nav>
              <nav className="main-header__nav main-menu">
                <ul className="main-menu__list">
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                  <li>
                    <button onClick={() => handleAuthRedirect("/signup")}>
                      Signup
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleAuthRedirect("/login")}>
                      Login
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="main-header__right">
              <Link to="/room" className="solinom-btn main-header__btn">
                Book Room
              </Link>
              <div className="main-header__info">
                <Link to="/cart" className="main-header__info__item">
                  <i
                    className="icon-trolley-cart_4175270"
                    aria-hidden="true"
                  ></i>
                  <span className="sr-only">Cart</span>
                </Link>
                <button className="search-toggler main-header__info__itembtn">
                  <i className="icon-search" aria-hidden="true"></i>
                  <span className="sr-only">Search</span>
                </button>
                <Link
                  to={token ? "#" : "/login"}
                  className="main-header__info__item"
                  onClick={token ? handleLogout : undefined}
                >
                  <i
                    className={token ? "fas fa-sign-out-alt" : "far fa-user"}
                    aria-hidden="true"
                  ></i>
                  <span className="sr-only">{token ? "Logout" : "Login"}</span>
                </Link>
              </div>
              <button className="mobile-nav__btn mobile-nav__toggler">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="mobile-nav__wrapper">
        <div className="mobile-nav__overlay mobile-nav__toggler"></div>
        <div className="mobile-nav__content">
          <span className="mobile-nav__close mobile-nav__toggler">
            <i className="fa fa-times"></i>
          </span>
          <div className="logo-box">
            <a href="index.html" aria-label="logo image">
              <img src="/assets/images/logo-light.png" width="130" alt="logo" />
            </a>
          </div>
          <div className="mobile-nav__container"></div>
          <ul className="mobile-nav__contact list-unstyled">
            <li>
              <i className="fa fa-envelope"></i>
              <a href="mailto:needhelp@solinom.com">needhelp@solinom.com</a>
            </li>
            <li>
              <i className="fa fa-phone-alt"></i>
              <a href="tel:666-888-0000">666 888 0000</a>
            </li>
          </ul>
          <div className="mobile-nav__social">
            <a href="https://facebook.com/">
              {" "}
              <i className="icon-facebook-f" aria-hidden="true"></i>{" "}
              <span className="sr-only">Facebook</span>
            </a>
            <a href="https://twitter.com/">
              {" "}
              <i className="icon-x-twitter" aria-hidden="true"></i>{" "}
              <span className="sr-only">Twitter</span>
            </a>
            <a href="https://pinterest.com/">
              {" "}
              <i className="icon-pinterest-p" aria-hidden="true"></i>{" "}
              <span className="sr-only">Pinterest</span>
            </a>
            <a href="https://youtube.com/">
              {" "}
              <i className="icon-youtube" aria-hidden="true"></i>{" "}
              <span className="sr-only">youtube</span>
            </a>
          </div>
        </div>
      </div>

      <div className="search-popup">
        <div className="search-popup__overlay search-toggler"></div>
        <div className="search-popup__content">
          <form
            role="search"
            method="get"
            className="search-popup__form"
            action="#"
          >
            <input type="text" id="search" placeholder="Search Here..." />
            <button
              type="submit"
              aria-label="search submit"
              className="solinom-btn solinom-btn--base"
            >
              <span>
                <i className="icon-search"></i>
              </span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Header;
