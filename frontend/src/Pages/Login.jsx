import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const { jwtDecode } = require("jwt-decode");

const Login = () => {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.userrole;
      const userStatus = decodedToken.status;

      if (userRole === "staff" && userStatus === "pending") { 
        navigate("/"); 
      } else {
        toast.error("You are already logged in!");
        navigate("/");
      }
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setError("");
    setIsSubmitting(true);
  
    try {
      const data = {
        useremail: useremail,
        userpassword: password,
      };
  
      const response = await axios.post(
        "http://localhost:5000/user/loginuser",
        data
      );
  
      if (response.status === 200) {
        const token = response.data.data;
        localStorage.setItem("authToken", token);
  
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.userrole;
        const userStatus = decodedToken.status;
        
  
        if (userRole === "guest") {
          toast.success("Login Successful");
          navigate("/");
        } else if (userRole === "admin") {
          toast.success("Login Successful");
          navigate("/dashboard/");
        } else if (userRole === "staff") {
          if (userStatus === "pending") {
            toast.info("Your account is pending admin approval. Please wait.");
          } else if (userStatus === "active") {
            toast.success("Login Successful");
            navigate("/dashboard/");
          } else {
            setError("Invalid status detected. Access denied.");
          }
        } else {
          setError("Invalid role detected. Access denied.");
        }
      }
    } catch (err) {
      console.error("Error during login:", err.response || err.message);
  
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred during login. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  
    setUseremail("");
    setPassword("");
  };
  
  

  return (
    <>
      <section className="page-header">
        <div
          className="page-header__bg"
          style={{
            backgroundImage: "url('assets/images/backgrounds/header-bg.jpg')",
          }}
        ></div>
        <div className="container">
          <img
            src="assets/images/shapes/page-header-s-1.png"
            alt="Login"
            className="page-header__shape"
          />
          <h2 className="page-header__title">Login</h2>
          <ul className="solinom-breadcrumb list-unstyled">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <span>Login</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="login-page">
        <div className="container">
          <div className="login-page__inner">
            <div
              className="col-lg-12 wow fadeInUp animated text-center"
              data-wow-delay="300ms"
            >
              <div className="login-page__wrap">
                <h3 className="login-page__wrap__title">Login</h3>
                <form onSubmit={handleSubmit} className="login-page__form">
                  <div className="login-page__form-input-box">
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={useremail}
                      onChange={(e) => setUseremail(e.target.value)}
                    />
                  </div>
                  <div className="login-page__form-input-box">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {error && (
                    <p className="error" style={{ color: "red" }}>
                      {error}
                    </p>
                  )}
                  <div className="login-page__checked-box">
                    <div className="login-page__signup">
                      <p>
                        Don’t have an account?{" "}
                        <Link to="/signup" className="login-page__signup-link">
                          Register here
                        </Link>
                      </p>
                    </div>
                    <div className="login-page__form-forgot-password">
                      <Link
                        to="/forgetpass"
                        className="login-page__form-forgot-password__item"
                      >
                        Forget Password?
                      </Link>
                    </div>
                  </div>

                  <div className="login-page__form-btn-box">
                    <button
                      type="submit"
                      className="solinom-btn solinom-btn--base"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Please wait..." : "Login"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
