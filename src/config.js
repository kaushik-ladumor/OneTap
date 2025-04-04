/**
 * Configuration utility for accessing environment variables
 * 
 * This file provides a centralized way to access all environment variables
 * and API keys throughout the application. It ensures proper fallbacks
 * and validation for required variables.
 */

// Helper function to get environment variables with fallbacks
const getEnvVariable = (key, defaultValue = null) => {
  const value = process.env[`REACT_APP_${key}`] || process.env[key];
  
  if (!value && defaultValue === null) {
    console.warn(`Environment variable ${key} is not defined and no default value provided.`);
  }
  
  return value || defaultValue;
};

// API URLs
export const API_URL = getEnvVariable('API_URL', 'http://localhost:5000');

// API Keys
export const OMDB_API_KEY = getEnvVariable('API_KEY', '91779228');

// Parse array values from environment variables
export const IMDB_KEYS = (() => {
  try {
    const keysString = getEnvVariable('imdb_keys', '[]');
    // Handle both string array format and JSON string format
    if (keysString.startsWith('[') && keysString.endsWith(']')) {
      return JSON.parse(keysString.replace(/'/g, '"'));
    }
    return [];
  } catch (error) {
    console.error('Error parsing IMDB_KEYS from environment variables:', error);
    return [];
  }
})();

// Get a random IMDB key from the array
export const getRandomImdbKey = () => {
  if (IMDB_KEYS.length === 0) return OMDB_API_KEY;
  return IMDB_KEYS[Math.floor(Math.random() * IMDB_KEYS.length)];
};

// Authentication
export const JWT_SECRET = getEnvVariable('JWT_SECRET');

// Other configuration
export const PORT = getEnvVariable('PORT', '5000');

export default {
  API_URL,
  OMDB_API_KEY,
  IMDB_KEYS,
  getRandomImdbKey,
  JWT_SECRET,
  PORT
};