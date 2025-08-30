'use client';
// pages/auth.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from "react-hot-toast";
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (isLogin) {
    try {
      await axios.post("/api/login", {
        email: formData.email,
        password: formData.password,
      });
      toast.success("Login successful!");
      router.push("/onboardingdetails");
    } catch (err) {
      // console.error(err.response?.data || err.message);
      toast.error("Login failed");
    }
  } else {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await axios.post("/api/signup", {
        email: formData.email,
        password: formData.password,
      });
      toast.success("Signup successful!");
      router.push("/auth");
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Signup failed");
    }
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-teal-100 p-4">
      <div className="w-full max-w-md transform transition-all duration-500 hover:scale-[1.02]">
        <div className="bg-white rounded-2xl shadow-2xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30 border border-blue-100">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Coastal Threat Alert</h1>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to access your dashboard' : 'Create an account to get started'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-black"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-black"
                  placeholder="Enter your password"
                  required
                />
              </div>
              {!isLogin && (
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-black"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col space-y-4">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                {isLogin ? 'Login' : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-blue-600 hover:underline font-semibold"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}