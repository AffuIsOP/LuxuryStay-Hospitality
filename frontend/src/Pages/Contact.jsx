import React from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <>
    
    
    <section className="page-header">
          <div
            className="page-header__bg"
            style={{
              backgroundImage: 'url(assets/images/backgrounds/header-bg.jpg)',
            }}
          ></div>
          <div className="container">
            <img
              src="assets/images/shapes/page-header-s-1.png"
              alt="Contact"
              className="page-header__shape"
            />
            <h2 className="page-header__title">Contact</h2>
            <ul className="solinom-breadcrumb list-unstyled">
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>
                <span>Contact</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="contact-one">
          <div className="container">
            <div className="contact-one__inner">
              <div className="row gutter-y-30">
                <div className="col-lg-7">
                  <form
                    className="contact-one__form contact-form-validated form-one wow fadeInLeft"
                    data-wow-delay="300ms"
                    data-wow-duration="1500ms"
                    action="https://pixydrops.com/solinom-html/inc/sendemail.php"
                  >
                    <div className="contact-one__form__top">
                      <div className="sec-title text-start">
                        <img
                          src="assets/images/shapes/sec-title-s-1.png"
                          alt="Contact with us"
                          className="sec-title__img"
                        />
                        <h6 className="sec-title__tagline bw-split-in-right">
                          Contact with us
                        </h6>
                        <h3 className="sec-title__title bw-split-in-up">
                          Feel Free to Write us Anytime
                        </h3>
                      </div>
                    </div>
                    <div className="form-one__group">
                      <div className="form-one__control">
                        <input type="text" name="name" placeholder="Your Name" />
                      </div>
                      <div className="form-one__control">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                        />
                      </div>
                      <div className="form-one__control ">
                        <input type="text" name="phone" placeholder="Phone" />
                      </div>
                      <div className="form-one__control">
                        <input type="text" name="subject" placeholder="Subject" />
                      </div>
                      <div className="form-one__control form-one__control--full">
                        <textarea
                          name="message"
                          placeholder="Write a Message"
                        ></textarea>
                      </div>
                      <div className="form-one__control">
                        <button
                          type="submit"
                          className="solinom-btn solinom-btn--base"
                        >
                          Send a Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-lg-5">
                  <div
                    className="contact-one__right wow fadeInRight"
                    data-wow-duration="1500ms"
                    data-wow-delay="300ms"
                  >
                    <div className="contact-one__content">
                      <div className="contact-one__content__top">
                        <h4 className="contact-one__content__title">
                          Contact Information
                        </h4>
                      </div>
                      <ul className="list-unstyled">
                        <li>
                          <div className="contact-one__content__icon">
                            <i className="icon-telephone"></i>
                          </div>
                          <div className="contact-one__content__inner">
                            <span className="contact-one__content__subtitle">
                              Have any question?
                            </span>
                            <Link
                              href="tel:123456789"
                              className="contact-one__content__link"
                            >
                              Free + 23 (000)-8050
                            </Link>
                          </div>
                        </li>
                        <li>
                          <div className="contact-one__content__icon">
                            <i className="icon-emai2"></i>
                          </div>
                          <div className="contact-one__content__inner">
                            <span className="contact-one__content__subtitle">
                              Send Email
                            </span>
                            <Link
                              href="mailto:demo@gmail.com"
                              className="contact-one__content__link"
                            >
                              demo@gmail.com
                            </Link>
                          </div>
                        </li>
                        <li>
                          <div className="contact-one__content__icon">
                            <i className="icon-pin"></i>
                          </div>
                          <div className="contact-one__content__inner">
                            <span className="contact-one__content__subtitle">
                              Visit Anytime
                            </span>
                            <Link
                              href=""
                              className="contact-one__content__link"
                            >
                              6391 Elgin St. Delaware 10299
                            </Link>
                          </div>
                        </li>
                      </ul>
                      <div className="contact-one__content__thumb">
                        <img
                          src="assets/images/resources/contact-1-1.png"
                          alt="error"
                        />
                      </div>
                      <div className="contact-one__content__social">
                        <a href="https://facebook.com/">
                          <i className="icon-facebook-f" aria-hidden="true"></i>
                          <span className="sr-only">Facebook</span>
                        </a>
                        <a href="https://twitter.com/">
                          <i className="icon-x-twitter" aria-hidden="true"></i>
                          <span className="sr-only">Twitter</span>
                        </a>
                        <a href="https://pinterest.com/">
                          <i className="icon-pinterest-p" aria-hidden="true"></i>
                          <span className="sr-only">Pinterest</span>
                        </a>
                        <a href="https://youtube.com/">
                          <i className="icon-youtube" aria-hidden="true"></i>
                          <span className="sr-only">youtube</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="contact-map">
          <div className="container">
            <div className="google-map google-map__contact">
              <iframe
                title="template google map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4562.753041141002!2d-118.80123790098536!3d34.152323469614075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e82469c2162619%3A0xba03efb7998eef6d!2sCostco+Wholesale!5e0!3m2!1sbn!2sbd!4v1562518641290!5m2!1sbn!2sbd"
                className="map__contact"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

    
    
    </>
  )
}

export default Contact