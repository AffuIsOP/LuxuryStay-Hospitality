import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [useremail, setEmail] = useState('');
  const [userpassword, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [staffRole, setStaffRole] = useState('');
  const [error, setError] = useState('');
  const [userRoles, setUserRoles] = useState([]);
  const [staffRoles, setStaffRoles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Error states for each input
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [staffRoleError, setStaffRoleError] = useState('');
  const [imageError, setImageError] = useState('');

  const navigate = useNavigate();

  const tokenn = localStorage.getItem("authToken");

  useEffect(() => {
    if (tokenn) {
      toast.error("You are already logged in!");
      navigate("/");
    }
  }, [tokenn, navigate]);

  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/userrole');
        const filteredRoles = response.data.filter(role => role.userrole !== 'admin' && role.status === 'active');

        setUserRoles(filteredRoles);
      } catch (error) {
        console.error('Error fetching user roles:', error);
      }
    };

    const fetchStaffRoles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/staffrole');
        const activeStaffRoles = response.data.filter(role => role.status === 'active');
        setStaffRoles(activeStaffRoles);
      } catch (error) {
        console.error('Error fetching staff roles:', error);
      }
    };

    fetchUserRoles();
    fetchStaffRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setPhoneError('');
    setRoleError('');
    setStaffRoleError('');
    setImageError('');
    setError('');

    const selectedUserRoleId = userRoles.find(role => role.userrole === userRole)?._id;
    const selectedStaffRoleId = staffRole ? staffRoles.find(role => role.staffrole === staffRole)?._id : null;

    if (userRole === 'staff' && !selectedStaffRoleId) {
      setStaffRoleError('Staff role is required');
      return;
    }

    setIsSubmitting(true);

    const data = {
      Username: username,
      useremail: useremail,
      userpassword: userpassword,
      phoneNumber: phoneNumber,
      userRole: selectedUserRoleId,
      staffRole: selectedStaffRoleId,
    };

    if (userImage) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        data.userImage = reader.result;

        try {
          const response = await axios.post('http://localhost:5000/user', data, {
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.status === 200 || response.status === 201) {
            localStorage.setItem('jwt_token', response.data.token);
            localStorage.setItem('useremail', useremail);
            toast.success("Signup successful! Please verify your OTP.");
            navigate('/emailotpverification');
          } else {
            console.error("Unexpected status code:", response.status);
            setError("An unexpected error occurred while processing your request.");
          }

        } catch (err) {
          console.error("Error details:", err);
          handleApiError(err);  // Handle errors
        } finally {
          setIsSubmitting(false);  // Reset submitting state
        }
      };
      reader.readAsDataURL(userImage);
      } else {
      try {
        const response = await axios.post('http://localhost:5000/user', data, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200 || response.status === 201) {
          localStorage.setItem('jwt_token', response.data.token);
          toast.success("Signup successful! Please verify your OTP.");
          navigate('/emailotpverification');  // Navigate on success
        } else {
          setError("An unexpected error occurred while processing your requestt.");
        }
      } catch (err) {
        console.error("Error details:", err);
        handleApiError(err);  // Handle errors
      } finally {
        setIsSubmitting(false);  // Reset submitting state
      }
    }
  };

  const handleApiError = (err) => {
    if (err.response) {
      const { data } = err.response;
      console.error('Error Response Data:', data);  // Log the response data
      if (data && data.error) {
        const { error } = data;
        if (error.includes("Username")) setUsernameError(error);
        if (error.includes("Email")) setEmailError(error);
        if (error.includes("Password")) setPasswordError(error);
        if (error.includes("Phone number")) setPhoneError(error);
        if (error.includes("User role")) setRoleError(error);
        if (error.includes("Staff role")) setStaffRoleError(error);
        if (error.includes("Image")) setImageError(error);
      } else {
        setError('An unknown error occurred. Please try again later.');
      }
    } else if (err.request) {
      console.error("Error request:", err.request);
      setError('No response received from the server. Please try again later.');
    } else {
      console.error("Error message:", err.message);
      setError('An error occurred while setting up the request. Please try again later.');
    }
  };


  return (
    <section className="login-page">
      <div className="container">
        <div className="login-page__inner">
          <div className="col-lg-12 wow fadeInUp animated text-center" data-wow-delay="300ms">
            <div className="login-page__wrap">
              <h3 className="login-page__wrap__title">Registration</h3>

              <form onSubmit={handleSubmit} className="login-page__form">
                {/* Profile Image Upload */}
                <label htmlFor="file-upload" className="file-upload-label">
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setUserImage(e.target.files[0])}
                    className="file-upload-input"
                  />
                  <div
                    className="profile-image-placeholder"
                    style={{
                      backgroundImage: userImage ? `url(${URL.createObjectURL(userImage)})` : 'none',
                    }}
                  >
                    {!userImage && <i className="fas fa-camera"></i>}
                  </div>
                </label>
                {imageError && <p className="error-text" style={{ color: 'red' }}>{imageError}</p>}


                {/* Other form inputs */}
                <div className="login-page__form-input-box">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Name"
                  />
                  {usernameError && <p className="error-text" style={{ color: 'red' }}>{usernameError}</p>}
                </div>
                <div className="login-page__form-input-box">
                  <input
                    type="email"
                    value={useremail}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                  />
                  {emailError && <p className="error-text" style={{ color: 'red' }}>{emailError}</p>}
                </div>
                <div className="login-page__form-input-box">
                  <input
                    type="password"
                    value={userpassword}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                  {passwordError && <p className="error-text" style={{ color: 'red' }}>{passwordError}</p>}
                </div>
                <div className="login-page__form-input-box">
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                  />
                  {phoneError && <p className="error-text" style={{ color: 'red' }}>{phoneError}</p>}
                </div>

                <div className="login-page__form-input-box">
                  <select
                    className="login-page__select"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                  >
                    <option value="" disabled>Select Role</option>
                    {userRoles.map((role) => (
                      <option key={role.userroleid} value={role.userrole}>
                        {role.userrole}
                      </option>
                    ))}
                  </select>
                  {roleError && <p className="error-text" style={{ color: 'red' }}>{roleError}</p>}
                </div>

                {userRole === 'staff' && (
                  <div className="login-page__form-input-box">
                    <select
                      className="login-page__select"
                      value={staffRole}
                      onChange={(e) => setStaffRole(e.target.value)}
                    >
                      <option value="">Select Staff Role</option>
                      {staffRoles.map((role) => (
                        <option key={role.staffroleid} value={role.staffrole}>
                          {role.staffrole}
                        </option>
                      ))}
                    </select>
                    {staffRoleError && <p className="error-text" style={{ color: 'red' }}>{staffRoleError}</p>}
                  </div>
                )}

                {error && <p className="error-text" style={{ color: 'red' }}>{error}</p>}

                <div className="login-page__form-btn-box">
                  <button
                    type="submit"
                    className="solinom-btn solinom-btn--base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Please wait...' : 'Register'}
                  </button>
                </div>
              </form>

              <div className="login-page__signup">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="login-page__signup-link">
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
