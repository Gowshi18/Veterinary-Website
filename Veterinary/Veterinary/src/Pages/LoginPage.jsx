import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [userType, setUserType] = useState('petOwner');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });

      const user = response.data;
      const role = user.role || user.userType || user.user?.role; // Adjust according to backend

      localStorage.setItem('name', `${user.firstName} ${user.lastName}`);
      localStorage.setItem('id', user.id);
      localStorage.setItem('email', user.email);
      localStorage.setItem('role', user.role);
      localStorage.setItem('user', JSON.stringify(user));

      alert(`Login successful as ${role}`);

      
      // Navigate based on role
      if (role === 'petOwner') {
        navigate('/dashboard');
      } else if (role === 'vet') {
        navigate('/vet-dashboard');
      } else {
        alert('Unknown role. Cannot navigate.');
      }

    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check credentials.');
    }
  };

  return (
    <div className="login-bg d-flex align-items-center justify-content-center vh-100">
      <div className="login-container p-4 shadow-lg w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center fw-bold mb-2">Welcome Back</h2>
        <p className="text-center text-muted mb-3">Enter your credentials to access your account</p>

        <div className="btn-group w-100 mb-3">
          <button
            className={`btn ${userType === 'petOwner' ? 'btn btn-light border' : 'btn-outline-light text-muted'}`}
            onClick={() => setUserType('petOwner')}
          >
            🐾 Pet Owner
          </button>
          <button
            className={`btn ${userType === 'vet' ? 'btn btn-light border' : 'btn-outline-light text-muted'}`}
            onClick={() => setUserType('vet')}
          >
            👩‍⚕️ Veterinarian
          </button>
        </div>

        <form onSubmit={handleSubmit} className="w-100">
          <div className="mb-3 text-start w-100">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <label htmlFor="password" className="form-label mb-0">Password</label>
              <a href="#" className="text-decoration-none small">Forgot password?</a>
            </div>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark w-100 mb-3">Sign In</button>
        </form>

        <div className="text-center mb-2">or</div>

        <div className="text-center">
          <p className="mb-1">Don't have an account? <a href="/signup" className="text-decoration-none">Sign up</a></p>
          <a href="/" className="text-muted text-decoration-none">
            <i className="bi bi-arrow-left"></i> Back to home
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
