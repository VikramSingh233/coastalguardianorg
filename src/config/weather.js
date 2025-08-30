// Weather API Configuration
export const WEATHER_CONFIG = {
  // OpenWeatherMap API Configuration
  OPENWEATHER_API_KEY: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || '8c635601a215190e96cdb16196b9367b',
  OPENWEATHER_BASE_URL: 'https://api.openweathermap.org/data/2.5',
  
  // Additional Weather APIs for enhanced data
  ADDITIONAL_APIS: {
    // NOAA Marine API (free, no key required)
    NOAA_MARINE: 'https://www.ndbc.noaa.gov/data/realtime2',
    
    // OpenWeatherMap Marine API (requires paid subscription)
    OPENWEATHER_MARINE: 'https://api.openweathermap.org/data/2.5/forecast',
    
    // Copernicus Marine Service (free tier available)
    COPERNICUS: 'https://nrt.cmems-du.eu/motu-web/Motu'
  },
  
  // Default coastal cities for India
  DEFAULT_COASTAL_CITIES: [
    'Mumbai, IN',
    'Chennai, IN', 
    'Kochi, IN',
    'Kolkata, IN',
    'Visakhapatnam, IN',
    'Panaji, IN',
    'Puri, IN',
    'Kannur, IN'
  ],
  
  // Weather update intervals (in milliseconds)
  UPDATE_INTERVAL: 300000, // 5 minutes
  
  // Units configuration
  UNITS: 'metric', // metric, imperial, kelvin
  
  // Weather parameters to fetch with real data sources
  PARAMETERS: {
    airTemperature: {
      source: 'OpenWeatherMap',
      api: 'current',
      realTime: true,
      description: 'Real-time air temperature from weather stations'
    },
    humidity: {
      source: 'OpenWeatherMap',
      api: 'current',
      realTime: true,
      description: 'Real-time relative humidity measurements'
    },
    seaTemperature: {
      source: 'NOAA Marine + Estimation',
      api: 'marine',
      realTime: true,
      description: 'Marine buoy data + air temperature estimation'
    },
    precipitation: {
      source: 'OpenWeatherMap',
      api: 'current + forecast',
      realTime: true,
      description: 'Real rainfall data + 24h forecast'
    },
    visibility: {
      source: 'OpenWeatherMap',
      api: 'current',
      realTime: true,
      description: 'Real atmospheric visibility measurements'
    },
    windSpeed: {
      source: 'OpenWeatherMap',
      api: 'current',
      realTime: true,
      description: 'Real wind speed and direction data'
    },
    pressure: {
      source: 'OpenWeatherMap',
      api: 'current',
      realTime: true,
      description: 'Real atmospheric pressure data'
    },
    feelsLike: {
      source: 'OpenWeatherMap',
      api: 'current',
      realTime: true,
      description: 'Calculated feels-like temperature'
    }
  }
};

// Weather icons mapping
export const WEATHER_ICONS = {
  '01d': '☀️', '01n': '🌙',
  '02d': '⛅', '02n': '☁️',
  '03d': '☁️', '03n': '☁️',
  '04d': '☁️', '04n': '☁️',
  '09d': '🌧️', '09n': '🌧️',
  '10d': '🌦️', '10n': '🌧️',
  '11d': '⛈️', '11n': '⛈️',
  '13d': '❄️', '13n': '❄️',
  '50d': '🌫️', '50n': '🌫️'
};

// Coastal weather alerts thresholds
export const WEATHER_ALERTS = {
  HIGH_TEMP: 35, // °C
  LOW_VISIBILITY: 5000, // meters
  HIGH_WIND: 15, // m/s
  HIGH_HUMIDITY: 90, // %
  HIGH_PRECIPITATION: 50 // mm/hour
};

// Real data quality indicators
export const DATA_QUALITY = {
  EXCELLENT: 'Real-time from weather stations',
  GOOD: 'Real-time with some estimation',
  ESTIMATED: 'Calculated from other parameters',
  FORECAST: 'Predicted data from models'
};
