import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify'; 

const Forgetpass = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    const data = {
      useremail: email,
    };
    setError("");

    // Disable button and show message
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/user/forgotPassword",
        data
      );

      if (response.status === 200) {
        localStorage.setItem("useremail", email);
        toast.success("Please verify your OTP.");
        navigate("/otpverification");
      }
    } catch (err) {
      console.error(
        "Error during password reset request:",
        err.response?.data || err.message
      );

      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="login-page">
      <div className="container">
        <div className="login-page__inner">
          <div
            className="col-lg-12 wow fadeInUp animated text-center"
            data-wow-delay="300ms"
          >
            <div className="login-page__wrap">
              <h3 className="login-page__wrap__title">Forgot Password</h3>
              <form onSubmit={handleSubmit} className="login-page__form">
                <div className="login-page__form-input-box">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>
                {error && <p className="error" style={{ color: "red" }}>{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}

                <div
                  className="login-page__form-btn-box"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <button
                    type="submit"
                    className="solinom-btn solinom-btn--base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Forgetpass;
