import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import $ from "jquery";

import "bootstrap-select";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { tns } from "tiny-slider/src/tiny-slider";
import "tiny-slider/dist/tiny-slider.css";

import { jarallax } from "jarallax";
import "jarallax/dist/jarallax.css";

const Home = () => {
  const backgroundImageUrl = "assets/images/backgrounds/slider-1-1.jpg";
  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    arrows: false,
    fade: true,
    speed: 2000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    swipe: true,
  };

  const countBoxRef = useRef(null);
  const [count, setCount] = useState(0);
  const [isFilterActive, setIsFilterActive] = useState(false);
  
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState("");
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);
  const [selectedCheckInDay, setSelectedCheckInDay] = useState(null);
  const [selectedCheckOutDay, setSelectedCheckOutDay] = useState(null);
  
  const calendarRef = useRef();
  const inputRef = useRef();
  const checkOutRef = useRef();
  
  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  
  // Handle Check-in date click
  const handleCheckInDateClick = (day) => {
    const today = new Date();
    const selectedFullDate = new Date(currentYear, currentMonth, day);
  
    if (selectedFullDate >= today) {
      const formattedDate = `${day.toString().padStart(2, "0")}/${(currentMonth + 1)
        .toString()
        .padStart(2, "0")}/${currentYear}`;
      
      setSelectedDate(formattedDate);
      setSelectedCheckInDay(day);
      setShowCheckInCalendar(false);
    }
  };
  
  // Handle Check-out date click
  const handleCheckOutDateClick = (day) => {
    const today = new Date();
    const selectedFullDate = new Date(currentYear, currentMonth, day);
    const checkInFullDate = new Date(currentYear, currentMonth, selectedCheckInDay);
  
    if (selectedFullDate >= checkInFullDate && selectedFullDate >= today) {
      const formattedDate = `${day.toString().padStart(2, "0")}/${(currentMonth + 1)
        .toString()
        .padStart(2, "0")}/${currentYear}`;
  
      setSelectedCheckOutDate(formattedDate);
      setSelectedCheckOutDay(day);
      setShowCheckOutCalendar(false);
    }
  };
  
  // Handle previous month navigation
  const handlePrevMonth = () => {
    const today = new Date();
  
    if (
      currentYear > today.getFullYear() ||
      (currentYear === today.getFullYear() && currentMonth > today.getMonth())
    ) {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
      setSelectedCheckInDay(null);
      setSelectedCheckOutDay(null);
    }
  };
  
  // Handle next month navigation
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedCheckInDay(null);
    setSelectedCheckOutDay(null);
  };
  
  // Generate calendar for the current month
  const generateCalendar = (isCheckIn = true) => {
    const days = [];
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = daysInMonth(currentMonth, currentYear);
    const today = new Date();
  
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <td
          key={`empty-${i}`}
          className="ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled"
        >
          &nbsp;
        </td>
      );
    }
  
    for (let day = 1; day <= totalDays; day++) {
      const currentDate = new Date(currentYear, currentMonth, day);
      const isPastDate = currentDate < today.setHours(0, 0, 0, 0);
      const isToday = currentDate.toDateString() === today.toDateString();
      const isSelected =
        (isCheckIn ? day === selectedCheckInDay : day === selectedCheckOutDay) &&
        (isCheckIn ? selectedDate !== "" : selectedCheckOutDate !== "");
  
      const isDisabled =
        isPastDate || (isCheckIn ? day < selectedCheckInDay : day <= selectedCheckInDay);
  
      days.push(
        <td
          key={day}
          className={`ui-state-default ${
            isSelected ? "ui-state-highlight" : isToday && !selectedCheckInDay && isCheckIn
              ? "ui-state-highlight"
              : ""
          } ${isDisabled ? "ui-datepicker-unselectable ui-state-disabled" : ""}`}
          onClick={
            !isDisabled
              ? isCheckIn
                ? () => handleCheckInDateClick(day)
                : () => handleCheckOutDateClick(day)
              : undefined
          }
        >
          <span>{day}</span>
        </td>
      );
    }
  
    return days;
  };
  
  // Close calendar when clicking outside
  const handleOutsideClick = (event) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target) &&
      checkOutRef.current &&
      !checkOutRef.current.contains(event.target)
    ) {
      setShowCheckInCalendar(false);
      setShowCheckOutCalendar(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);
  
  const [guests, setGuests] = useState(1);
  
  const handleIncrement = () => {
    if (guests < 999) {
      setGuests(guests + 1);
    }
  };
  
  const handleDecrement = () => {
    if (guests > 0) {
      setGuests(guests - 1);
    }
  };
  
  const handleInputChange = (e) => {
    const value = Math.max(0, Number(e.target.value));
    setGuests(value);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" && guests <= 0) {
      e.preventDefault();
    }
  };
  
  useEffect(() => {
    // Initialize select picker
    $(".selectpicker").selectpicker();
  
    // Toggle filter functionality
    $(".banner-form__filter").on("click", function (e) {
      e.preventDefault();
      $(".explore__form-checkbox-list").slideToggle();
      $(this).toggleClass("active");
    });
  
    // Scroll detection for count animation
    const handleScroll = () => {
      const element = countBoxRef.current;
  
      if (!element) return;
  
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
  
      if (isVisible && count === 0) {
        animateCount();
      }
    };
  
    const animateCount = () => {
      const target = parseInt(countBoxRef.current.getAttribute("data-stop"), 10);
      const speed = parseInt(countBoxRef.current.getAttribute("data-speed"), 10);
      const increment = target / (speed / 28);
  
      let currentCount = 0;
      const step = () => {
        currentCount += increment;
        if (currentCount >= target) {
          setCount(target);
          return;
        }
        setCount(Math.floor(currentCount));
        requestAnimationFrame(step);
      };
      step();
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      // Cleanup
      $(".banner-form__filter").off("click");
      $(".selectpicker").selectpicker("destroy");
      window.removeEventListener("scroll", handleScroll);
    };
  }, [count]);
  
  const tinySliderRef = useRef(null); // Reference for the tiny slider
  
  useEffect(() => {
    if (tinySliderRef.current) {
      const tinyElm = tinySliderRef.current.querySelectorAll(".thm-tiny__slider");
      tinyElm.forEach((slider) => {
        const tinyOptions = JSON.parse(slider.dataset.tinyOptions);
        tns(tinyOptions); // Initialize the tiny slider using the options
      });
    }
  }, []);
  
  useEffect(() => {
    jarallax(document.querySelectorAll(".jarallax"), {
      speed: 0.3,
      imgPosition: "50% -100%",
    });
  }, []);
  

  return (
    <>
        <section className="main-slider-two">
        <section className="main-slider-one">
          <div
            className="main-slider-one__element-one wow fadeInUp"
            data-wow-duration="1500ms"
            data-wow-delay="700ms"
          >
            <img src="assets/images/shapes/hero-shape-1-2.png" alt="error" />
          </div>
          <div
            className="main-slider-one__element-two wow fadeInDown"
            data-wow-duration="1500ms"
            data-wow-delay="700ms"
          >
            <img src="assets/images/shapes/hero-shape-1-1.png" alt="error" />
          </div>

          <div className="container">
            <Slider {...settings}>
              <div className="main-slider-one__item">
                <div
                  className="main-slider-one__bg"
                  style={{
                    backgroundImage: `url(${backgroundImageUrl})`,
                  }}
                ></div>
                <div className="row">
                  <div className="col-md-12 text-center">
                    <div className="main-slider-one__content">
                      <h5 className="main-slider-one__sub-title">
                        The best 5 star hotel
                      </h5>
                      <div className="main-slider-one__box">
                        <h2 className="main-slider-one__title">
                          enjoy Luxury <br /> <span>experience</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="main-slider-one__item">
                <div
                  className="main-slider-one__bg"
                  style={{
                    backgroundImage: `url(${backgroundImageUrl})`,
                  }}
                ></div>
                <div className="row">
                  <div className="col-md-12 text-center">
                    <div className="main-slider-one__content">
                      <h5 className="main-slider-one__sub-title">
                        The best 5 star hotel
                      </h5>
                      <div className="main-slider-one__box">
                        <h2 className="main-slider-one__title">
                          Indulge <br /> <span>Pure Luxury</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="main-slider-one__item">
                <div
                  className="main-slider-one__bg"
                  style={{
                    backgroundImage: `url(${backgroundImageUrl})`,
                  }}
                ></div>
                <div className="row">
                  <div className="col-md-12 text-center">
                    <div className="main-slider-one__content">
                      <h5 className="main-slider-one__sub-title">
                        The best 5 star hotel
                      </h5>
                      <div className="main-slider-one__box">
                        <h2 className="main-slider-one__title">
                          Welcome <br /> <span>Real Comfort</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
          <div className="banner-form">
            <div
              className="banner-form__position wow fadeInUp"
              data-wow-delay="300ms"
            >
              <div className="container">
                <form className="banner-form__wrapper" action="#">
                  <div className="row align-items-center">
                    <div className="col-lg-3">
                      <div className="banner-form__control" ref={calendarRef}>
                        <label htmlFor="checkin">Check-in</label>
                        <input
                          id="checkin"
                          type="text"
                          name="checkin"
                          placeholder="DD/MM/YYYY"
                          value={selectedDate}
                          onClick={() => {
                            setShowCheckInCalendar(true);
                            setShowCheckOutCalendar(false);
                          }}
                          ref={inputRef}
                          readOnly
                          style={{ cursor: 'pointer' }}
                        />
                        <i className="icon-calendar-5-1"></i>
                        {showCheckInCalendar && (
                          <div
                            id="ui-datepicker-div"
                            className="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"
                          >
                            <div className="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">
                              <Link
                                className={`ui-datepicker-prev ui-corner-all ${
                                  currentYear === new Date().getFullYear() &&
                                  currentMonth === new Date().getMonth()
                                    ? "ui-state-disabled"
                                    : ""
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handlePrevMonth();
                                }}
                                title="Prev"
                              >
                                <span className="ui-icon ui-icon-circle-triangle-w">
                                  Prev
                                </span>
                              </Link>
                              <Link
                                className="ui-datepicker-next ui-corner-all"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleNextMonth();
                                }}
                                title="Next"
                              >
                                <span className="ui-icon ui-icon-circle-triangle-e">
                                  Next
                                </span>
                              </Link>
                              <div className="ui-datepicker-title">
                                <span className="ui-datepicker-month">
                                  {new Date(
                                    currentYear,
                                    currentMonth
                                  ).toLocaleString("default", {
                                    month: "long",
                                  })}
                                </span>
                                &nbsp;
                                <span className="ui-datepicker-year">
                                  {currentYear}
                                </span>
                              </div>
                            </div>
                            <table className="ui-datepicker-calendar">
                              <thead>
                                <tr>
                                  {[
                                    "Su",
                                    "Mo",
                                    "Tu",
                                    "We",
                                    "Th",
                                    "Fr",
                                    "Sa",
                                  ].map((day, index) => (
                                    <th
                                      key={index}
                                      scope="col"
                                      className={
                                        index === 0 || index === 6
                                          ? "ui-datepicker-week-end"
                                          : ""
                                      }
                                    >
                                      <span title={day}>{day}</span>
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {Array.from({ length: 6 }, (_, rowIndex) => (
                                  <tr key={rowIndex}>
                                    {generateCalendar(true).slice(
                                      rowIndex * 7,
                                      rowIndex * 7 + 7
                                    )}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-3">
                      <div className="banner-form__control" ref={checkOutRef}>
                        <label htmlFor="checkout">Check-out</label>
                        <input
                          id="checkout"
                          type="text"
                          name="checkout"
                          placeholder="DD/MM/YYYY"
                          value={selectedCheckOutDate}
                          onClick={() => {
                            setShowCheckOutCalendar(true);
                            setShowCheckInCalendar(false);
                          }}
                          readOnly
                          style={{ cursor: 'pointer' }}

                        />
                        <i className="icon-calendar-5-1"></i>
                        {showCheckOutCalendar && (
                          <div
                            id="ui-datepicker-div"
                            className="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"
                          >
                            <div className="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">
                              <Link
                                className={`ui-datepicker-prev ui-corner-all ${
                                  currentYear === new Date().getFullYear() &&
                                  currentMonth === new Date().getMonth()
                                    ? "ui-state-disabled"
                                    : ""
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handlePrevMonth();
                                }}
                                title="Prev"
                              >
                                <span className="ui-icon ui-icon-circle-triangle-w">
                                  Prev
                                </span>
                              </Link>
                              <Link
                                className="ui-datepicker-next ui-corner-all"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleNextMonth();
                                }}
                                title="Next"
                              >
                                <span className="ui-icon ui-icon-circle-triangle-e">
                                  Next
                                </span>
                              </Link>
                              <div className="ui-datepicker-title">
                                <span className="ui-datepicker-month">
                                  {new Date(
                                    currentYear,
                                    currentMonth
                                  ).toLocaleString("default", {
                                    month: "long",
                                  })}
                                </span>
                                &nbsp;
                                <span className="ui-datepicker-year">
                                  {currentYear}
                                </span>
                              </div>
                            </div>
                            <table className="ui-datepicker-calendar">
                              <thead>
                                <tr>
                                  {[
                                    "Su",
                                    "Mo",
                                    "Tu",
                                    "We",
                                    "Th",
                                    "Fr",
                                    "Sa",
                                  ].map((day, index) => (
                                    <th
                                      key={index}
                                      scope="col"
                                      className={
                                        index === 0 || index === 6
                                          ? "ui-datepicker-week-end"
                                          : ""
                                      }
                                    >
                                      <span title={day}>{day}</span>
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {Array.from({ length: 6 }, (_, rowIndex) => (
                                  <tr key={rowIndex}>
                                    {generateCalendar(false).slice(
                                      rowIndex * 7,
                                      rowIndex * 7 + 7
                                    )}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-2">
                      <div className="banner-form__control">
                        <label htmlFor="guests">Guests</label>
                        <div className="quantity-box">
                          <button
                            type="button"
                            className="sub"
                            onClick={handleDecrement}
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                          <input
                            id="guests"
                            type="number"
                            value={guests}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                          />
                          <button
                            type="button"
                            className="add"
                            onClick={handleIncrement}
                          >
                            <i className="icon-plus-1"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="banner-form__control">
                        <label htmlFor="location">Location</label>
                        <select name="location" className="selectpicker">
                          <option defaultValue="select">Where to Next? </option>
                          <option defaultValue="spain">Spain</option>
                          <option defaultValue="canada">Canada</option>
                          <option defaultValue="africa">Africa</option>
                          <option defaultValue="europe">Europe</option>
                          <option defaultValue="thailand">Thailand</option>
                          <option defaultValue="dubai">Dubai</option>
                          <option defaultValue="australia">Australia</option>
                          <option defaultValue="switzerland">
                            Switzerland
                          </option>
                        </select>
                        <i className="icon-pin-2"></i>
                      </div>
                    </div>
                    <div className="col-lg-1">
                      <div className="banner-form__popup">
                        <button
                          className={`solinom-btn banner-form__filter ${
                            isFilterActive ? "active" : ""
                          }`}
                          onClick={() => setIsFilterActive(!isFilterActive)}
                        >
                          <i className="icon-filter"></i>
                        </button>
                        <button
                          type="submit"
                          aria-label="search submit"
                          className="solinom-btn"
                        >
                          <i className="icon-sharce"></i>
                        </button>
                      </div>
                    </div>

                    <div className="explore__form-checkbox-list">
                      <div className="bedroom-filter">
                        <div className="box-select">
                          <label className="title-select">Bathrooms</label>
                          <select name="roomSize" className="selectpicker">
                            <option defaultValue="1">1</option>
                            <option defaultValue="2">2</option>
                            <option defaultValue="3">3</option>
                            <option defaultValue="4">4</option>
                            <option defaultValue="5">5</option>
                            <option defaultValue="6">6</option>
                            <option defaultValue="7">7</option>
                            <option defaultValue="8">8</option>
                            <option defaultValue="9">9</option>
                          </select>
                        </div>
                        <div className="box-select">
                          <label className="title-select">Bedrooms</label>
                          <select name="roomSize" className="selectpicker">
                            <option defaultValue="1">1</option>
                            <option defaultValue="2">2</option>
                            <option defaultValue="3">3</option>
                            <option defaultValue="4">4</option>
                            <option defaultValue="5">5</option>
                            <option defaultValue="6">6</option>
                            <option defaultValue="7">7</option>
                            <option defaultValue="8">8</option>
                            <option defaultValue="9">9</option>
                          </select>
                        </div>
                        <div className="box-select">
                          <label className="title-select">Room Type</label>
                          <select name="roomSize" className="selectpicker">
                            <option defaultValue="Deluxe">Deluxe</option>
                            <option defaultValue="Standard">Standard</option>
                            <option defaultValue="Basic">Basic</option>
                          </select>
                        </div>
                      </div>

                      <h3 className="banner-form__popup__title">Amenities:</h3>
                      <ul className="checkboxes list-unstyled">
                        <li>
                          <input id="check-2" type="checkbox" name="check" />
                          <label htmlFor="check-2">Air Conditioning</label>
                        </li>
                        <li>
                          <input id="check-3" type="checkbox" name="check" />
                          <label htmlFor="check-3">Disabled Access</label>
                        </li>
                        <li>
                          <input id="check-4" type="checkbox" name="check" />
                          <label htmlFor="check-4">Floor</label>
                        </li>
                        <li>
                          <input id="check-5" type="checkbox" name="check" />
                          <label htmlFor="check-5">Laundry Room</label>
                        </li>
                        <li>
                          <input id="check-6" type="checkbox" name="check" />
                          <label htmlFor="check-6">Gym</label>
                        </li>
                        <li>
                          <input id="check-7" type="checkbox" name="check" />
                          <label htmlFor="check-7">Alarm</label>
                        </li>
                        <li>
                          <input id="check-8" type="checkbox" name="check" />
                          <label htmlFor="check-8">Window Covering</label>
                        </li>
                        <li>
                          <input id="check-9" type="checkbox" name="check" />
                          <label htmlFor="check-9">WiFi</label>
                        </li>
                        <li>
                          <input id="check-10" type="checkbox" name="check" />
                          <label htmlFor="check-10">TV Cable</label>
                        </li>
                        <li>
                          <input id="check-11" type="checkbox" name="check" />
                          <label htmlFor="check-11">Dryer</label>
                        </li>
                        <li>
                          <input id="check-12" type="checkbox" name="check" />
                          <label htmlFor="check-12">Microwave</label>
                        </li>
                        <li>
                          <input id="check-13" type="checkbox" name="check" />
                          <label htmlFor="check-13">Washer</label>
                        </li>
                        <li>
                          <input id="check-14" type="checkbox" name="check" />
                          <label htmlFor="check-14">Refrigerator</label>
                        </li>
                        <li>
                          <input id="check-15" type="checkbox" name="check" />
                          <label htmlFor="check-15">Outdoor Shower</label>
                        </li>
                        <li>
                          <input id="check-16" type="checkbox" name="check" />
                          <label htmlFor="check-16">Garden</label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
       
      </section>

      <style jsx>{`
        .slick-slide {
          opacity: 0;
          transform: translateX(100%);
          transition: opacity 1s ease, transform 1s ease;
        }
        .slick-active {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
      `}</style>

      {/* <section className="main-slider-two">
        <section className="main-slider-one">
          <div
            className="main-slider-one__element-one wow fadeInUp"
            data-wow-duration="1500ms"
            data-wow-delay="700ms"
          >
            <img
              src="assets/images/shapes/hero-shape-1-2.png"
              alt="error"
            />
          </div>
          <div
            className="main-slider-one__element-two wow fadeInDown"
            data-wow-duration="1500ms"
            data-wow-delay="700ms"
          >
            <img
              src="assets/images/shapes/hero-shape-1-1.png"
              alt="error"
            />
          </div>

          <div className="container">
            <div
              className="main-slider-one__carousel solinom-owl__carousel owl-carousel"
              data-owl-options='{
              "loop": true,
              "animateOut": "fadeOut",
              "animateIn": "fadeIn",
              "items": 1,
              "autoplay": true,
              "autoplayTimeout": 7000,
              "smartSpeed": 1000,
              "nav": false,
              "dots": false,
              "margin": 0
              }'
            >
              <div className="main-slider-one__item">
                <div
                  className="main-slider-one__bg"
                  style={{
                    backgroundImage: `url(${backgroundImageUrl})`,
                  }}
                ></div>
                <div className="row">
                  <div className="col-md-12 text-center">
                    <div className="main-slider-one__content">
                      <h5 className="main-slider-one__sub-title">
                        The best 5 star hotel
                      </h5>
                      <div className="main-slider-one__box">
                        <h2 className="main-slider-one__title">
                          enjoy Luxury <br /> <span>experience</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="main-slider-one__item">
                <div
                  className="main-slider-one__bg"
                  style={{
                    backgroundImage: `url(${backgroundImageUrl})`,
                  }}
                ></div>
                <div className="row">
                  <div className="col-md-12 text-center">
                    <div className="main-slider-one__content">
                      <h5 className="main-slider-one__sub-title">
                        The best 5 star hotel
                      </h5>
                      <div className="main-slider-one__box">
                        <h2 className="main-slider-one__title">
                          enjoy Luxury <br /> <span>experience</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="main-slider-one__item">
                <div
                  className="main-slider-one__bg"
                  style={{
                    backgroundImage: `url(${backgroundImageUrl})`,
                  }}
                ></div>
                <div className="row">
                  <div className="col-md-12 text-center">
                    <div className="main-slider-one__content">
                      <h5 className="main-slider-one__sub-title">
                        The best 5 star hotel
                      </h5>
                      <div className="main-slider-one__box">
                        <h2 className="main-slider-one__title">
                          enjoy Luxury <br /> <span>experience</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </section>
      </section> */}

      <section className="feature-three">
        <div className="container">
          <div className="sec-title text-center sec-title--two">
            <img
              src="assets/images/shapes/sec-title-s-1.png"
              alt="Discover our All"
              className="sec-title__img"
            />

            <h6 className="sec-title__tagline bw-split-in-right">
              Discover our All
            </h6>

            <h3 className="sec-title__title bw-split-in-up">
              Featured Amenities
            </h3>
          </div>
          <div className="row" style={{ "--bs-gutter-y": "1.5rem" }}>
            {/** Feature Item 1 */}
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div
                className="feature-three__item wow fadeInUp"
                data-wow-duration="1500ms"
                data-wow-delay="300ms"
              >
                <div className="feature-three__item__icon">
                  <i className="icon-car-1"></i>
                  <div className="feature-three__item__icon__element">
                    <img src="assets/images/shapes/shaper-2-1.png" alt="" />
                  </div>
                </div>
                <h4 className="feature-three__item__title">
                  <a href="room-details-2.html">Free parking</a>
                </h4>
                <p className="feature-three__item__text">
                  It is a long established fact that a reader will be distred by
                  the readable
                </p>
                <a href="deluxe-room-details.html" className="solinom-btn">
                  Read More <i className="icon-right-arrow-long"></i>
                </a>
                <div className="feature-three__item__element-top">
                  <img src="assets/images/shapes/frame-f-1-2.png" alt="" />
                </div>
                <div className="feature-three__item__element-bottom">
                  <img src="assets/images/shapes/frame-f-1-1.png" alt="" />
                </div>
                <div className="feature-three__item__element-hover">
                  <img src="assets/images/shapes/feature-3-1.png" alt="" />
                </div>
              </div>
            </div>

            {/** Feature Item 2 */}
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div
                className="feature-three__item wow fadeInUp"
                data-wow-duration="1500ms"
                data-wow-delay="500ms"
              >
                <div className="feature-three__item__icon">
                  <i className="icon-wifi-1"></i>
                  <div className="feature-three__item__icon__element">
                    <img src="assets/images/shapes/shaper-2-1.png" alt="" />
                  </div>
                </div>
                <h4 className="feature-three__item__title">
                  <a href="room-details-3.html">Wifi Internet</a>
                </h4>
                <p className="feature-three__item__text">
                  It is a long established fact that a reader will be distred by
                  the readable
                </p>
                <a href="deluxe-room-details.html" className="solinom-btn">
                  Read More <i className="icon-right-arrow-long"></i>
                </a>
                <div className="feature-three__item__element-top">
                  <img src="assets/images/shapes/frame-f-1-2.png" alt="" />
                </div>
                <div className="feature-three__item__element-bottom">
                  <img src="assets/images/shapes/frame-f-1-1.png" alt="" />
                </div>
                <div className="feature-three__item__element-hover">
                  <img src="assets/images/shapes/feature-3-1.png" alt="" />
                </div>
              </div>
            </div>

            {/** Feature Item 3 */}
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div
                className="feature-three__item wow fadeInUp"
                data-wow-duration="1500ms"
                data-wow-delay="700ms"
              >
                <div className="feature-three__item__icon">
                  <i className="icon-customer-service-1"></i>
                  <div className="feature-three__item__icon__element">
                    <img src="assets/images/shapes/shaper-2-1.png" alt="" />
                  </div>
                </div>
                <h4 className="feature-three__item__title">
                  <a href="room-details-3.html">24/7 Support</a>
                </h4>
                <p className="feature-three__item__text">
                  It is a long established fact that a reader will be distred by
                  the readable
                </p>
                <a href="deluxe-room-details.html" className="solinom-btn">
                  Read More <i className="icon-right-arrow-long"></i>
                </a>
                <div className="feature-three__item__element-top">
                  <img src="assets/images/shapes/frame-f-1-2.png" alt="" />
                </div>
                <div className="feature-three__item__element-bottom">
                  <img src="assets/images/shapes/frame-f-1-1.png" alt="" />
                </div>
                <div className="feature-three__item__element-hover">
                  <img src="assets/images/shapes/feature-3-1.png" alt="" />
                </div>
              </div>
            </div>

            {/** Feature Item 4 */}
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div
                className="feature-three__item wow fadeInUp"
                data-wow-duration="1500ms"
                data-wow-delay="900ms"
              >
                <div className="feature-three__item__icon">
                  <i className="icon-butter-1"></i>
                  <div className="feature-three__item__icon__element">
                    <img src="assets/images/shapes/shaper-2-1.png" alt="" />
                  </div>
                </div>
                <h4 className="feature-three__item__title">
                  <a href="room-details-3.html">Daily Breakfast</a>
                </h4>
                <p className="feature-three__item__text">
                  It is a long established fact that a reader will be distred by
                  the readable
                </p>
                <a href="deluxe-room-details.html" className="solinom-btn">
                  Read More <i className="icon-right-arrow-long"></i>
                </a>
                <div className="feature-three__item__element-top">
                  <img src="assets/images/shapes/frame-f-1-2.png" alt="" />
                </div>
                <div className="feature-three__item__element-bottom">
                  <img src="assets/images/shapes/frame-f-1-1.png" alt="" />
                </div>
                <div className="feature-three__item__element-hover">
                  <img src="assets/images/shapes/feature-3-1.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-two">
        <div
          className="about-two__bg"
          style={{
            backgroundImage:
              "url(assets/images/shapes/home-two-about-shape.png)",
          }}
        ></div>
        <div className="container">
          <div
            className="row align-items-center"
            style={{ "--bs-gutter-y": "50px" }}
          >
            <div className="col-lg-6">
              <div
                className="about-two__thumb wow fadeInUp"
                data-wow-duration="1500ms"
                data-wow-delay="300ms"
              >
                <div className="about-two__thumb__item">
                  <img src="assets/images/about/about-2-1.jpg" alt="error" />
                </div>
                <div className="about-two__thumb__small">
                  <img src="assets/images/about/about-s-2-1.jpg" alt="error" />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="about-two__content wow fadeInUp"
                data-wow-duration="1500ms"
                data-wow-delay="300ms"
              >
                <div className="sec-title text-start sec-title--two">
                  <img
                    src="assets/images/shapes/sec-title-s-1.png"
                    alt="WELCOME TO HOTEL"
                    className="sec-title__img"
                  />
                  <h6 className="sec-title__tagline bw-split-in-right">
                    WELCOME TO HOTEL
                  </h6>
                  <h3 className="sec-title__title bw-split-in-up">
                    Get to Know <br /> Our Luxury Hotels
                  </h3>
                </div>
                <p className="about-two__top__text">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </p>
                <div className="about-two__feature">
                  <div
                    className="row gutter-x-20"
                    style={{ "--bs-gutter-y": "30px" }}
                  >
                    <div className="col-xl-6 col-lg-12 col-md-6 col-sm-12">
                      <div className="about-two__feature__item">
                        <div
                          className="about-two__feature__bg"
                          style={{
                            backgroundImage:
                              "url(assets/images/about/about-s-bg-1-1.jpg)",
                          }}
                        ></div>
                        <div className="about-two__feature__icon">
                          <i className="icon-door-lock-1"></i>
                        </div>
                        <h5 className="about-two__feature__title">
                          Suite Smart Key
                        </h5>
                        <p className="about-two__feature__text">
                          It is a long established fact that a reader will be
                        </p>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-12 col-md-6 col-sm-12">
                      <div className="about-two__feature__item">
                        <div
                          className="about-two__feature__bg"
                          style={{
                            backgroundImage:
                              "url(assets/images/about/about-s-bg-1-2.jpg)",
                          }}
                        ></div>
                        <div className="about-two__feature__icon">
                          <i className="icon-luggage-2"></i>
                        </div>
                        <h5 className="about-two__feature__title">
                          Luggage Deposited
                        </h5>
                        <p className="about-two__feature__text">
                          It is a long established fact that a reader will be
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <a href="about.html" className="solinom-btn solinom-btn--base">
                  Discover More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-one" ref={tinySliderRef}>
        <div
          className="testimonials-one__bg"
          style={{
            backgroundImage: "url(assets/images/shapes/testimonials-3-1.png)",
          }}
        ></div>
        <div className="container">
          <div className="sec-title text-center sec-title--two">
            <img
              src="assets/images/shapes/sec-title-s-1.png"
              alt="Customer Reviews"
              className="sec-title__img"
            />
            <h6 className="sec-title__tagline bw-split-in-right">
              Customer Reviews
            </h6>
            <h3 className="sec-title__title bw-split-in-up">
              What They're Saying
            </h3>
          </div>
          <div
            className="testimonials-one__carousel thm-tiny__slider"
            id="feedback-one__tiny01"
            data-tiny-options='{
            "container": "#feedback-one__tiny01",
            "items": 2,
            "axis": "vertical",
            "speed": 400,
            "controls": false,
            "nav": false,
            "autoplay": true,
            "autoplayButton": false,
            "mouseDrag": true
          }'
          >
            <div className="item">
              <div className="testimonials-one__item">
                <div className="row gutter-y-30">
                  <div className="col-lg-4">
                    <div className="testimonials-one__thumb">
                      <div className="testimonials-one__thumb__quite">
                        <i className="icon-comma"></i>
                      </div>
                      <div className="testimonials-one__thumb__item">
                        <img
                          src="assets/images/resources/review-4-1.jpg"
                          alt="error"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="testimonials-one__content">
                      <div className="testimonials-one__top">
                        <div className="testimonials-one__author">
                          <h4 className="testimonials-one__name">
                            Jacob Jones
                          </h4>
                          <p className="testimonials-one__dec">Customer</p>
                        </div>
                        <div className="testimonials-one__star">
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                        </div>
                      </div>
                      <p className="testimonials-one__text">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of
                        letters.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="testimonials-one__item">
                <div className="row gutter-y-30">
                  <div className="col-lg-4">
                    <div className="testimonials-one__thumb">
                      <div className="testimonials-one__thumb__quite">
                        <i className="icon-comma"></i>
                      </div>
                      <div className="testimonials-one__thumb__item">
                        <img
                          src="assets/images/resources/review-4-1.jpg"
                          alt="error"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="testimonials-one__content">
                      <div className="testimonials-one__top">
                        <div className="testimonials-one__author">
                          <h4 className="testimonials-one__name">
                            Jacob Jones
                          </h4>
                          <p className="testimonials-one__dec">Customer</p>
                        </div>
                        <div className="testimonials-one__star">
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                        </div>
                      </div>
                      <p className="testimonials-one__text">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of
                        letters.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="testimonials-one__item">
                <div className="row gutter-y-30">
                  <div className="col-lg-4">
                    <div className="testimonials-one__thumb">
                      <div className="testimonials-one__thumb__quite">
                        <i className="icon-comma"></i>
                      </div>
                      <div className="testimonials-one__thumb__item">
                        <img
                          src="assets/images/resources/review-4-1.jpg"
                          alt="error"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="testimonials-one__content">
                      <div className="testimonials-one__top">
                        <div className="testimonials-one__author">
                          <h4 className="testimonials-one__name">
                            Jacob Jones
                          </h4>
                          <p className="testimonials-one__dec">Customer</p>
                        </div>
                        <div className="testimonials-one__star">
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                        </div>
                      </div>
                      <p className="testimonials-one__text">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of
                        letters.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="testimonials-one__item">
                <div className="row gutter-y-30">
                  <div className="col-lg-4">
                    <div className="testimonials-one__thumb">
                      <div className="testimonials-one__thumb__quite">
                        <i className="icon-comma"></i>
                      </div>
                      <div className="testimonials-one__thumb__item">
                        <img
                          src="assets/images/resources/review-4-1.jpg"
                          alt="error"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="testimonials-one__content">
                      <div className="testimonials-one__top">
                        <div className="testimonials-one__author">
                          <h4 className="testimonials-one__name">
                            Jacob Jones
                          </h4>
                          <p className="testimonials-one__dec">Customer</p>
                        </div>
                        <div className="testimonials-one__star">
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                        </div>
                      </div>
                      <p className="testimonials-one__text">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of
                        letters.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-choose-one">
        <div
          className="why-choose-one__bg jarallax"
          data-jarallax
          data-speed="0.3"
          data-imgposition="50% -100%"
          style={{
            backgroundImage: "url(assets/images/backgrounds/why-choose-bg.jpg)",
          }}
        ></div>
        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 2,
            // padding: "100px 20px",
          }}
        >
          <div className="sec-title text-center sec-title--two">
            <img
              src="assets/images/shapes/sec-title-s-1.png"
              alt="Why choose us"
              className="sec-title__img"
            />
            <h6 className="sec-title__tagline bw-split-in-right">
              Why choose us
            </h6>
            <h3 className="sec-title__title bw-split-in-up">
              Inspired Incentive
            </h3>
          </div>
          <div
            className="why-choose-one__inner"
            style={{
              backgroundImage:
                "url(assets/images/resources/why-choose-1-1.jpg)",
            }}
          >
            <div className="why-choose-one__item">
              <div className="why-choose-one__left">
                <h4 className="why-choose-one__item__title">
                  Beautiful Moments You will Never Forget
                </h4>
                <a
                  href="about.html"
                  className="why-choose-one__item__btn solinom-btn solinom-btn--base"
                >
                  Read More
                </a>
              </div>
            </div>
            <div className="why-choose-one__item">
              <div className="why-choose-one__middle">
                <ul className="why-choose-one__item__list">
                  <li>
                    <div className="why-choose-one__item__icon">
                      <i className="icon-car-wash-1"></i>
                    </div>
                    <div className="why-choose-one__item__content">
                      <h5 className="why-choose-one__item__content__title">
                        Airport Pickup
                      </h5>
                      <p className="why-choose-one__item__content__text">
                        It is a long established fact that a reader will be
                        distra
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="why-choose-one__item__icon">
                      <i className="icon-car-1"></i>
                    </div>
                    <div className="why-choose-one__item__content">
                      <h5 className="why-choose-one__item__content__title">
                        Free Parking
                      </h5>
                      <p className="why-choose-one__item__content__text">
                        It is a long established fact that a reader will be
                        distra
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="why-choose-one__item__icon">
                      <i className="icon-swimming-pool-1"></i>
                    </div>
                    <div className="why-choose-one__item__content">
                      <h5 className="why-choose-one__item__content__title">
                        Outdoor Pool
                      </h5>
                      <p className="why-choose-one__item__content__text">
                        It is a long established fact that a reader will be
                        distra
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="why-choose-one__middle__shape-one">
                  <img src="assets/images/shapes/why-choose-1-2.png" alt="" />
                </div>
                <div className="why-choose-one__middle__shape-two">
                  <img src="assets/images/shapes/why-choose-1-3.png" alt="" />
                </div>
                <div className="why-choose-one__middle__element-one">
                  <img src="assets/images/shapes/why-choose-1-1.png" alt="" />
                </div>
                <div className="why-choose-one__middle__element-two">
                  <img src="assets/images/shapes/why-choose-1-1.png" alt="" />
                </div>
              </div>
            </div>
            <div className="why-choose-one__item">
              <div className="why-choose-one__right">
                <div className="why-choose-one__item__funfact count-box">
                  <div className="why-choose-one__item__funfact__icon">
                    <i className="icon-travelling-2"></i>
                  </div>
                  <h2 className="why-choose-one__item__funfact__count">
                    <span
                      className="count-text"
                      data-stop="7300"
                      data-speed="1500"
                    ></span>
                    <span>+</span>
                  </h2>
                  <p className="why-choose-one__item__funfact__text">
                    Guests Visit Out Hotel Every Month
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-three">
        <div
          className="cta-three__bg"
          style={{
            backgroundImage: "url(assets/images/backgrounds/cta-bg-1-1.jpg)",
          }}
        ></div>
        <div className="container">
          <div
            className="cta-three__inner wow fadeInUp"
            data-wow-duration="1500ms"
            data-wow-delay="700ms"
          >
            <div className="cta-three__left">
              <h3 className="cta-three__title">Grave the Best Offer Now</h3>
              <a href="contact.html" className="solinom-btn">
                book now
              </a>
            </div>
            <div className="cta-three__right">
              <div className="cta-three__funfact count-box">
                <span className="cta-three__funfact__top">Up to</span>
                <h2 className="cta-three__funfact__text">
                  <span
                    ref={countBoxRef}
                    className="count-text"
                    data-stop="50"
                    data-speed="1500"
                  >
                    {count} %
                  </span>
                </h2>
                <span className="cta-three__funfact__top">offer</span>
                <div className="cta-three__funfact__element">
                  <img src="assets/images/shapes/cta-shape-1-3.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cta-three__shape">
          <img src="assets/images/shapes/cta-shape-1-2.png" alt="" />
        </div>
      </section>
    </>
  );
};

export default Home;
