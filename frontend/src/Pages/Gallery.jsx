import React, { useState } from "react";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";

const Gallery = () => {
  const images = [
    "assets/images/gallery/gallery-1-1.jpg",
    "assets/images/gallery/gallery-1-2.jpg",
    "assets/images/gallery/gallery-1-3.jpg",
    "assets/images/gallery/gallery-1-4.jpg",
    "assets/images/gallery/gallery-1-5.jpg",
    "assets/images/gallery/gallery-1-6.jpg",
    "assets/images/gallery/gallery-1-7.jpg",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (currentImageIndex + images.length - 1) % images.length
    );
  };

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
            alt="Gallery"
            className="page-header__shape"
          />
          <h2 className="page-header__title">Gallery</h2>
          <ul className="solinom-breadcrumb list-unstyled">
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>
              <span>Gallery</span>
            </li>
          </ul>
        </div>
      </section>
      <section className="gallery-one gallery-one--page">
        <div className="container">
          <div className="row masonry-layout">
            {images.map((image, index) => (
              <div
                className={`col-md-6 ${
                  index === 4 || index === 5 ? "col-lg-8" : "col-lg-4"
                }`}
                key={index}
              >
                <div className="gallery-one__card">
                  <img src={image} alt="" />
                  <div className="gallery-one__card__hover">
                    <div
                      className="img-popup"
                      onClick={() => openLightbox(index)}
                    >
                      <div className="gallery-one__card__icon">
                        <span className="gallery-one__card__icon__item"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Component */}
        {isOpen && (
          <Lightbox
            mainSrc={images[currentImageIndex]}
            nextSrc={images[(currentImageIndex + 1) % images.length]}
            prevSrc={
              images[(currentImageIndex + images.length - 1) % images.length]
            }
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={prevImage}
            onMoveNextRequest={nextImage}
          />
        )}
      </section>
    </>
  );
};

export default Gallery;
