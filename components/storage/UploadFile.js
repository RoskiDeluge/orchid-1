import { app } from '../../firebase/initFirebase';
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref,
} from 'firebase/storage';
import { useRef, useState } from 'react';

const UploadFile = () => {
  const inputEl = useRef(null);
  const [value, setValue] = useState(0);

  const storage = getStorage(app);

  function uploadFile() {
    let file = inputEl.current.files[0];
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
        });
      }
    );
  }

  return (
    <>
      <progress value={value} max="100"></progress>
      <input type="file" onChange={uploadFile} ref={inputEl} />
    </>
  );
};

export default UploadFile;
