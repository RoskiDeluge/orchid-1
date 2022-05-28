import { app } from '../firebase/initFirebase';
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref,
} from 'firebase/storage';
import { useRef, useState } from 'react';
import WriteToFirestore from '../components/cloudFirestore/Write';
import ReadFireStore from '../components/cloudFirestore/Read';
import styles from '../pages/Upload.module.css';

const UploadFile = () => {
  const inputEl = useRef(null);
  const [value, setValue] = useState(0);

  const storage = getStorage(app);

  function uploadFile() {
    let file = inputEl.current.files[0];
    // let storageRef = storage.ref('my_uploads/' + file.name);
    const storageRef = ref(storage, 'orchid-list/' + file.name);
    let task = uploadBytesResumable(storageRef, file);
    task.on(
      'state_change',

      function progress(snapshot) {
        setValue((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      function error(err) {
        alert(err);
      },

      function complete() {
        alert('Uploaded to firebase storage successfully');
        getDownloadURL(task.snapshot.ref).then((downloadURL) => {
          console.log('File available at: ', downloadURL);
          // setImageURL(downloadURL);
        });
      }
    );
  }

  return (
    <>
      <div className={styles.container}>
        <WriteToFirestore />
        <ReadFireStore />
        <progress value={value} max="100"></progress>
        <input type="file" onChange={uploadFile} ref={inputEl} />
      </div>
    </>
  );
};

export default UploadFile;
