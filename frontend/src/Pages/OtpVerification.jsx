import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; 

const OtpVerification = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = localStorage.getItem('useremail');
        if (storedEmail) {
            setEmail(storedEmail);
        } else {
            setError('Email not found. Please try again.');
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
        if (e.key === 'Backspace' && otp[index] === '') {
            if (index > 0) {
                document.getElementById(`otp-input-${index - 1}`).focus();
            }
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        const otpString = otp.join('');
        if (otpString.length !== 6) {
            setError('Please enter a 6-digit OTP.');
            return;
        }
        setError('');
        setIsSubmitting(true);

        try {
            const response = await axios.post('http://localhost:5000/user/verifyOtp', {
                useremail: email,
                otp: otpString,
            });

            console.log(response.data.message);
            setOtp(['', '', '', '', '', '']);
            toast.success("OTP Verified! Create New Password.");
            navigate('/resetpassword');
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.error);
            } else {
                setError('An error occurred. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="login-page">
            <div className="container">
                <div className="login-page__inner">
                    <div className="col-lg-12 wow fadeInUp animated text-center" data-wow-delay="300ms">
                        <div className="login-page__wrap">
                            <h3 className="login-page__wrap__title">Forget Pass OTP</h3>
                            <form onSubmit={handleOtpSubmit} className="login-page__form">
                                <div className="otp-input-group" style={styles.otpInputGroup}>
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`otp-input-${index}`}
                                            type="text"
                                            value={digit}
                                            onChange={(e) => handleChange(e, index)}
                                            onKeyDown={(e) => handleBackspace(e, index)}
                                            className="otp-input"
                                            maxLength="1"
                                            placeholder="*"
                                            style={styles.otpInput}
                                            autoComplete="off"
                                        />
                                    ))}
                                </div>
                                {error && <p style={styles.error} >{error}</p>}

                                <div
                                    className="login-page__form-btn-box"
                                    style={{ display: 'flex', justifyContent: 'center'}}
                                >
                                    <button
                                        type="submit"
                                        className="solinom-btn solinom-btn--base"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Please wait...' : 'Verify OTP'}
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
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '24px',
    },
    otpInput: {
        width: '55px',
        height: '55px',
        textAlign: 'center',
        fontSize: '20px',
        borderRadius: '10px',
        border: '1px solid #ddd',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        transition: 'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    },
    otpInputFocus: {
        borderColor: '#4CAF50',
        boxShadow: '0 0 8px rgba(175, 152, 76, 0.5)',
    },
    error: {
        color: '#e74c3c',
        fontSize: '14px',
        marginTop: '10px',
        fontWeight: '500',
    },
};

export default OtpVerification;
