// pages/index.js
'use client';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('flooding');
  const router =  useRouter();
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
          <button className="bg-gradient-to-r from-blue-600 to-teal-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all">
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
            <button onClick={() => router.push('/registration')} className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-teal-700  cursor-pointer transition-all transform hover:-translate-y-1 shadow-lg">
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
          <button onClick={()=>{router.push('/registration')}} className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all transform hover:-translate-y-1 shadow-lg text-lg font-semibold cursor-pointer">
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
                <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
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