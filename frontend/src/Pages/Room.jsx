import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Room = () => {
  const [roomData, setRoomData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch room data from the API
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/dashboard/room"
        );
        setRoomData(response.data);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoomData();
  }, [roomData]);

  const filteredRooms = roomData.filter((room) => {
    const roomNumber = `#${room.roomnumber}`;
    const roomType = room.roomtype.roomtypename.toLowerCase();
    return (
      roomNumber.includes(searchTerm.toLowerCase()) ||
      roomType.includes(searchTerm.toLowerCase())
    );
  });


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
            alt="Room Grid"
            className="page-header__shape"
          />
          <h2 className="page-header__title">Rooms</h2>
          <ul className="solinom-breadcrumb list-unstyled">
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>
              <span>Room</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="room-two-page">
        <div className="container">
          <div className="row gutter-y-30">
            <div className="col-lg-4">
              <div className="room-details__sidebar">
                {/* Search Input */}
                <div
                  className="product__search wow fadeInUp"
                  data-wow-delay="500ms"
                >
                  <form
                    action="#"
                    className="product__sidebar__search"
                    onSubmit={(e) => e.preventDefault()} // Prevent form submission
                  >
                    <button type="submit" aria-label="search submit">
                      <span>
                        <i className="icon-search"></i>
                      </span>
                    </button>
                    <input
                      type="text"
                      placeholder="Search by #RoomNumber or Room Type"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                    />
                  </form>
                </div>

                <div
                  className="room-details__sidebar__item room-details__sidebar__item--two wow fadeInUp"
                  data-wow-duration="1500ms"
                  data-wow-delay="300ms"
                >
                  <h4 className="room-details__sidebar__title">Last Minute</h4>
                  <ul className="room-details__sidebar__posts list-unstyled">
                    <li className="room-details__sidebar__posts__item">
                      <div className="room-details__sidebar__posts__image">
                        <img
                          src="assets/images/room/room-s-1-1.jpg"
                          alt="error"
                        />
                      </div>
                      <div className="room-details__sidebar__posts__content">
                        <span className="room-details__sidebar__posts__price">
                          $360
                        </span>
                        <h4 className="room-details__sidebar__posts__title">
                          <a href="blog-details-right.html">The Complete Web</a>
                        </h4>
                        <div className="room-details__sidebar__posts__star">
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                        </div>
                      </div>
                    </li>
                    <li className="room-details__sidebar__posts__item">
                      <div className="room-details__sidebar__posts__image">
                        <img
                          src="assets/images/room/room-s-1-2.jpg"
                          alt="error"
                        />
                      </div>
                      <div className="room-details__sidebar__posts__content">
                        <span className="room-details__sidebar__posts__price">
                          $340
                        </span>
                        <h4 className="room-details__sidebar__posts__title">
                          <a href="blog-details-right.html">
                            The Complete Room
                          </a>
                        </h4>
                        <div className="room-details__sidebar__posts__star">
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                        </div>
                      </div>
                    </li>
                    <li className="room-details__sidebar__posts__item">
                      <div className="room-details__sidebar__posts__image">
                        <img
                          src="assets/images/room/room-s-1-3.jpg"
                          alt="error"
                        />
                      </div>
                      <div className="room-details__sidebar__posts__content">
                        <span className="room-details__sidebar__posts__price">
                          $500
                        </span>
                        <h4 className="room-details__sidebar__posts__title">
                          <a href="blog-details-right.html">
                            The Complete Hotel
                          </a>
                        </h4>
                        <div className="room-details__sidebar__posts__star">
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                          <i className="icon-star1"></i>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="row gutter-y-30">
              {filteredRooms.map((room) => (
                  <div className="col-sm-6" key={room._id}>
                    <div
                      className="room-card wow fadeInUp"
                      data-wow-duration="1500ms"
                      data-wow-delay="000ms"
                    >
                      <div className="room-card__thumb">
                        <img
                          src={
                            room.roomimage || "assets/images/room/room-1-1.jpg"
                          }
                          alt={room.roomtype.roomtypename}
                        />
                        <p className="room-card__feature">
                          # {room.roomnumber}
                        </p>

                        <Link
                          to={`/roomdetails/${room.roomsid}`}
                          className="room-card__love"
                        >
                          <i className="fa fa-eye"></i>
                        </Link>
                      </div>
                      <div className="room-card__top">
                        <div className="room-card__top__inner">
                          <div className="room-card__top__price">
                            <span className="room-card__top__price__content">
                              {room.roomprice}rs
                            </span>
                            <p className="room-card__top__price__text">Night</p>
                          </div>
                        </div>
                      </div>
                      <div className="room-card__content">
                        <div className="room-card__content__inner__element"></div>
                        <h4 className="room-card__content__title">
                          <Link to={`/roomdetails/${room.roomsid}`}>
                            {room.roomtype.roomtypename}
                          </Link>
                        </h4>
                        <p className="room-card__content__text">
                          {room.description}
                        </p>
                        <div className="room-card__content__star">
                          <div className="room-card__content__star__item">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="far fa-star"></i>
                          </div>
                          <p className="room-card__content__star__parson">
                            <strong style={{ textTransform: 'uppercase' }}>{room.status}</strong>
                          </p>
                        </div>
                        <a
                          href="blog-details-left.html"
                          className="room-card__content__btn solinom-btn"
                        >
                          Book Now
                        </a>
                        <div className="room-card__content__element">
                          <img src="assets/images/shapes/room-1-1.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* <div className="col-12">
                  <ul className="post-pagination list-unstyled justify-content-end">
                    <li className="active">
                      <Link>1</Link>
                    </li>
                    <li>
                      <Link>2</Link>
                    </li>
                    <li>
                      <Link>
                        <i className="icon-right-arrow2"></i>
                      </Link>
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Room;
