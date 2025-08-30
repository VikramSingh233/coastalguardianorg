'use client'
// pages/onboarding.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    country: '',
    state: '',
    organization: '',
    notificationPreference: {
      floodingAlerts: false,
      cyclonicalActivity: false,
      seaLevelRise: false
    }
  });
  const router = useRouter();
const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredStates = states.filter((state) =>
    state.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (state) => {
    setFormData({ ...formData, state });
    setQuery(state);
    setShowDropdown(false);
  };


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        notificationPreference: {
          ...formData.notificationPreference,
          [name]: checked
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/checkjwt", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    // console.log(data.user.email);
    formData.email = data.user.email;
  } catch (error) {
    
  }

  if (step < 3) {
    setStep(step + 1);
  } else {
    try {
      const res = await fetch("/api/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),  // ✅ send full formData
      });

      const data = await res.json();

      if (res.status === 200) {
        toast.success("Onboarding complete! Redirecting to dashboard...");
        router.push("/dashboard");
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Error submitting data: " + error.message);
    }
  }
};



  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-teal-100 p-4">
      <div className="w-full max-w-2xl transform transition-all duration-500">
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
            <p className="text-gray-600">Complete your profile to get started</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    i === step ? 'bg-blue-600 text-white shadow-md' : 
                    i < step ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {i}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Personal Info</span>
              <span>Location</span>
              <span>Notifications</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-black"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="contactNumber">
                    Contact Number
                  </label>
                  <input
                    id="contactNumber"
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-black"
                    placeholder="Enter your contact number"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Location Information */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Location Information</h2>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="country">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-black"
                    required
                  >
                    <option value="">Select your country</option>
                    
                    <option value="India">India</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="state">
                    State/Province
                  </label>
                  <input
        id="state"
        type="text"
        name="state"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setFormData({ ...formData, state: e.target.value });
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        placeholder="Enter your state or select"
        required
        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-black"
      />

      {showDropdown && filteredStates.length > 0 && (
        <ul className="absolute z-10 w-full text-black mt-1 bg-white border border-gray-200 rounded-lg max-h-48 overflow-y-auto shadow-lg">
          {filteredStates.map((state) => (
            <li
              key={state}
              onClick={() => handleSelect(state)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            >
              {state}
            </li>
          ))}
        </ul>
      )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="organization">
                    Organization
                  </label>
                  <input
                    id="organization"
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-black"
                    placeholder="Enter your organization name"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Notification Preferences */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Notification Preferences</h2>
                <div className="text-center mb-6">
                  <p className="text-gray-600">
                    Select which coastal threat alerts you'd like to receive
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center p-4 rounded-lg border border-gray-200 hover:bg-blue-50 transition-colors">
                    <input
                      id="flooding"
                      type="checkbox"
                      name="floodingAlerts"
                      checked={formData.notificationPreference.floodingAlerts}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="flooding" className="ml-3 text-gray-700">
                      <span className="font-medium">Flooding Alerts</span>
                      <p className="text-sm text-gray-500">Get notified about potential flooding in coastal areas</p>
                    </label>
                  </div>
                  
                  <div className="flex items-center p-4 rounded-lg border border-gray-200 hover:bg-blue-50 transition-colors">
                    <input
                      id="cyclonicalActivity"
                      type="checkbox"
                      name="cyclonicalActivity"
                      checked={formData.notificationPreference.cyclonicalActivity}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="cyclonicalActivity" className="ml-3 text-gray-700">
                      <span className="font-medium">Cyclonical Activity</span>
                      <p className="text-sm text-gray-500">Receive updates about cyclones and storm systems</p>
                    </label>
                  </div>
                  
                  <div className="flex items-center p-4 rounded-lg border border-gray-200 hover:bg-blue-50 transition-colors">
                    <input
                      id="seaLevelRise"
                      type="checkbox"
                      name="seaLevelRise"
                      checked={formData.notificationPreference.seaLevelRise}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="seaLevelRise" className="ml-3 text-gray-700">
                      <span className="font-medium">Sea Level Rise</span>
                      <p className="text-sm text-gray-500">Stay informed about sea level changes in coastal areas</p>
                    </label>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Note:</span> You will receive alerts via email and can also view them in your dashboard. You can modify these preferences anytime from your account settings.
                  </p>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="mt-8 flex justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}
              
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                {step === 3 ? 'Complete Registration' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}