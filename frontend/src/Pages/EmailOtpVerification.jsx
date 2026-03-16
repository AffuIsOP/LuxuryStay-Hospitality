import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify'; 

const EmailOtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
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

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    setOtp(newOtp);
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter a 6-digit OTP.");
      return;
    }
    setError("");
    setIsSubmitting(true);
  
    try {
      const storedToken = localStorage.getItem('jwt_token');
  
      const response = await axios.post("http://localhost:5000/verifyEmail", {
        useremail: email,
        otp: otpString,
      }, {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
      });
      
  
      console.log("API Response:", response.data);
      localStorage.removeItem('jwt_token'); 
      localStorage.removeItem('useremail');
      setOtp(["", "", "", "", "", ""]);
      toast.success("Otp Verified!");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred. Please try again.");
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
              <h3 className="login-page__wrap__title">
                Signup Verification OTP
              </h3>
              <p>check your email for otp</p>
              <form onSubmit={handleOtpSubmit} className="login-page__form">
                <div style={styles.otpInputGroup} className="otp-input-group">
                  {otp.map((digit, index) => (
                    <input
                    className="otp-input"
                      key={index}
                      id={`otp-input-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleBackspace(e, index)}
                      style={styles.otpInput}
                      maxLength="1"
                      placeholder="*"
                      autoComplete="off"
                    />
                  ))}
                </div>
                {error && <p className="error"  style={{ color: "red" }}>{error}</p>}

                <div
                  className="login-page__form-btn-box"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <button
                    type="submit"
                    className="solinom-btn solinom-btn--base text-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : "Verify OTP"}
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

const styles = {
  otpInputGroup: {
    display: "flex",
    justifyContent: "center", // Center the inputs
    gap: "12px", // Use gap for consistent spacing
    marginBottom: "24px",
  },
  otpInput: {
    width: "55px", // Slightly wider input
    height: "55px", // Consistent height
    textAlign: "center",
    fontSize: "20px", // Slightly larger font size
    borderRadius: "10px", // More rounded inputs
    border: "1px solid #ddd", // Lighter border
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)", // Softer shadow
    transition: "border 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  },

  
  otpInputFocus: {
    borderColor: "#4CAF50",
    boxShadow: "0 0 8px rgba(175, 152, 76, 0.5)",
  },
  error: {
    color: "#e74c3c", // Red color for errors
    fontSize: "14px",
    marginTop: "10px",
    fontWeight: "500", // Slightly bold for better readability
  },
  loginPageFormBtnBox: {
    marginTop: "30px", // Increased margin for better spacing
  },
};
export default EmailOtpVerification;
