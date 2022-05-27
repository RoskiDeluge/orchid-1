import { db } from '../../firebase/initFirebase';
import { doc, setDoc, Timestamp } from 'firebase/firestore';

export default function WriteToFirestore() {
  const docData = {
    stringExample: 'Orchid Aleph 2',
    booleanExample: true,
    numberExample: 3.14159265,
    dateExample: Timestamp.fromDate(new Date('December 10, 1815')),
    arrayExample: [5, true, 'hello'],
    nullExample: null,
    objectExample: {
      a: 5,
      b: {
        nested: 'foo',
      },
    },
  };

  const sendData = () => {
    try {
      setDoc(doc(db, 'data', 'one'), docData).then(
        alert('Data was succesfully sent to cloud firestore.')
      );
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return <button onClick={sendData}>Send Data to Firestore</button>;
}
