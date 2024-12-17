// src/utils/fetchData.js
import { ref, onValue } from 'firebase/database';
import { db } from '../features/authentication/services/api/firebase/firebaseConfig';

/**
 * Dynamically fetch data from Firebase Realtime Database.
 * @param {string} path - The database path to fetch data from.
 * @param {function} callback - The function to call with the fetched data.
 * @param {function} [errorCallback] - Optional error handling function.
 */
const fetchData = (path, callback, errorCallback) => {
  const dbRef = ref(db, path); // Dynamically set the database path

  // Fetch the data
  onValue(
    dbRef,
    (snapshot) => {
      const data = snapshot.val();
      callback(data); // Call the callback with the fetched data
    },
    (error) => {
      if (errorCallback) {
        errorCallback(error); // Handle error if provided
      } else {
        console.error('Error fetching data:', error);
      }
    }
  );
};

export default fetchData;