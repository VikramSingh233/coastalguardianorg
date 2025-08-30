// pages/index.js
'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { WEATHER_CONFIG, WEATHER_ICONS, WEATHER_ALERTS } from '../config/weather';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('flooding');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const router =  useRouter();



  const fetchWeatherData = async (city) => {
    if (!city || city.trim() === '') {
      alert('Please enter a city name');
      return;
    }
    
    setLoading(true);
    console.log(`🌤️ Fetching weather data for: ${city}`);
    
    try {
      // Using OpenWeatherMap API for real weather data
      const apiKey = WEATHER_CONFIG.OPENWEATHER_API_KEY;
      console.log(`🔑 Using API key: ${apiKey.substring(0, 8)}...`);
      
      // Fetch current weather
      const weatherUrl = `${WEATHER_CONFIG.OPENWEATHER_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${WEATHER_CONFIG.UNITS}`;
      console.log(`📡 Weather API URL: ${weatherUrl}`);
      
      const response = await fetch(weatherUrl);
      console.log(`📊 Weather API Response Status: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Weather API Error: ${response.status} - ${errorText}`);
        throw new Error(`Weather API Error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log(`✅ Weather data received:`, data);
      
      // Fetch 5-day forecast for additional data
      const forecastUrl = `${WEATHER_CONFIG.OPENWEATHER_BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${WEATHER_CONFIG.UNITS}`;
      console.log(`📡 Forecast API URL: ${forecastUrl}`);
      
      const forecastResponse = await fetch(forecastUrl);
      console.log(`📊 Forecast API Response Status: ${forecastResponse.status}`);
      
      if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json();
        console.log(`✅ Forecast data received:`, forecastData);
        
        // Get hourly precipitation data
        const hourlyData = forecastData.list.slice(0, 8); // Next 24 hours
        const totalPrecipitation = hourlyData.reduce((sum, item) => {
          const rain1h = item.rain?.['1h'] || 0;
          const rain3h = item.rain?.['3h'] || 0;
          return sum + Math.max(rain1h, rain3h);
        }, 0);
        
        // Combine weather and forecast data with enhanced precipitation and visibility handling
        const combinedData = {
          ...data,
          forecast: forecastData,
          hourlyPrecipitation: totalPrecipitation,
          hourlyData: hourlyData,
          // Ensure city name is properly set
          cityName: data.name || city.split(',')[0],
          // Enhanced precipitation data - ensure it updates with location
          currentPrecipitation: data.rain?.['1h'] || data.rain?.['3h'] || 0,
          // Enhanced visibility data - ensure it updates with location
          visibility: data.visibility || 10000, // Default to 10km if not available
          // Additional weather info
          weatherDescription: data.weather?.[0]?.description || 'Unknown',
          weatherIcon: data.weather?.[0]?.icon || '01d',
          // Add timestamp for debugging
          lastUpdated: new Date().toISOString(),
          // Add location info for debugging
          requestedLocation: city
        };
        
        console.log(`🎯 Combined weather data for ${city}:`, combinedData);
        console.log(`🌧️ Precipitation: ${combinedData.currentPrecipitation}mm`);
        console.log(`👁️ Visibility: ${combinedData.visibility}m`);
        setWeatherData(combinedData);
      } else {
        console.log(`⚠️ Forecast API failed, using only current weather data`);
        // Enhanced current weather data
        const enhancedData = {
          ...data,
          cityName: data.name || city.split(',')[0],
          currentPrecipitation: data.rain?.['1h'] || data.rain?.['3h'] || 0,
          visibility: data.visibility || 10000,
          weatherDescription: data.weather?.[0]?.description || 'Unknown',
          weatherIcon: data.weather?.[0]?.icon || '01d',
          hourlyPrecipitation: 0,
          lastUpdated: new Date().toISOString(),
          requestedLocation: city
        };
        console.log(`🎯 Enhanced weather data for ${city}:`, enhancedData);
        console.log(`🌧️ Precipitation: ${enhancedData.currentPrecipitation}mm`);
        console.log(`👁️ Visibility: ${enhancedData.visibility}m`);
        setWeatherData(enhancedData);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      
      // Show error message to user
      alert(`Failed to get weather data for ${city}. Please check your API key and try again.`);
      
      // Don't set fallback data - let user know there's an issue
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Don't set any default location - let user choose
    setLocation('');
  }, []);

  // Remove automatic fetching when location changes
  // Users will manually fetch weather data

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const getWeatherIcon = (iconCode) => {
    return WEATHER_ICONS[iconCode] || '🌤️';
  };

  // Check for weather alerts
  const getWeatherAlerts = () => {
    if (!weatherData) return [];
    
    const alerts = [];
    if (weatherData.main?.temp > WEATHER_ALERTS.HIGH_TEMP) {
      alerts.push({ type: 'high-temp', message: 'High temperature alert' });
    }
    if (weatherData.visibility < WEATHER_ALERTS.LOW_VISIBILITY) {
      alerts.push({ type: 'low-visibility', message: 'Low visibility warning' });
    }
    if (weatherData.wind?.speed > WEATHER_ALERTS.HIGH_WIND) {
      alerts.push({ type: 'high-wind', message: 'High wind speed alert' });
    }
    if (weatherData.main?.humidity > WEATHER_ALERTS.HIGH_HUMIDITY) {
      alerts.push({ type: 'high-humidity', message: 'High humidity alert' });
    }
    if (weatherData.currentPrecipitation > WEATHER_ALERTS.HIGH_PRECIPITATION) {
      alerts.push({ type: 'high-precipitation', message: 'Heavy rainfall alert' });
    }
    
    return alerts;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-teal-100">
      <Head>
        <title>COAS-TAL Guardian: ML Powered Alert System</title>
        <meta name="description" content="Machine Learning powered coastal threat alert system" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">COAS-TAL Guardian</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a  onClick={() => window.scrollTo({ top: 450, behavior: 'smooth' })} className="text-blue-600 font-medium cursor-pointer">Home</a>
            <a  onClick={() => window.scrollTo({ top: 450, behavior: 'smooth' })} className="text-gray-600 hover:text-blue-600 cursor-pointer">Services</a>
       
            <a href="/contact" className="text-gray-600 hover:text-blue-600">Contact</a>
          </nav>
          <button onClick={() => router.push('/auth')} className="bg-gradient-to-r from-blue-600 to-teal-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all">
            Sign In
          </button>
        </div>
      </header>

 <div
     onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
      className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-all"
    >
      ⬆
    </div>
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">ML Powered Alert System for Coastal Threats</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Advanced machine learning technology to predict and alert about coastal threats including flooding, cyclones, and sea level rise.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button onClick={() => router.push('/auth')} className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-teal-700  cursor-pointer transition-all transform hover:-translate-y-1 shadow-lg">
              Get Started
            </button>
            <button onClick={() => window.scrollTo({ top: 450, behavior: 'smooth' })} className="bg-white text-blue-600 border border-blue-600 px-6 cursor-pointer py-3 rounded-lg hover:bg-blue-50 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Threat Detection Services</h2>
          
          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="flex flex-wrap justify-center gap-2 bg-gray-100 p-2 rounded-xl">
              <button
                onClick={() => setActiveTab('flooding')}
                className={`px-6 py-3 rounded-lg cursor-pointer transition-all ${activeTab === 'flooding' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                Flooding Alerts
              </button>
              <button
                onClick={() => setActiveTab('cyclones')}
                className={`px-6 py-3 rounded-lg cursor-pointer transition-all ${activeTab === 'cyclones' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                Cyclonical Activity
              </button>
              <button
                onClick={() => setActiveTab('seaLevel')}
                className={`px-6 py-3 rounded-lg cursor-pointer transition-all ${activeTab === 'seaLevel' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                Sea Level Rise
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'flooding' && (
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2">
                  <div className="rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-500">
                    <img 
                      src="https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                      alt="Flooding Alert" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Flooding Alerts</h3>
                  <p className="text-gray-600 mb-4">
                    Our advanced ML algorithms analyze weather patterns, rainfall data, and tidal information to predict potential flooding events in coastal areas.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Real-time flood prediction models
                    </li>
                    <li className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Early warning system with 90%+ accuracy
                    </li>
                    <li className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Customized alerts based on location
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'cyclones' && (
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2">
                  <div className="rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-500">
                    <img 
                      src="https://images.unsplash.com/photo-1500674425229-f692875b0ab7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                      alt="Cyclonical Activity" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Cyclonical Activity</h3>
                  <p className="text-gray-600 mb-4">
                    Our system monitors atmospheric conditions and ocean temperatures to detect and predict cyclones and tropical storms with unprecedented accuracy.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Advanced storm tracking algorithms
                    </li>
                    <li className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Path prediction and intensity forecasting
                    </li>
                    <li className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Evacuation route recommendations
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'seaLevel' && (
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2">
                  <div className="rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-500">
                    <img 
                      src="https://www.climateimpactstracker.com/wp-content/uploads/2024/06/Sea-Level-Rise-and-Coastal-Hazards_hero-1-scaled-1-2048x966.jpg.webp " 
                      alt="Sea Level Rise" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Sea Level Rise Monitoring</h3>
                  <p className="text-gray-600 mb-4">
                    Track and predict long-term sea level changes with our sophisticated models that combine satellite data, tidal gauges, and climate models.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Long-term sea level projections
                    </li>
                    <li className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Coastal erosion risk assessment
                    </li>
                    <li className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Infrastructure impact analysis
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Weather Dashboard Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-cyan-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Coastal Weather Dashboard</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Real-time weather monitoring for coastal areas with comprehensive parameters including air temperature, humidity, sea surface temperature, precipitation, and visibility.
          </p>
          <p className="text-center text-blue-600 mb-8 max-w-2xl mx-auto font-medium">
            💡 Enter a city name and click "Get Weather" to see real-time data
          </p>
          
          {/* Step Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${location ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${location ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  1
                </div>
                <span className="font-medium">Select City</span>
              </div>
              <div className="w-8 h-1 bg-gray-200"></div>
              <div className={`flex items-center space-x-2 ${weatherData ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${weatherData ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  2
                </div>
                <span className="font-medium">View Parameters</span>
              </div>
            </div>
          </div>
          
                    {/* Location Selector */}
          <div className="flex flex-col items-center mb-8 space-y-4">
                                {/* Current City Display */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">🌍 Current City</p>
              {location ? (
                <>
                  <p className="text-lg font-semibold text-blue-600">
                    {weatherData?.cityName || weatherData?.name || location}
                  </p>
                  {weatherData?.sys?.country && (
                    <p className="text-sm text-gray-500">
                      {weatherData.sys.country}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-lg font-semibold text-gray-400">
                  No location selected
                </p>
              )}
            </div>
            
            {/* Location Controls */}
            <div className="flex flex-wrap justify-center items-center gap-4">
              <button
                onClick={() => setShowLocationModal(!showLocationModal)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>🌍</span>
                <span>Popular Cities</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={location}
                  onChange={handleLocationChange}
                  placeholder="Enter city name (e.g., Mumbai, Chennai, Miami)"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[250px] text-gray-900 bg-white"
                />
                <button
                  onClick={() => fetchWeatherData(location)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Get Weather
                </button>
                <button
                  onClick={() => fetchWeatherData(location)}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <span>{loading ? '⏳' : '🔄'}</span>
                  <span>{loading ? 'Loading...' : 'Refresh'}</span>
                </button>
                <button
                  onClick={() => {
                    setLocation('');
                    setWeatherData(null);
                  }}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <span>🗑️</span>
                  <span>Clear</span>
                </button>
              </div>
            </div>
            
            {/* Popular Coastal Cities Modal */}
            {showLocationModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Popular Coastal Cities</h3>
                    <button
                      onClick={() => setShowLocationModal(false)}
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {WEATHER_CONFIG.DEFAULT_COASTAL_CITIES.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setLocation(city);
                          setShowLocationModal(false);
                        }}
                        className="p-3 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                      >
                        <div className="font-medium text-gray-800">{city.split(',')[0]}</div>
                        <div className="text-sm text-gray-500">{city.split(',')[1]}</div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      Or type any city name above to get real-time weather data
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Weather Display */}
          {!location ? (
            <div className="text-center py-12">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 max-w-2xl mx-auto">
                <div className="text-6xl mb-4">🌍</div>
                <h3 className="text-2xl font-bold text-blue-800 mb-4">Select a City First</h3>
                <p className="text-blue-700 mb-6">
                  Please enter a city name above and click "Get Weather" to see the 5 weather parameters:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-lg mx-auto">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🌡️</span>
                    <span className="text-blue-800">Air Temperature</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💧</span>
                    <span className="text-blue-800">Humidity</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🌧️</span>
                    <span className="text-blue-800">Precipitation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">👁️</span>
                    <span className="text-blue-800">Visibility</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💨</span>
                    <span className="text-blue-800">Wind Speed</span>
                  </div>
                </div>
              </div>
            </div>
          ) : loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Fetching weather data for {location}...</p>
            </div>
          ) : weatherData ? (
            <>
              {/* Weather Parameters Header */}
              <div className="text-center mb-8">
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-4">
                  <div className="flex items-center justify-center space-x-2 text-green-800">
                    <span className="text-2xl">✅</span>
                    <span className="font-medium">Successfully loaded weather data!</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  🌤️ Weather Parameters for {weatherData.cityName || weatherData.name}
                </h3>
                <p className="text-gray-600">
                  Real-time data from OpenWeatherMap API
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {/* Current Temperature */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Air Temperature</h3>
                    <span className="text-2xl">🌡️</span>
                  </div>
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {weatherData.main?.temp}°C
                  </div>
                  <p className="text-gray-600 text-sm">
                    Feels like {weatherData.main?.feels_like || weatherData.main?.temp}°C
                  </p>
                </div>

                {/* Humidity */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Humidity</h3>
                    <span className="text-2xl">💧</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {weatherData.main?.humidity}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${weatherData.main?.humidity}%` }}
                    ></div>
                  </div>
                </div>

                

                              {/* Precipitation */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Precipitation</h3>
                  <span className="text-2xl">🌧️</span>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {weatherData.currentPrecipitation || 0} mm
                </div>
                <p className="text-gray-600 text-sm">
                  Current rainfall
                </p>
                {weatherData.hourlyPrecipitation > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    24h forecast: {weatherData.hourlyPrecipitation.toFixed(1)} mm
                  </p>
                )}
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((weatherData.currentPrecipitation / 50) * 100, 100)}%` }}
                  ></div>
                </div>

              </div>

                {/* Visibility */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Visibility</h3>
                    <span className="text-2xl">👁️</span>
                  </div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {(weatherData.visibility / 1000).toFixed(1)} km
                  </div>
                  <p className="text-gray-600 text-sm">
                    Atmospheric visibility
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((weatherData.visibility / 10000) * 100, 100)}%` }}
                    ></div>
                  </div>

                </div>

                {/* Wind Speed */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-yellow-500">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Wind Speed</h3>
                    <span className="text-2xl">💨</span>
                  </div>
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    {weatherData.wind?.speed} m/s
                  </div>
                  <p className="text-gray-600 text-sm">
                    {(weatherData.wind?.speed * 3.6).toFixed(1)} km/h
                  </p>
                </div>
              </div>

              {/* Current Weather Summary */}
              <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg max-w-4xl mx-auto">
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-6xl">
                    {getWeatherIcon(weatherData.weatherIcon)}
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {weatherData.cityName || weatherData.name || location}
                    </h3>
                    <p className="text-xl text-gray-600 capitalize">
                      {weatherData.weatherDescription}
                    </p>
                    <p className="text-gray-500 mt-2">
                      Last updated: {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Weather Alerts Section */}
              {weatherData && getWeatherAlerts().length > 0 && (
                <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-6 max-w-4xl mx-auto">
                  <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                    <span className="mr-2">⚠️</span>
                    Weather Alerts
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {getWeatherAlerts().map((alert, index) => (
                      <div key={index} className="flex items-center p-3 bg-red-100 rounded-lg">
                        <span className="text-red-600 mr-2">🚨</span>
                        <span className="text-red-800 font-medium">{alert.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Additional Weather Info */}
              {weatherData && (
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6 max-w-4xl mx-auto">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <span className="mr-2">ℹ️</span>
                    Additional Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {weatherData.main?.pressure} hPa
                      </div>
                      <div className="text-sm text-blue-700">Atmospheric Pressure</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {weatherData.main?.feels_like?.toFixed(1)}°C
                      </div>
                      <div className="text-sm text-blue-700">Feels Like</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {weatherData.wind?.deg || 0}°
                      </div>
                      <div className="text-sm text-blue-700">Wind Direction</div>
                    </div>
                  </div>
                  
                  {/* Data Quality Indicator */}
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <div className="text-center">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <span className="mr-2">✅</span>
                        Real-time data from OpenWeatherMap API
                      </div>
                      <p className="text-xs text-blue-600 mt-2">
                        Last updated: {new Date().toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 max-w-2xl mx-auto">
                <div className="text-4xl mb-4">🌤️</div>
                <h3 className="text-xl font-bold text-yellow-800 mb-2">Weather Data Unavailable</h3>
                <p className="text-yellow-700 mb-4">
                  Unable to fetch weather data. This could be due to:
                </p>
                <ul className="text-sm text-yellow-600 text-left max-w-md mx-auto space-y-1">
                  <li>• Invalid city name or location</li>
                  <li>• Network connectivity issues</li>
                  <li>• API service temporarily unavailable</li>
                  <li>• API key configuration issues</li>
                </ul>
                <button
                  onClick={() => fetchWeatherData(location)}
                  className="mt-4 bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-100 to-teal-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center transform transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Collection</h3>
              <p className="text-gray-600">
                Our system gathers data from satellites, weather stations, ocean buoys, and tidal gauges to monitor coastal conditions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center transform transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">ML Analysis</h3>
              <p className="text-gray-600">
                Advanced machine learning algorithms process the data to identify patterns and predict potential threats with high accuracy.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center transform transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Alert Delivery</h3>
              <p className="text-gray-600">
                Instant notifications are sent via email, SMS, and dashboard alerts to keep you informed and prepared.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to protect your coastal community?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Join thousands of users who trust COAS-TAL Guardian to keep them informed and safe from coastal threats.
          </p>
          <button onClick={()=>{router.push('/auth')}} className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all transform hover:-translate-y-1 shadow-lg text-lg font-semibold cursor-pointer">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">COAS-TAL Guardian</h3>
              <p className="text-gray-400">
                Advanced ML-powered coastal threat detection and alert system.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Flooding Alerts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cyclonical Activity</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sea Level Rise</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Access</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white transition-colors">Services</a></li>
                {/* <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li> */}
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                {/* <li><a href="#" className="hover:text-white transition-colors">Data Processing</a></li> */}
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2023 COAS-TAL Guardian. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}