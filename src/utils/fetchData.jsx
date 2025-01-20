import { ref, onValue } from 'firebase/database';
import { db } from '../features/authentication/services/api/firebase/firebaseConfig';

const fetchData = (path, callback, errorCallback) => {
  const dbRef = ref(db, path);

  const unsubscribe = onValue(
    dbRef,
    (snapshot) => {
      const data = snapshot.val();
      callback(data);
    },
    (error) => {
      if (errorCallback) {
        errorCallback(error);
      } else {
        console.error('Error fetching data:', error);
      }
    }
  );

  // Return unsubscribe function
  return () => {
    return unsubscribe;
  };
};

export default fetchData;