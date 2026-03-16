import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify'; 

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("useremail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      setError("Email not found. Please try again.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Please enter both new password and confirm password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      const data = {
        useremail: email,
        newPassword: newPassword,
      };

      const response = await axios.post(
        "http://localhost:5000/user/resetpassword",
        data
      );

      if (response.status === 200) {
       toast.success("Password Successfully Changed!");
        navigate("/login");
      }
    } catch (err) {
      console.error(
        "Error during password reset:",
        err.response || err.message
      );
      setError(
        err.response?.data?.error || "An error occurred during password reset."
      );
    } finally {
      setIsSubmitting(false);
    }

    setNewPassword("");
    setConfirmPassword("");
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
              <h3 className="login-page__wrap__title">Reset Password</h3>
              <form onSubmit={handleSubmit} className="login-page__form">
                <div className="login-page__form-input-box">
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="login-page__form-input-box">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input"
                  />
                </div>
                {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
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
                    {isSubmitting ? "Please wait..." : "Reset Password"}
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

export default ResetPassword;
