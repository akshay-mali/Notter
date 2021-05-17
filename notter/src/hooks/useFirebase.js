import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase';

const useFirestore = (collection) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore.collection(collection)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({...doc.data(), id: doc.id});
        });
        setNotes(documents);
      });

    return () => unsub();
  }, [collection]);

  return { notes };
}

export default useFirestore;