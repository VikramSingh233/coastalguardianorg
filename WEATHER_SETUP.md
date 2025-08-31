# Weather API Setup Guide

## Overview
This guide will help you set up the real-world weather data integration for your COAS-TAL Guardian coastal threat alert system.

## Features Implemented
✅ **Air Temperature** - Current air temperature with feels-like temperature  
✅ **Humidity** - Relative humidity with visual progress bar  
✅ **Sea Surface Temperature** - Coastal water temperature  
✅ **Precipitation** - Rainfall data in mm  
✅ **Visibility** - Atmospheric visibility in kilometers  
✅ **Wind Speed** - Wind speed in m/s and km/h  
✅ **Real-time Updates** - Auto-refresh weather data  
✅ **Location Selection** - Search for any coastal city  
✅ **Responsive Design** - Works on all devices  

## API Setup

### 1. Get OpenWeatherMap API Key
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to "My API Keys" section
4. Copy your API key

### 2. Environment Configuration
Create a `.env.local` file in your project root:

```bash
# .env.local
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_actual_api_key_here
```

### 3. Alternative: Direct API Key Replacement
If you prefer not to use environment variables, edit `src/config/weather.js`:

```javascript
OPENWEATHER_API_KEY: 'your_actual_api_key_here'
```

## Usage

### Default Coastal Cities
The system comes pre-configured with major Indian coastal cities:
- Mumbai, IN
- Chennai, IN
- Kochi, IN
- Kolkata, IN
- Visakhapatnam, IN
- Panaji, IN
- Puri, IN
- Kannur, IN

### Custom Locations
Users can search for any coastal city worldwide by typing the city name and country code (e.g., "Miami, US", "Barcelona, ES").

## Weather Parameters Explained

### Air Temperature
- **Source**: OpenWeatherMap current weather API
- **Unit**: Celsius (°C)
- **Update**: Real-time
- **Use Case**: Heat stress monitoring, comfort assessment

### Humidity
- **Source**: OpenWeatherMap current weather API
- **Unit**: Percentage (%)
- **Update**: Real-time
- **Use Case**: Mold risk, comfort assessment

### Sea Surface Temperature
- **Source**: Marine forecast data (estimated from air temperature)
- **Unit**: Celsius (°C)
- **Update**: Real-time
- **Use Case**: Marine life monitoring, fishing conditions

### Precipitation
- **Source**: OpenWeatherMap rain data
- **Unit**: Millimeters (mm)
- **Update**: Real-time
- **Use Case**: Flood risk assessment, water management

### Visibility
- **Source**: OpenWeatherMap visibility data
- **Unit**: Kilometers (km)
- **Update**: Real-time
- **Use Case**: Navigation safety, air quality assessment

### Wind Speed
- **Source**: OpenWeatherMap wind data
- **Unit**: m/s and km/h
- **Update**: Real-time
- **Use Case**: Storm monitoring, safety alerts

## API Rate Limits
- **Free Tier**: 1,000 calls/day
- **Update Interval**: 5 minutes (configurable)
- **Data Sources**: Current weather + 5-day forecast

## Troubleshooting

### Common Issues

1. **"Weather data not available"**
   - Check your API key is correct
   - Verify the city name format (City, Country Code)
   - Check API quota limits

2. **Data not updating**
   - Check network connectivity
   - Verify API key permissions
   - Check browser console for errors

3. **Fallback Data Showing**
   - This means the API call failed
   - Check your internet connection
   - Verify API key is valid

### Debug Mode
Open browser console (F12) to see:
- API request URLs
- Response data
- Error messages
- Network status

## Customization

### Adding New Weather Parameters
Edit `src/config/weather.js` to add new parameters:

```javascript
PARAMETERS: [
  'airTemperature',
  'humidity',
  'seaTemperature',
  'precipitation',
  'visibility',
  'windSpeed',
  'pressure',
  'feelsLike',
  'uvIndex',        // New parameter
  'dewPoint'        // New parameter
]
```

### Changing Update Intervals
Modify the update frequency in `src/config/weather.js`:

```javascript
UPDATE_INTERVAL: 600000, // 10 minutes
UPDATE_INTERVAL: 1800000, // 30 minutes
```

### Adding New Coastal Cities
Extend the default cities list:

```javascript
DEFAULT_COASTAL_CITIES: [
  'Mumbai, IN',
  'Chennai, IN',
  // ... existing cities
  'San Francisco, US',  // New city
  'Sydney, AU'          // New city
]
```

## Security Notes
- Never commit your API key to version control
- Use environment variables for production
- Monitor API usage to avoid rate limiting
- Consider API key rotation for production use

## Support
For API-related issues:
- [OpenWeatherMap Support](https://openweathermap.org/support)
- [API Documentation](https://openweathermap.org/api)

For application issues:
- Check the browser console
- Verify network connectivity
- Ensure proper API key setup
