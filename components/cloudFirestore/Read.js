import { db } from '../../firebase/initFirebase';
import { collection, getDocs } from 'firebase/firestore';

export default function ReadFireStore() {
  const readData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'data'));
      querySnapshot.forEach((doc) => {
        console.log('Doc ID: ', doc.id, '=>', doc.data());
      });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return <button onClick={readData}>Read Sample Data from Firestore</button>;
}
