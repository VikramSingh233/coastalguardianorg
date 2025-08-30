'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationSidebarOpen, setNotificationSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [activeThreat, setActiveThreat] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchData, setSearchData] = useState({
    country: '',
    state: ''
  });

const getuser = async () => {
  try {
    // get logged-in user info
    const res = await fetch("/api/checkjwt");
    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    // pass email as query param
    const userRes = await fetch(`/api/getme?email=${data.user.email}`);
    const data2 = await userRes.json();

    if (!userRes.ok) throw new Error(data2.error);

    setUserData(data2.user);
    console.log(data2.user);
  } catch (err) {
    console.error("Error fetching user:", err.message);
  }
};

  useEffect(() => {
    getuser();
  }, []);

  const [searchResults, setSearchResults] = useState(null);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    contactNumber: '+1 (555) 123-4567',
    country: 'United States',
    state: 'California',
    organization: 'Coastal Research Institute',
    notificationPreference
: {
      floodingAlerts: true,
      cyclonicalActivity: true,
      seaLevelRise: false
    }
  });


  const [editFormData, setEditFormData] = useState({ ...userData });
  
  const router = useRouter();
  
  // Simulated threats data (would come from database in real app)
  const threatsData = [
    { id: 1, type: 'flooding', title: 'Coastal Flood Warning', location: 'Eastern Coast', severity: 'high', time: '2 hours ago' },
    { id: 2, type: 'cyclonicalActivity', title: 'Tropical Storm Alert', location: 'Southern Region', severity: 'medium', time: '5 hours ago' },
    { id: 3, type: 'seaLevelRise', title: 'Long-term Sea Level Advisory', location: 'Bay Area', severity: 'low', time: '1 day ago' },
  ];
  
    async function logout(){
      const res = await fetch("/api/logout");
      
      
      if(res.ok){
        toast.success("Logout successful!");
      }
      else{
        toast.error("Logout failed!");
      }
      router.push('/auth');
  }
  // Simulated notifications data
  const notificationsData = [
    { id: 1, type: 'alert', title: 'New Flood Warning', content: 'Flood warning issued for your area.', time: '10 mins ago', read: false },
    { id: 2, type: 'info', title: 'System Update', content: 'New features added to your dashboard.', time: '2 hours ago', read: true },
    { id: 3, type: 'alert', title: 'High Tide Alert', content: 'Exceptionally high tides expected tonight.', time: '5 hours ago', read: false },
    { id: 4, type: 'info', title: 'Weekly Report', content: 'Your weekly coastal threat report is ready.', time: '1 day ago', read: true },
  ];
  
  useEffect(() => {
    // In a real app, we would fetch user data and threats from an API
    setEditFormData({ ...userData });
  }, [userData]);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setEditFormData({
        ...editFormData,
        notificationPreference: {
          ...editFormData.notificationPreference,
          [name]: checked
        }
      });
    } else {
      setEditFormData({
        ...editFormData,
        [name]: value
      });
    }
  };
  
  const handleSearchInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value
    });
  };
  
  const handleSaveProfile =async (e) => {
    e.preventDefault();
    setUserData({ ...editFormData });
    setEditMode(false);
    console.log("Updated user data:", editFormData);
    const res = await fetch('/api/details', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editFormData) });
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Simulate search results
    setSearchResults({
      country: searchData.country,
      state: searchData.state,
      threats: [
        { type: 'flooding', level: 'Moderate', advice: 'Stay alert for rising water levels' },
        { type: 'cyclonicalActivity', level: 'Low', advice: 'No significant cyclonic activity expected' },
        { type: 'seaLevelRise', level: 'High', advice: 'Long-term sea level rise may affect this area' }
      ]
    });
  };
  
  const renderMainContent = () => {
    if (activeSection === 'threats' && activeThreat) {
      return (
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{activeThreat.title}</h2>
          <div className="mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              activeThreat.severity === 'high' ? 'bg-red-100 text-red-800' :
              activeThreat.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {activeThreat.severity.toUpperCase()}
            </span>
            <span className="ml-3 text-gray-600">{activeThreat.time}</span>
          </div>
          <p className="text-gray-700 mb-4">
            This alert is for the {activeThreat.location} region. Please take necessary precautions and follow local authority guidelines.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Recommended Actions</h3>
            <ul className="list-disc list-inside text-blue-700">
              <li>Stay informed with local news updates</li>
              <li>Follow evacuation orders if issued</li>
              <li>Secure property against potential damage</li>
              <li>Prepare emergency supplies</li>
            </ul>
          </div>
        </div>
      );
    }
    
    if (activeSection === 'profile' && editMode) {
      return (
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
            <button 
              onClick={() => setEditMode(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
          
          <form onSubmit={handleSaveProfile}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 text-black border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border text-black border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
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
                  value={editFormData.contactNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border text-black border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="organization">
                  Organization
                </label>
                <input
                  id="organization"
                  type="text"
                  name="organization"
                  value={editFormData.organization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border text-black border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="country">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  name="country"
                  value={editFormData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border text-black border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="state">
                  State/Province
                </label>
                <input
                  id="state"
                  type="text"
                  name="state"
                  value={editFormData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border text-black border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preference</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    id="flooding"
                    type="checkbox"
                    name="flooding"
                    checked={editFormData.notificationPreference
.floodingAlerts}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="flooding" className="ml-3 text-gray-700">
                    Flooding Alerts
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="cyclonicalActivity"
                    type="checkbox"
                    name="cyclonicalActivity"
                    checked={editFormData.notificationPreference
.cyclonicalActivity}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="cyclonicalActivity" className="ml-3 text-gray-700">
                    Cyclonical Activity Alerts
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="seaLevelRise"
                    type="checkbox"
                    name="seaLevelRise"
                    checked={editFormData.notificationPreference
.seaLevelRise}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="seaLevelRise" className="ml-3 text-gray-700">
                    Sea Level Rise Updates
                  </label>
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all"
            >
              Save Changes
            </button>
          </form>
        </div>
      );
    }
    
    if (activeSection === 'profile' && !editMode) {
      return (
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
            <button 
              onClick={() => setEditMode(true)}
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all text-sm"
            >
              Edit Profile
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
              <p className="text-gray-900">{userData.name}</p>
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
              <p className="text-gray-900">{userData.email}</p>
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Contact Number</label>
              <p className="text-gray-900">{userData.contactNumber}</p>
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Organization</label>
              <p className="text-gray-900">{userData.organization}</p>
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Country</label>
              <p className="text-gray-900">{userData.country}</p>
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">State/Province</label>
              <p className="text-gray-900">{userData.state}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preference</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${userData.notificationPreference
.floodingAlerts ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-gray-700">Flooding Alerts: {userData.notificationPreference
.floodingAlerts ? 'Enabled' : 'Disabled'}</span>
              </div>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${userData.notificationPreference
.cyclonicalActivity ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-gray-700">Cyclonical Activity Alerts: {userData.notificationPreference
.cyclonicalActivity ? 'Enabled' : 'Disabled'}</span>
              </div>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${userData.notificationPreference
.seaLevelRise ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-gray-700">Sea Level Rise Updates: {userData.notificationPreference
.seaLevelRise ? 'Enabled' : 'Disabled'}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (searchMode) {
      return (
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Search Threat Information</h2>
            <button 
              onClick={() => {
                setSearchMode(false);
                setSearchResults(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              Close Search
            </button>
          </div>
          
          <form onSubmit={handleSearch} className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="searchCountry">
                  Country
                </label>
                <input
                  id="searchCountry"
                  type="text"
                  name="country"
                  value={searchData.country}
                  onChange={handleSearchInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="Enter country name"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="searchState">
                  State/Province
                </label>
                <input
                  id="searchState"
                  type="text"
                  name="state"
                  value={searchData.state}
                  onChange={handleSearchInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="Enter state name"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all"
            >
              Search
            </button>
          </form>
          
          {searchResults && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Threat Assessment for {searchResults.state ? `${searchResults.state}, ` : ''}{searchResults.country}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {searchResults.threats.map((threat, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2 capitalize">{threat.type.replace(/([A-Z])/g, ' $1')}</h4>
                    <div className="flex items-center mb-2">
                      <span className={`w-3 h-3 rounded-full mr-2 ${
                        threat.level === 'High' ? 'bg-red-500' :
                        threat.level === 'Moderate' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}></span>
                      <span className="text-gray-700">Level: {threat.level}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{threat.advice}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
    
    // Default overview content
    return (
      <div>
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to COASTAL Guardian</h2>
          <p className="text-gray-700 mb-6">
            Your personalized coastal threat dashboard. Monitor alerts, check conditions in your area, and stay informed about potential risks.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">Current Status</h3>
            <p className="text-blue-700">
              No active alerts in your area. Conditions are normal.
            </p>
          </div>
          
          <button 
            onClick={() => setSearchMode(true)}
            className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all"
          >
            Search Threat Information for Other Locations
          </button>
           <button 
            onClick={() => router.push('/map')}
            className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all ml-5"
          >
            Choose directly from the map
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Active Monitoring</h3>
            </div>
            <p className="text-gray-600">Your location is being monitored 24/7 for coastal threats.</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">System Status</h3>
            </div>
            <p className="text-gray-600">All systems operational. No issues detected.</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Recent Updates</h3>
            </div>
            <p className="text-gray-600">New forecasting models implemented for improved accuracy.</p>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Head>
        <title>Dashboard - COASTAL Guardian</title>
        <meta name="description" content="Coastal threat monitoring dashboard" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mr-4 text-gray-600 hover:text-blue-600 md:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-800">COASTAL Guardian</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setNotificationSidebarOpen(true)}
              className="relative p-2 text-gray-600 hover:text-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
        
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`bg-white shadow-md transform transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0'} md:translate-x-0 md:w-64 fixed md:relative h-full z-10`}>
          <div className="p-4 h-full flex flex-col">
            <nav className="space-y-2 flex-1">
              <button
                onClick={() => {
                  setActiveSection('overview');
                  setActiveThreat(null);
                  setSearchMode(false);
                }}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${activeSection === 'overview' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Overview
              </button>
              
              <div>
                <button
                  onClick={() => setActiveSection(activeSection === 'threats' ? 'overview' : 'threats')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${activeSection === 'threats' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Threats
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transform transition-transform ${activeSection === 'threats' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {activeSection === 'threats' && (
                  <div className="pl-11 mt-1 space-y-1">
                    {threatsData.map(threat => (
                      <button
                        key={threat.id}
                        onClick={() => setActiveThreat(threat)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-all ${activeThreat?.id === threat.id ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {threat.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <button
                onClick={() => {
                  setActiveSection('profile');
                  setEditMode(false);
                }}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${activeSection === 'profile' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </button>
            </nav>
            
            <div className="pt-4 border-t border-gray-200">
              <button 
                onClick={() => logout()}
                className="w-full flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="container mx-auto max-w-5xl">
            {renderMainContent()}
          </div>
        </main>

        
      </div>

      {/* Notification Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-20 ${notificationSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
            <button 
              onClick={() => setNotificationSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {notificationsData.map(notification => (
              <div key={notification.id} className={`p-4 rounded-lg mb-3 ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                  <span className="text-sm text-gray-500">{notification.time}</span>
                </div>
                <p className="text-gray-700">{notification.content}</p>
                {!notification.read && (
                  <div className="mt-2">
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      Mark as read
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg transition-colors">
              Clear All Notifications
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebars */}
      {(sidebarOpen || notificationSidebarOpen) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
          onClick={() => {
            setSidebarOpen(false);
            setNotificationSidebarOpen(false);
          }}
        ></div>
      )}
    </div>
  );
}
