import React, { useState, useEffect, useRef } from 'react';

const FAQItem = ({ question, answer, isActive, onToggle }) => {
  return (
    <div className={`accrodion ${isActive ? 'active' : ''}`}>
      <div className="accrodion-title" onClick={onToggle}>
        <h4 className="accrodion-title__text">
          {question}
          <span className="accrodion-title__icon">{isActive}</span>
        </h4>
      </div>
      {isActive && (
        <div className="accrodion-content">
          <div className="inner">
            <p className="inner__text">{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const countBoxRef = useRef(null);
  const [count, setCount] = useState(0);

  const faqData = [
    {
      question: 'How to experience the magic of internet?',
      answer: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form by injected humour, or randomised pieces of words which don\'t look even slightly believable.'
    },
    {
      question: 'How to soft launch your business?',
      answer: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form by injected humour, or randomised pieces of words which don\'t look even slightly believable.'
    },
    {
      question: 'How to connect your phone with wifi?',
      answer: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form by injected humour, or randomised pieces of words which don\'t look even slightly believable.'
    }
  ];

  const handleToggle = (index) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  useEffect(() => {
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
      const increment = target / (speed / 16); // Adjust step based on duration (16ms per frame)

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
      window.removeEventListener("scroll", handleScroll);
    };
  }, [count]);

  return (
    <>
      <section className="page-header">
        <div className="page-header__bg" style={{ backgroundImage: 'url(assets/images/backgrounds/header-bg.jpg)' }}></div>
        <div className="container">
          <img src="assets/images/shapes/page-header-s-1.png" alt="FAQS" className="page-header__shape" />
          <h2 className="page-header__title">FAQS</h2>
          <ul className="solinom-breadcrumb list-unstyled">
            <li><a href="index.html">Home</a></li>
            <li><span>faqs</span></li>
          </ul>
        </div>
      </section>

      <section className="faq-page">
        <div className="container">
          <div className="row gutter-y-60">
            <div className="col-lg-6">
              <div className="sec-title text-start">
                <img src="assets/images/shapes/sec-title-s-1.png" alt="Frequently Question" className="sec-title__img" />
                <h6 className="sec-title__tagline bw-split-in-right">Frequently Question</h6>
                <h3 className="sec-title__title bw-split-in-up">Have Questions in <br /> Your Mind? Get the <br /> Answers Now</h3>
              </div>
              <div className="faq-page__accordion solinom-accrodion" data-grp-name="solinom-accrodion">
                {faqData.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isActive={activeIndex === index}
                    onToggle={() => handleToggle(index)}
                  />
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="faq-page__thumb">
                <div className="faq-page__thumb__item">
                  <img src="assets/images/resources/faqs-1-1.jpg" alt="error" />
                </div>
                <div className="faq-page__thumb__funfact">
                  <div className="faq-page__thumb__funfact__image">
                    <img src="assets/images/shapes/element.png" alt="" />
                  </div>
                  <div className="faq-page__thumb__funfact__item count-box">
                    <h2 className="faq-page__thumb__funfact__item__count" ref={countBoxRef} data-stop="500" data-speed="1500">
                      <span className="count-text">{count}</span>
                      <span>K</span>
                      <span>+</span>
                    </h2>
                    <p className="faq-page__thumb__funfact__item__text">Satisfied User</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="faq-contact">
        <div className="container">
          <div className="faq-contact__inner">
            <div className="faq-contact__inner__item">
              <div className="faq-contact__inner__item__icon">
                <i className="icon-envelope"></i>
              </div>
              <div className="faq-contact__inner__item__content">
                <span className="faq-contact__inner__item__subtitle">Ask the Help Community Write Now!</span>
                <div className="faq-contact__inner__item__contact"><a href="mailto:needhelp@company.com">needhelp@company.com</a></div>
              </div>
            </div>
            <div className="faq-contact__inner__item">
              <div className="faq-contact__inner__item__icon">
                <i className=" icon-telephone"></i>
              </div>
              <div className="faq-contact__inner__item__content">
                <span className="faq-contact__inner__item__subtitle">Still have Questions? Call Now!</span>
                <div className="faq-contact__inner__item__contact"><a href="tel:+92-3800-8060">+92 3800 8060</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQs;
