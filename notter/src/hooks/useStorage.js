import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../firebase';

const useStorage = (data) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [done, setDone] = useState(false)

  useEffect(() => {
    // references
    const collectionRef = projectFirestore.collection('notes');

    const createDatabaseEntry = async(url) => {
      const createdAt = timestamp();
        await collectionRef.add({ 
          imageURL: url, 
          title: data.title,
          paragraph: data.paragraph,
          list: data.list,
          createdAt: createdAt
        });
      setUrl(url);
      setDone(true);
    } 

    if(data.file){
      const storageRef = projectStorage.ref(data.file.name);
      
      storageRef.put(data.file).on('state_changed', (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      }, (err) => {
        setError(err);
      }, async () => {
        const url = await storageRef.getDownloadURL();
        await createDatabaseEntry(url);
      });
    }else{
      createDatabaseEntry(null)
    }
  }, [data]);

  return { progress, url, error, done };
}

export default useStorage;