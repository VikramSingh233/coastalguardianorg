
'use client'
import { useState } from 'react';
import Head from 'next/head';

export default function IndiaMapPage() {
  const [selectedState, setSelectedState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sample state data - you can replace with real data from an API
  const stateData = {
    "Jammu & Kashmir": {
      capital: "Srinagar (Summer), Jammu (Winter)",
      population: "12.5 million",
      language: "Kashmiri, Urdu, Dogri",
      area: "42,241 km²",
      description: "Known for its stunning mountainous landscape, Jammu & Kashmir is often called 'Paradise on Earth'."
    },
    "Himachal Pradesh": {
      capital: "Shimla",
      population: "7.5 million",
      language: "Hindi, Pahari",
      area: "55,673 km²",
      description: "Famous for its Himalayan landscapes and popular hill stations like Shimla and Manali."
    },
    "Punjab": {
      capital: "Chandigarh",
      population: "27.7 million",
      language: "Punjabi",
      area: "50,362 km²",
      description: "Known as the breadbasket of India, Punjab is famous for its agriculture and Sikh culture."
    },
    // Add more states as needed
  };

  const handleStateClick = (stateName) => {
    setIsLoading(true);
    setSelectedState(stateName);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-teal-100">
      <Head>
        <title>Interactive India Map | COAS-TAL Guardian</title>
        <meta name="description" content="Explore Indian states with our interactive map" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">COAS-TAL Guardian</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
            <a href="/" className="text-gray-600 hover:text-blue-600">Services</a>
            <a href="/" className="text-gray-600 hover:text-blue-600">About</a>
            <a href="/map" className="text-blue-600 font-medium">India Map</a>
          </nav>
          <button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all">
            Sign In
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Interactive India Map</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Click on any state to explore information about it. This tool helps in understanding regional data for coastal management.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Map Container */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">India Map</h3>
                
                <div className="relative">
                  <svg 
                    viewBox="0 0 800 900" 
                    className="w-full h-auto border border-gray-200 rounded-lg bg-blue-50"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Simplified paths for Indian states */}
                    <path
                      d="M250.5,120.5l10.5-3.5l6.5,5.5l5,0.5l3.5,6.5l-3.5,5.5l-6.5-1l-7-3.5l-4-3L250.5,120.5z"
                      className="state"
                      onClick={() => handleStateClick("Jammu & Kashmir")}
                    />
                    
                    <path
                      d="M280,160l5,3l-2,6l-6,2l-4-3L280,160z"
                      className="state"
                      onClick={() => handleStateClick("Himachal Pradesh")}
                    />
                    
                    <path
                      d="M260,200l10,5l8,-2l5,4l-3,7l-8,2l-7,-4L260,200z"
                      className="state"
                      onClick={() => handleStateClick("Punjab")}
                    />
                    
                    <path
                      d="M300,200l5,8l-3,7l-7,2l-5,-5L300,200z"
                      className="state"
                      onClick={() => handleStateClick("Uttarakhand")}
                    />
                    
                    <path
                      d="M200,300l15,10l12,-5l8,4l5,-3l6,8l-5,10l-12,3l-15,-5l-10,-7L200,300z"
                      className="state"
                      onClick={() => handleStateClick("Rajasthan")}
                    />
                    
                    <path
                      d="M280,250l10,5l8,15l-5,8l-12,2l-10,-10L280,250z"
                      className="state"
                      onClick={() => handleStateClick("Uttar Pradesh")}
                    />
                    
                    <path
                      d="M350,300l8,12l-5,10l-10,3l-8,-8L350,300z"
                      className="state"
                      onClick={() => handleStateClick("Bihar")}
                    />
                    
                    <path
                      d="M150,400l12,-5l10,8l5,-3l8,10l-5,12l-15,5l-10,-8L150,400z"
                      className="state"
                      onClick={() => handleStateClick("Gujarat")}
                    />
                    
                    <path
                      d="M250,350l15,10l12,20l-8,15l-20,-5l-15,-15L250,350z"
                      className="state"
                      onClick={() => handleStateClick("Madhya Pradesh")}
                    />
                    
                    <path
                      d="M200,450l20,10l15,-5l10,15l-8,20l-25,5l-15,-15L200,450z"
                      className="state"
                      onClick={() => handleStateClick("Maharashtra")}
                    />
                    
                    <path
                      d="M250,500l15,8l10,-5l8,12l-10,15l-15,-5l-10,-10L250,500z"
                      className="state"
                      onClick={() => handleStateClick("Telangana")}
                    />
                    
                    <path
                      d="M300,550l10,15l-5,20l-15,5l-10,-15L300,550z"
                      className="state"
                      onClick={() => handleStateClick("Andhra Pradesh")}
                    />
                    
                    <path
                      d="M200,550l20,10l15,-5l10,20l-15,15l-20,-10L200,550z"
                      className="state"
                      onClick={() => handleStateClick("Karnataka")}
                    />
                    
                    <path
                      d="M180,650l15,5l10,-8l5,12l-15,10l-10,-5L180,650z"
                      className="state"
                      onClick={() => handleStateClick("Kerala")}
                    />
                    
                    <path
                      d="M220,700l15,8l10,-5l5,15l-20,10l-15,-10L220,700z"
                      className="state"
                      onClick={() => handleStateClick("Tamil Nadu")}
                    />
                    
                    <path
                      d="M400,320l10,15l-5,20l-15,5l-10,-15L400,320z"
                      className="state"
                      onClick={() => handleStateClick("West Bengal")}
                    />
                    
                    <path
                      d="M350,400l15,10l10,-5l5,15l-15,10l-15,-10L350,400z"
                      className="state"
                      onClick={() => handleStateClick("Odisha")}
                    />
                    
                    <path
                      d="M450,250l10,15l-5,20l-15,5l-10,-15L450,250z"
                      className="state"
                      onClick={() => handleStateClick("Assam")}
                    />
                    
                    <path
                      d="M430,220l5,8l-3,7l-7,2l-5,-5L430,220z"
                      className="state"
                      onClick={() => handleStateClick("Sikkim")}
                    />
                    
                    <path
                      d="M470,200l5,30l-20,10l-5,-20L470,200z"
                      className="state"
                      onClick={() => handleStateClick("North Eastern States")}
                    />
                  </svg>

                  <div className="mt-4 text-center text-gray-600">
                    <p>Click on any state to view details</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* State Information Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">State Information</h3>
                
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : selectedState ? (
                  <div className="state-info">
                    <h4 className="text-xl font-bold text-blue-600 mb-4">{selectedState}</h4>
                    
                    {stateData[selectedState] ? (
                      <div className="space-y-4">
                        <div>
                          <span className="font-semibold">Capital: </span>
                          {stateData[selectedState].capital}
                        </div>
                        <div>
                          <span className="font-semibold">Population: </span>
                          {stateData[selectedState].population}
                        </div>
                        <div>
                          <span className="font-semibold">Language: </span>
                          {stateData[selectedState].language}
                        </div>
                        <div>
                          <span className="font-semibold">Area: </span>
                          {stateData[selectedState].area}
                        </div>
                        <div>
                          <span className="font-semibold">Description: </span>
                          <p className="mt-2 text-gray-600">{stateData[selectedState].description}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-600">
                        <p>Information about {selectedState} will be available soon.</p>
                        <p className="mt-4">You can integrate this with your API to fetch state-specific data.</p>
                      </div>
                    )}
                    
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-4">Coastal Data Integration</h4>
                      <p className="text-gray-600">
                        This component can be connected to your backend API to display real-time coastal data, threat levels, and regional statistics.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Select a State</h4>
                    <p className="text-gray-600">Click on any state in the map to view its information here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <p>© 2023 COAS-TAL Guardian. All rights reserved.</p>
            <p className="mt-2 text-gray-400">Interactive India Map Component for Next.js</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .state {
          fill: #4CAF50;
          stroke: #FFFFFF;
          stroke-width: 1;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .state:hover {
          fill: #2E7D32;
          stroke-width: 1.5;
        }
      `}</style>
    </div>
  );
}