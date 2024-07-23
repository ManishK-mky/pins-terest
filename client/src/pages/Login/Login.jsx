import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const LoginModal = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all inputs");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/login", { email, password });

      // Save both token and user data in localStorage
      localStorage.setItem('authToken', response.data.token); // Save the token
      localStorage.setItem('userData', JSON.stringify(response.data.user)); // Save user data

      toast.success("Login successful");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-98">
        <div className="flex justify-between items-center mb-6">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" alt="Pinterest Logo" className="h-10" />
          <button className="text-gray-500 hover:text-gray-700">
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome to Pinterest</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Password"
              required
            />
            <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 pt-[21px] flex items-center text-gray-500">
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">Log in</button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          By continuing, you agree to Pinterest's <a href="#" className="text-blue-500 hover:underline">Terms of Service.</a>
        </p>
        <p className="text-sm text-center text-gray-500 mt-4">
          Not on Pinterest yet? <Link to="register" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
