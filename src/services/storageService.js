/**
 * Storage Service
 *
 * Provides basic localStorage operations that all other services use.
 * This abstraction makes it easy to switch to a different storage method later.
 */

/**
 * Get data from localStorage
 * @param {string} key - The storage key
 * @returns {Array} The data array, or empty array if none exists
 */
export function getData(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return [];
  }
}

/**
 * Save data to localStorage
 * @param {string} key - The storage key
 * @param {Array} data - The data to save
 * @returns {boolean} True if successful, false otherwise
 */
export function saveData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
    return false;
  }
}

/**
 * Clear all data from localStorage
 * WARNING: This removes ALL pottery data!
 */
export function clearAllData() {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
}

/**
 * Remove a specific key from localStorage
 * @param {string} key - The storage key to remove
 */
export function removeData(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
    return false;
  }
}
